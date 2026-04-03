export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Aspire Education Consultancy",
  description:
    "Empowering careers with expert academic advocacy. Guide your path to UG, PG, Distance Learning, MBA, and NIOS Open Schooling with Aspire Education Consultancy – your trusted partner for verified admissions in India.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aspireeducationconsultancy.com",
  keywords: [
    "Education consultancy India",
    "Distance MBA admissions 2026",
    "B.Tech admission guidance",
    "NIOS Open Schooling support",
    "UG PG admission consultancy Delhi",
    "Best education consultants for MBA",
    "Online degree admission help",
    "Aspire Education Consultancy",
    "Distance education experts",
    "Career counseling India"
  ]
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/open-schooling", label: "Open Schooling" },
  { href: "/contact", label: "Contact" }
];

export const socialLinks = {
  instagram:
    process.env.INSTAGRAM ??
    "https://www.instagram.com/aspire.education.consultancy",
  facebook:
    process.env.FACEBOOK ??
    "https://www.facebook.com/profile.php?id=61588220492710"
};

export const partnerUniversities = [
  {
    name: "Amity University",
    image: "/university/Amity University.png"
  },
  {
    name: "Lovely Professional University",
    image: "/university/Lovely Professional University.png"
  },
  {
    name: "Manipal University",
    image: "/university/Manipal Academy.png"
  },
  {
    name: "Chandigarh University",
    image: "/university/Chandigarh University.png"
  },
  {
    name: "Sharda University",
    image: "/university/Sharda University.png"
  },
  {
    name: "Parul University",
    image: "/university/Parul university.png"
  },
  {
    name: "Subharti University",
    image: "/university/Subharti university.png"
  },
  {
    name: "Galgotias University",
    image: "/university/GALGOTIAS INSTITUTIONS.png"
  },
  {
    name: "Guru Gobind Singh Indraprastha University",
    image: "/university/Guru Gobind Singh Indraprastha University.png"
  },
  {
    name: "Kurukshetra University",
    image: "/university/kurukshetra university.png"
  },
  {
    name: "Maharishi Dayanand University",
    image: "/university/Maharishi dhyand university.png"
  }
];

// ✅ Types define karo
type Mode = "distance" | "regular";

type Course = {
  name: string;
  modes: Mode[];
};

type Stream = {
  title: string;
  description: string;
  courses: Course[];
};

// ✅ Proper typed data
export const courseStreams: Stream[] = [
  {
    title: "Management",
    description:
      "Job-ready business programs with flexible formats for freshers and working professionals.",
    courses: [
      { name: "MBA (All Streams)", modes: ["distance", "regular"] },
      { name: "BA", modes: ["distance","regular"] },
      { name: "BBA", modes: ["regular"] },
      { name: "B.COM", modes: ["distance","regular"] },
      { name: "BSC", modes: ["distance","regular"] },
    ]
  },
  {
    title: "Engineering",
    description:
      "Technical programs with guided admissions into leading approved institutions.",
    courses: [
      { name: "B.Tech", modes: ["regular"] },
      { name: "M.Tech", modes: ["regular"] },
      { name: "MCA", modes: ["regular"] },
      { name: "BCA", modes: ["regular"] },
    ]
  },
  {
    title: "Law",
    description:
      "Undergraduate and postgraduate law pathways with complete counseling support.",
    courses: [
      { name: "BA LLB", modes: ["regular"] },
      { name: "LLB", modes: ["regular"] },
      { name: "LLM", modes: ["regular"] }
    ]
  },
  {
    title: "Pharmacy",
    description:
      "Recognized pharmacy options designed around eligibility, approvals, and career goals.",
    courses: [
      { name: "D Pharma", modes: ["regular"] },
      { name: "B Pharmacy", modes: ["regular"] }
    ]
  },
  {
    title: "Education",
    description:
      "Teacher training and academic progression programs with documentation support.",
    courses: [
      { name: "B.Ed", modes: ["regular"] },
      { name: "M.Ed", modes: ["regular"] }
    ]
  }
];

// ✅ No change needed here
export const featuredCourses = [
  "MBA",
  "B.Tech",
  "BBA",
  "B.COM",
  "BSC",
  "BA",
  "BCA",
  "MCA",
  "M.Tech",
  "BA LLB",
  "LLB",
  "LLM",
  "D Pharma",
  "B Pharmacy",
  "B.Ed",
  "M.Ed"
];
export const trustMetrics = [
  {
    value: "15+",
    label: "Years Experience",
    description: "Experienced guidance across admissions, documentation, and career-aligned counseling."
  },
  {
    value: "50+",
    label: "Partner Universities",
    description: "A broad network of trusted universities for regular, distance, and professional programs."
  },
  {
    value: "10k+",
    label: "Students Placed",
    description: "Students guided into the right academic path with responsive end-to-end support."
  },
  {
    value: "UGC",
    label: "Recognized Degree",
    description: "Programs guided with a focus on recognized universities and valid academic outcomes.",
    icon: "/UCG.png" // check filename spelling
  },
  {
    value: "AICTE",
    label: "Approved Universities",
    description: "Support for institutions and programs aligned with required approvals where applicable.",
    icon: "/AICTE.png"
  },
  {
    value: "BCI",
    label: "Bar Council of India Approved",
    description: "Guidance for law programs aligned with Bar Council of India standards.",
    icon: "/BCI.png"
  },
  {
    value: "PCI",
    label: "Pharmacy Council of India Approved",
    description: "Support for pharmacy programs recognized by the Pharmacy Council of India.",
    icon: "/PCI.png"
  },
  {
    value: "NAAC",
    label: "Accredited Institutions",
    description: "Assistance in selecting NAAC-accredited institutions ensuring quality education.",
    icon: "/NAAC.png"
  },
  {
    value: "DEB",
    label: "Distance Education  Bureau Approved",
    description: "Guidance for distance and online programs approved by Distance Education Bureau.",
    icon: "/UCG.png" // ⚠️ ideally DEB ka alag logo hona chahiye
  },
  {
    value: "100%",
    label: "Trusted Guidance",
    description: "Transparent process with personalized counseling to ensure the best academic decisions."
  }
];