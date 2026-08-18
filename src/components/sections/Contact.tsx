"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useReveal, useRevealChildren } from "@/hooks/useReveal";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle,
} from "lucide-react";

const contactLinks = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/919876543210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@gdjersey.com",
    href: "mailto:hello@gdjersey.com",
  },
  {
    icon: MapPin,
    label: "Visit",
    value: "Graphica Designers HQ",
    href: "#",
  },
];

export default function Contact() {
  const headingRef = useRevealChildren();
  const formRef = useReveal();
  const linksRef = useRevealChildren();

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    const name = formData.get("name") as string;
    const service = formData.get("service") as string;
    const message = formData.get("message") as string;

    if (!name || name.trim().length < 2) {
      newErrors.name = "Name is required (min 2 characters)";
    }
    if (!service || service.trim().length < 2) {
      newErrors.service = "Please specify the service you need";
    }
    if (!message || message.trim().length < 10) {
      newErrors.message = "Please add more detail (min 10 characters)";
    }

    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newErrors = validateForm(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 bg-gd-dark-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-16 sm:mb-20">
          <span className="inline-block font-heading text-xs uppercase tracking-[0.3em] text-gd-red mb-4">
            Get In Touch
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-gd-cream mb-4">
            Start Your Project
          </h2>
          <p className="max-w-md mx-auto text-gd-cream-muted text-base">
            Tell us about your printing needs. We&apos;ll get back to you within hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
            <div>
              <label
                htmlFor="contact-name"
                className="block font-heading text-xs uppercase tracking-[0.2em] text-gd-cream-muted mb-2"
              >
                Your Name *
              </label>
              <Input
                id="contact-name"
                name="name"
                placeholder="John Doe"
                className="bg-gd-black/50 border-gd-cream/10 text-gd-cream placeholder:text-gd-cream/20 focus:border-gd-red/50 rounded-sm h-12"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-gd-red text-xs mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-service"
                className="block font-heading text-xs uppercase tracking-[0.2em] text-gd-cream-muted mb-2"
              >
                Service Needed *
              </label>
              <Input
                id="contact-service"
                name="service"
                placeholder="e.g. T-shirt printing, 50 pieces"
                className="bg-gd-black/50 border-gd-cream/10 text-gd-cream placeholder:text-gd-cream/20 focus:border-gd-red/50 rounded-sm h-12"
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? "service-error" : undefined}
              />
              {errors.service && (
                <p id="service-error" className="text-gd-red text-xs mt-1">
                  {errors.service}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-quantity"
                className="block font-heading text-xs uppercase tracking-[0.2em] text-gd-cream-muted mb-2"
              >
                Quantity
              </label>
              <Input
                id="contact-quantity"
                name="quantity"
                type="number"
                placeholder="e.g. 100"
                className="bg-gd-black/50 border-gd-cream/10 text-gd-cream placeholder:text-gd-cream/20 focus:border-gd-red/50 rounded-sm h-12"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block font-heading text-xs uppercase tracking-[0.2em] text-gd-cream-muted mb-2"
              >
                Message *
              </label>
              <Textarea
                id="contact-message"
                name="message"
                placeholder="Tell us about your project — design ideas, timeline, special requirements..."
                rows={5}
                className="bg-gd-black/50 border-gd-cream/10 text-gd-cream placeholder:text-gd-cream/20 focus:border-gd-red/50 rounded-sm resize-none"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-gd-red text-xs mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitted}
              className="w-full bg-gd-red hover:bg-gd-red-dark text-gd-cream font-heading uppercase tracking-wider text-sm h-12 rounded-sm transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(200,35,42,0.2)] disabled:opacity-70"
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Quote Request Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Quote Request
                </>
              )}
            </Button>
          </form>

          {/* Contact Links */}
          <div ref={linksRef} className="space-y-6 lg:pl-8">
            <div className="mb-8">
              <h3 className="font-heading text-xl uppercase tracking-wider text-gd-cream mb-3">
                Quick Contact
              </h3>
              <p className="text-sm text-gd-cream-muted leading-relaxed">
                Prefer a direct conversation? Reach out through any of these
                channels and we&apos;ll respond promptly.
              </p>
            </div>

            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-center gap-4 p-4 rounded-sm border border-gd-cream/5 bg-gd-black/30 hover:border-gd-red/30 hover:bg-gd-black/50 transition-all duration-500"
                  aria-label={`${link.label}: ${link.value}`}
                >
                  <div className="w-12 h-12 rounded-sm bg-gd-red/10 flex items-center justify-center group-hover:bg-gd-red/20 transition-colors flex-shrink-0">
                    <Icon className="w-5 h-5 text-gd-red" />
                  </div>
                  <div>
                    <p className="font-heading text-xs uppercase tracking-[0.2em] text-gd-cream-muted">
                      {link.label}
                    </p>
                    <p className="text-sm text-gd-cream">{link.value}</p>
                  </div>
                </a>
              );
            })}

            {/* Business Hours */}
            <div className="p-5 rounded-sm border border-gd-cream/5 bg-gd-dark-card">
              <h4 className="font-heading text-sm uppercase tracking-[0.2em] text-gd-cream mb-3">
                Business Hours
              </h4>
              <div className="space-y-1.5 text-sm text-gd-cream-muted">
                <div className="flex justify-between">
                  <span>Monday – Saturday</span>
                  <span className="text-gd-cream">9:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-gd-red">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
