import { google } from "googleapis";

function parseSheetRange(range: string) {
  const [sheetName, columns] = range.split("!");

  return {
    sheetName: sheetName?.trim(),
    columns: columns?.trim() || "A:Z"
  };
}

async function ensureSheetExists(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  sheetName: string
) {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title"
  });

  const titles = new Set(
    (spreadsheet.data.sheets ?? [])
      .map((sheet) => sheet.properties?.title)
      .filter((title): title is string => Boolean(title))
  );

  if (titles.has(sheetName)) {
    return;
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: {
              title: sheetName
            }
          }
        }
      ]
    }
  });
}

function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey || !process.env.GOOGLE_SHEET_ID) {
    return null;
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
}

export async function appendToSheet(range: string, values: string[]) {
  const auth = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!auth || !spreadsheetId) {
    return { ok: false, skipped: true };
  }

  const sheets = google.sheets({ version: "v4", auth });
  const { sheetName, columns } = parseSheetRange(range);

  if (!sheetName) {
    throw new Error(`Invalid Google Sheets range: ${range}`);
  }

  await ensureSheetExists(sheets, spreadsheetId, sheetName);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!${columns}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [values]
    }
  });

  return { ok: true, skipped: false };
}

export async function updateTestimonialSheetStatus({
  sheetName = "Testimonials",
  name,
  course,
  rating,
  review,
  status,
  date
}: {
  sheetName?: string;
  name: string;
  course?: string;
  rating?: string | number;
  review: string;
  status: string;
  date?: string;
}) {
  const auth = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!auth || !spreadsheetId) {
    return { ok: false, skipped: true };
  }

  const sheets = google.sheets({ version: "v4", auth });
  await ensureSheetExists(sheets, spreadsheetId, sheetName);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:F`
  });

  const rows = response.data.values ?? [];
  let matchedRowIndex = -1;

  for (let index = rows.length - 1; index >= 0; index -= 1) {
    const row = rows[index] ?? [];
    if (row[0] === name && row[3] === review) {
      matchedRowIndex = index;
      break;
    }
  }

  const rowValues = [
    name,
    course ?? "",
    String(rating ?? ""),
    review,
    status,
    date ?? new Date().toISOString()
  ];

  if (matchedRowIndex === -1) {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:F`,
      valueInputOption: "RAW",
      requestBody: {
        values: [rowValues]
      }
    });

    return { ok: true, skipped: false, updated: false };
  }

  const rowNumber = matchedRowIndex + 1;
  const existingDate = rows[matchedRowIndex]?.[5];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!A${rowNumber}:F${rowNumber}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[
        name,
        course ?? rows[matchedRowIndex]?.[1] ?? "",
        String(rating ?? rows[matchedRowIndex]?.[2] ?? ""),
        review,
        status,
        existingDate || date || new Date().toISOString()
      ]]
    }
  });

  return { ok: true, skipped: false, updated: true };
}
