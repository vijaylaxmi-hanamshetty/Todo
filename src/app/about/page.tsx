import Link from "next/link";
import AuthGuard from "../components/AuthGuard";

const aboutLinks = [
  { label: "Open roles", href: "#" },
  { label: "Internship program", href: "#" },
  { label: "Our values", href: "#" },
  { label: "Meet our leadership", href: "#" },
  { label: "Our projects", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact us", href: "#" },
];

const stats = [
  { label: "Offices worldwide", value: "12" },
  { label: "Full-time colleagues", value: "300+" },
  { label: "Hours per week", value: "40" },
  { label: "Paid time off", value: "Unlimited" },
  { label: "Projects delivered", value: "150+" },
  { label: "Happy clients", value: "120+" },
  { label: "Awards won", value: "8" },
  { label: "Years in business", value: "6" },
];

const values = [
  {
    title: "Innovation",
    description: "We embrace new ideas and technologies to deliver cutting-edge solutions.",
  },
  {
    title: "Collaboration",
    description: "We believe teamwork and open communication drive the best results.",
  },
  {
    title: "Integrity",
    description: "We act with honesty, transparency, and respect in all our interactions.",
  },
  {
    title: "Customer Focus",
    description: "We put our clients at the center of everything we do.",
  },
];

export default function About() {
  return (
    <AuthGuard>
      <section className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-10 sm:py-16">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-indigo-600">NextApp</span>
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            NextApp is a passionate team of developers, designers, and strategists dedicated to building the next generation of web experiences.
          </p>
          <p className="text-base text-gray-500 mb-8">
            Since our founding in 2019, we’ve helped startups and enterprises launch over 150 successful projects. Our mission is to empower people and organizations through technology, design, and collaboration. We value creativity, transparency, and a relentless drive for excellence.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {aboutLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded px-4 py-2 text-indigo-600 border border-indigo-100 hover:bg-indigo-50 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="text-2xl font-bold text-indigo-700">{stat.value}</div>
              <div className="mt-1 text-xs text-gray-500 text-center">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-indigo-50 rounded p-4 text-left">
                <div className="text-indigo-700 font-bold mb-1">{value.title}</div>
                <div className="text-gray-600 text-sm">{value.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </AuthGuard>
  );
}