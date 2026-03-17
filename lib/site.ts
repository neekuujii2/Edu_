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
  {
    name: "Amity University",
    image: "/university/Amity University.png"
  },
  {
    name: "Lovely Professional University",
    image: "/university/Lovely Professional University.png"
  },
  {
    name: "Manipal Academy",
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
    name: "Galgotias Institutions",
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

export const courseStreams = [
  {
    title: "Management",
    description: "Job-ready business programs with flexible formats for freshers and working professionals.",
    courses: [
      { name: "MBA (All Streams)", modes: ["distance", "regular"] },
      { name: "BBA", modes: ["regular"] }
    ]
  },
  {
    title: "Engineering",
    description: "Technical programs with guided admissions into leading approved institutions.",
    courses: [
      { name: "B.Tech", modes: ["regular"] },
      { name: "M.Tech", modes: ["regular"] }
    ]
  },
  {
    title: "Law",
    description: "Undergraduate and postgraduate law pathways with complete counseling support.",
    courses: [
      { name: "BA LLB", modes: ["regular"] },
      { name: "LLB", modes: ["regular"] },
      { name: "LLM", modes: ["distance", "regular"] }
    ]
  },
  {
    title: "Pharmacy",
    description: "Recognized pharmacy options designed around eligibility, approvals, and career goals.",
    courses: [
      { name: "D Pharma", modes: ["regular"] },
      { name: "B Pharmacy", modes: ["regular"] }
    ]
  },
  {
    title: "Education",
    description: "Teacher training and academic progression programs with documentation support.",
    courses: [
      { name: "B.Ed", modes: ["regular"] },
      { name: "M.Ed", modes: ["distance", "regular"] }
    ]
  }
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
    description: "Programs guided with a focus on recognized universities and valid academic outcomes."
  },
  {
    value: "AICTE",
    label: "Approved Universities",
    description: "Support for institutions and programs aligned with required approvals where applicable."
  }
];
