"use client";

import {
  Phone,
  Mail,
  MapPin,
  AtSign,
  ArrowUp,
  Globe,
  MessageCircle,
} from "lucide-react";

const serviceLinks = [
  "T-Shirt Printing",
  "Jersey Printing",
  "Mug Printing",
  "Cap Printing",
  "Business Cards",
  "Banners & Posters",
  "Corporate Gifts",
  "Graphic Designing",
];

const socialLinks = [
  { icon: AtSign, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "WhatsApp" },
  { icon: Globe, href: "#", label: "Website" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gd-black border-t border-gd-cream/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gd-red flex items-center justify-center font-heading font-bold text-lg text-gd-cream tracking-wider">
                GD
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-gd-cream leading-none tracking-wider uppercase">
                  GD Jersey
                </p>
                <p className="text-[10px] text-gd-cream-muted tracking-[0.2em] uppercase">
                  T-Shirt Printing
                </p>
              </div>
            </div>
            <p className="text-sm text-gd-cream-muted leading-relaxed mb-6 max-w-xs">
              Graphica Designers — your one-stop custom printing & branding shop.
              Fast turnaround, in-house design team, wide product range.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-sm border border-gd-cream/10 flex items-center justify-center text-gd-cream-muted hover:text-gd-red hover:border-gd-red/30 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-[0.2em] text-gd-cream mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm text-gd-cream-muted hover:text-gd-cream transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-[0.2em] text-gd-cream mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="text-sm text-gd-cream-muted hover:text-gd-cream transition-colors"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-sm text-gd-cream-muted hover:text-gd-cream transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="text-sm text-gd-cream-muted hover:text-gd-cream transition-colors"
                >
                  Our Process
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-gd-cream-muted hover:text-gd-cream transition-colors"
                >
                  Get a Quote
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-[0.2em] text-gd-cream mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gd-red mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-sm text-gd-cream-muted hover:text-gd-cream transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gd-red mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:hello@gdjersey.com"
                  className="text-sm text-gd-cream-muted hover:text-gd-cream transition-colors"
                >
                  hello@gdjersey.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gd-red mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gd-cream-muted">
                  Graphica Designers HQ
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-gd-cream/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gd-cream-muted text-center sm:text-left">
            © {new Date().getFullYear()} Graphica Designers. All rights
            reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-gd-cream-muted hover:text-gd-red transition-colors"
            aria-label="Scroll to top"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
