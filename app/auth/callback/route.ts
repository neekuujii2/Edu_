  import { NextResponse } from "next/server";
  import { createServerClient } from "@supabase/ssr";
  import { cookies } from "next/headers";

  export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";
    const errorCode = searchParams.get("error_code");
    const errorDescription = searchParams.get("error_description");

    const redirectPath = next.startsWith("/") ? next : "/";

    if (errorCode || errorDescription) {
      const authUrl = new URL("/auth", origin);
      authUrl.searchParams.set("redirect", redirectPath);
      authUrl.searchParams.set(
        "message",
        errorCode === "otp_expired"
          ? "Your sign-in link expired. Please request a fresh email link and open the newest email only."
          : errorDescription ?? "We could not complete sign-in. Please request a new email link and try again."
      );
      return NextResponse.redirect(authUrl);
    }

    if (code) {
      const cookieStore = cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: Record<string, unknown>) {
              cookieStore.set({ name, value, ...options });
            },
            remove(name: string, options: Record<string, unknown>) {
              cookieStore.set({ name, value: "", ...options });
            }
          }
        }
      );

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        const authUrl = new URL("/auth", origin);
        authUrl.searchParams.set("redirect", redirectPath);
        authUrl.searchParams.set(
          "message",
          error.message === "invalid request: both auth code and code verifier should be non-empty"
            ? "That sign-in link is no longer valid. Please request a fresh email link."
            : error.message
        );
        return NextResponse.redirect(authUrl);
      }
    }

    return NextResponse.redirect(new URL(redirectPath, origin));
  }
