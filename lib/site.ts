export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Aspire Education Consultancy",
  description:
    "Premium education consultancy for UG, PG, distance learning, and open schooling admissions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  keywords: [
    "Education consultancy",
    "Distance MBA admission",
    "B.Tech admission",
    "Open schooling NIOS",
    "UG PG admission consultancy"
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
  "Amity University",
  "LPU",
  "Manipal",
  "Jain University",
  "Chandigarh University",
  "Sharda University",
  "Bharathidasan",
  "GLA University"
];

export const courseStreams = [
  { title: "Management", courses: ["MBA (All Streams)"] },
  { title: "Engineering", courses: ["B.Tech", "M.Tech"] },
  { title: "Law", courses: ["BA LLB", "LLB", "LLM"] },
  { title: "Pharmacy", courses: ["D Pharma", "B Pharmacy"] },
  { title: "Education", courses: ["B.Ed", "M.Ed"] }
];

export const featuredCourses = [
  "MBA",
  "B.Tech",
  "BA LLB",
  "LLB",
  "LLM",
  "D Pharma",
  "B Pharmacy",
  "B.Ed",
  "M.Ed"
];
