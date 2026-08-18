"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Shirt,
  Coffee,
  Trophy,
  Briefcase,
  Printer,
  Gift,
  CreditCard,
  Flag,
  FileText,
  Key,
  Mouse,
  Droplets,
  Palette,
  Globe,
  Clock,
  Calendar,
  BookOpen,
  Gem,
  PenTool,
  Layout,
  Image as ImageIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useReveal, useRevealChildren } from "@/hooks/useReveal";

interface ServiceCategory {
  title: string;
  description: string;
  services: { name: string; icon: LucideIcon }[];
}

const categories: ServiceCategory[] = [
  {
    title: "Apparel & Wearables",
    description: "Custom printed clothing for every occasion",
    services: [
      { name: "T-Shirt & Jersey Printing", icon: Shirt },
      { name: "Cap Printing", icon: Trophy },
      { name: "Dress Code / Uniform Printing", icon: Briefcase },
    ],
  },
  {
    title: "Drinkware & Gifts",
    description: "Personalized products that leave an impression",
    services: [
      { name: "Mug Printing", icon: Coffee },
      { name: "Customized Gift Items", icon: Gift },
      { name: "Water Bottle Printing", icon: Droplets },
      { name: "Key Chain Printing", icon: Key },
      { name: "Mouse Pad Printing", icon: Mouse },
    ],
  },
  {
    title: "Print & Signage",
    description: "From business cards to banners, we print it all",
    services: [
      { name: "Business Card Printing", icon: CreditCard },
      { name: "Banners & Posters", icon: Flag },
      { name: "Flyers & Brochures", icon: FileText },
      { name: "ID Card Printing", icon: CreditCard },
      { name: "Calendars & Magazines", icon: Calendar },
      { name: "Letterpress & Screen Printing", icon: Printer },
    ],
  },
  {
    title: "Home & Specialty",
    description: "Unique printing on unconventional surfaces",
    services: [
      { name: "Photo Frame / Photo Printing", icon: ImageIcon },
      { name: "Cushion & Pillow Covers", icon: Gem },
      { name: "Stone / Rock Tile Printing", icon: Layout },
      { name: "Customized Clock Printing", icon: Clock },
    ],
  },
  {
    title: "Corporate & Design",
    description: "Complete branding solutions for your business",
    services: [
      { name: "Corporate Gift Products", icon: BookOpen },
      { name: "Graphic Designing", icon: PenTool },
      { name: "Website Designing", icon: Globe },
    ],
  },
];

export default function Services() {
  const headingRef = useRevealChildren();
  const cardsRef = useRevealChildren(0.05);

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 bg-gd-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-16 sm:mb-20">
          <span className="inline-block font-heading text-xs uppercase tracking-[0.3em] text-gd-red mb-4">
            What We Do
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-gd-cream mb-4">
            Our Services
          </h2>
          <p className="max-w-md mx-auto text-gd-cream-muted text-base">
            From apparel to signage, every surface is a canvas for your brand.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => (
            <Card
              key={category.title}
              className="service-card group bg-gd-dark-card border-gd-cream/5 hover:border-gd-red/30 transition-all duration-500 hover:-translate-y-1 rounded-sm overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-sm bg-gd-red/10 flex items-center justify-center group-hover:bg-gd-red/20 transition-colors">
                    <Palette className="w-5 h-5 text-gd-red" />
                  </div>
                  <CardTitle className="font-heading text-lg uppercase tracking-wider text-gd-cream">
                    {category.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-gd-cream-muted text-sm">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <div className="space-y-2.5">
                  {category.services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={service.name}
                        className="flex items-center gap-3 text-sm text-gd-cream/70 hover:text-gd-cream group/item transition-colors cursor-default"
                      >
                        <Icon className="w-4 h-4 text-gd-cream/30 group-hover/item:text-gd-red transition-colors flex-shrink-0" />
                        <span>{service.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
