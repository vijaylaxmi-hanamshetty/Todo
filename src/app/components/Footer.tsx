import Link from "next/link";
import { Facebook, Twitter, Instagram, Globe, Mail } from "lucide-react";

import { LucideIcon } from "lucide-react";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Product",
    links: [
      { name: "Todo App", href: "/todo" },
      { name: "Blog", href: "/blog" },
      { name: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
];

// Social media links
const socialLinks: {
  name: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { name: "Website", href: "#", icon: Globe },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Instagram", href: "#", icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 px-4 py-6">
      <div className="max-w-7xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">NextApp</h2>
          <p className="text-sm mb-2">
            Empowering your ideas with modern web solutions.
          </p>
          <div className="flex gap-4">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="text-gray-400 hover:text-white transition"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {footerLinks.map(({ title, links }) => (
          <div key={title}>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <ul className="space-y-2  flex">
              {links.map(({ name, href }) => (
                <li key={name} className="">
                  <Link
                    href={href}
                    className="hover:text-white text-sm text-gray-400 transition p-2"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="lg:col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-2">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-2">
            Subscribe for updates, news, and promotions.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              <Mail size={18} />
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Map */}
      <div className="mt-6 max-w-7xl mx-auto">
        <h3 className="text-lg font-semibold text-white mb-2">Find Us</h3>
        <div className="w-full h-40 rounded-lg overflow-hidden border border-gray-700">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241318.73903657986!2d72.74109812425596!3d19.08219783935609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63a1e5440f3%3A0xdea0980c3bd7acfd!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1716092042069!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-gray-500 mt-6 pt-4 border-t border-gray-700">
        &copy; {new Date().getFullYear()} NextApp. All rights reserved.
      </div>
    </footer>
  );
}
