"use client";
import Link from "next/link";

// Data
const cards = [
  {
    title: "About Us",
    description: "Learn more about our team, mission, and values.",
    href: "/about",
  },
  {
    title: "Contact",
    description: "Get in touch with us for any queries or support.",
    href: "/contact",
  },
  {
    title: "Todo App",
    description: "Try our simple and effective todo application.",
    href: "/todo",
  },
  {
    title: "Blog",
    description: "Read our latest articles and updates.",
    href: "/blog",
  },
];

const stats = [
  { label: "Projects Delivered", value: "150+" },
  { label: "Happy Clients", value: "120+" },
  { label: "Awards Won", value: "8" },
  { label: "Years in Business", value: "6" },
];

const highlights = [
  {
    title: "Innovation",
    desc: "We embrace new ideas and technologies to deliver cutting-edge solutions.",
  },
  {
    title: "Collaboration",
    desc: "Teamwork and open communication drive the best results.",
  },
  {
    title: "Integrity",
    desc: "We act with honesty, transparency, and respect in all our interactions.",
  },
  {
    title: "Customer Focus",
    desc: "Our clients are at the center of everything we do.",
  },
];

const testimonials = [
  {
    name: "Amit Sharma",
    role: "CEO, TechNova",
    quote:
      "NextApp delivered our project on time with exceptional quality. Their team is truly innovative and reliable.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Priya Patel",
    role: "Founder, EduSpark",
    quote:
      "Working with NextApp was a fantastic experience. Their customer focus and technical expertise are unmatched.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const partners = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
];

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <section className="w-full max-w-4xl text-center mb-12">
          <h2 className="text-5xl  text-indigo-700 mb-4 drop-shadow">
            Empowering Your Ideas with Modern Web Solutions
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover how NextApp can help you grow. We are passionate about
            building next-generation digital experiences for startups and
            enterprises.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl mb-12">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group block bg-white rounded-2xl shadow-lg p-6 border border-indigo-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-indigo-700 mb-2 group-hover:text-indigo-900 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.description}</p>
              <span className="inline-block mt-4 text-indigo-500 font-semibold group-hover:translate-x-1 transition-transform">
                Explore &rarr;
              </span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl w-full mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="text-2xl font-bold text-indigo-700">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-gray-500 text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl w-full mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Why Choose NextApp?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="bg-indigo-50 rounded p-4 text-left"
              >
                <div className="text-indigo-700 font-bold mb-1">
                  {item.title}
                </div>
                <div className="text-gray-600 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl w-full mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-xl shadow p-6 flex items-start gap-4"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border border-indigo-200"
                />
                <div>
                  <p className="text-gray-700 italic mb-3">"{t.quote}"</p>
                  <div className="font-bold text-indigo-700">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl w-full mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Our Partners
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner) => (
              <div key={partner.name} className="flex flex-col items-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 mb-2 object-contain"
                />
                <span className="text-xs text-gray-500">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
