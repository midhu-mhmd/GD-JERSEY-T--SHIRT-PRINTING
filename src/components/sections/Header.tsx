"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        id="header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gd-black/90 backdrop-blur-xl border-b border-gd-cream/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center group"
            aria-label="GD Jersey - Home"
          >
            <div className="relative h-11 sm:h-14 rounded-md border border-gd-cream/10 bg-gd-black p-1.5 shadow-sm group-hover:border-gd-red/40 group-hover:shadow-[0_0_20px_rgba(200,35,42,0.2)] group-hover:scale-105 transition-all duration-500 overflow-hidden flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="GD Jersey Logo"
                className="h-full w-auto object-contain rounded-sm"
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative font-heading text-sm uppercase tracking-[0.15em] text-gd-cream/70 hover:text-gd-cream transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gd-red group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              className={buttonVariants({
                className:
                  "bg-gd-red hover:bg-gd-red-dark text-gd-cream font-heading uppercase tracking-wider text-sm px-6 rounded-sm transition-all hover:scale-[1.02]",
              })}
            >
              Get a Quote
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gd-cream p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-gd-black/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="font-heading text-3xl uppercase tracking-[0.2em] text-gd-cream hover:text-gd-red transition-colors"
            style={{
              transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms",
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              opacity: mobileOpen ? 1 : 0,
              transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {link.label}
          </a>
        ))}
        <Button
          className="bg-gd-red hover:bg-gd-red-dark text-gd-cream font-heading uppercase tracking-wider text-lg px-10 py-6 rounded-sm mt-4"
          style={{
            transitionDelay: mobileOpen
              ? `${navLinks.length * 80}ms`
              : "0ms",
            transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
            opacity: mobileOpen ? 1 : 0,
            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          onClick={() => {
            setMobileOpen(false);
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Get a Quote
        </Button>
      </div>
    </>
  );
}
