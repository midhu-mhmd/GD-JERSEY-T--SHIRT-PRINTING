"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { useRevealChildren } from "@/hooks/useReveal";

const portfolioItems = [
  {
    id: 1,
    title: "Team Jersey Collection",
    category: "Apparel",
    color: "#C8232A",
  },
  {
    id: 2,
    title: "Corporate Mug Set",
    category: "Drinkware",
    color: "#2A5C3A",
  },
  {
    id: 3,
    title: "Event Banner Series",
    category: "Signage",
    color: "#1A3A5C",
  },
  {
    id: 4,
    title: "Business Card Design",
    category: "Print",
    color: "#5C3A1A",
  },
  {
    id: 5,
    title: "Custom Cap Printing",
    category: "Apparel",
    color: "#3A1A5C",
  },
  {
    id: 6,
    title: "Gift Hamper Branding",
    category: "Gifts",
    color: "#1A5C5C",
  },
];

export default function Portfolio() {
  const headingRef = useRevealChildren();
  const gridRef = useRevealChildren(0.05);
  const [selectedItem, setSelectedItem] = useState<
    (typeof portfolioItems)[0] | null
  >(null);

  return (
    <section
      id="portfolio"
      className="relative py-24 sm:py-32 bg-gd-dark-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-16 sm:mb-20">
          <span className="inline-block font-heading text-xs uppercase tracking-[0.3em] text-gd-red mb-4">
            Our Work
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-gd-cream mb-4">
            Portfolio
          </h2>
          <p className="max-w-md mx-auto text-gd-cream-muted text-base">
            A selection of our recent custom printing and branding projects.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {portfolioItems.map((item, idx) => (
            <button
              key={item.id}
              className={`portfolio-item group relative overflow-hidden rounded-sm cursor-pointer ${
                idx === 0 || idx === 5
                  ? "sm:row-span-2 aspect-[3/4]"
                  : "aspect-square"
              }`}
              onClick={() => setSelectedItem(item)}
              aria-label={`View ${item.title}`}
            >
              {/* Placeholder colored background */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundColor: item.color }}
              >
                {/* Geometric pattern placeholder */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="w-32 h-32 border-4 border-white/30 rounded-full" />
                  <div className="absolute w-20 h-20 border-2 border-white/20 rotate-45" />
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gd-black/80 via-gd-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gd-red font-heading">
                  {item.category}
                </span>
                <h3 className="font-heading text-lg uppercase tracking-wider text-gd-cream mt-1">
                  {item.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!selectedItem}
        onOpenChange={() => setSelectedItem(null)}
      >
        <DialogContent className="max-w-3xl bg-gd-dark-card border-gd-cream/10 p-0 rounded-sm overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>{selectedItem?.title || "Portfolio Item"}</DialogTitle>
          </VisuallyHidden>
          {selectedItem && (
            <div>
              <div
                className="w-full aspect-video flex items-center justify-center relative"
                style={{ backgroundColor: selectedItem.color }}
              >
                <div className="text-center">
                  <div className="w-24 h-24 border-4 border-white/20 rounded-full mx-auto mb-4" />
                  <span className="text-white/40 font-heading uppercase tracking-wider text-sm">
                    Sample Work Preview
                  </span>
                </div>
              </div>
              <div className="p-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gd-red font-heading">
                  {selectedItem.category}
                </span>
                <h3 className="font-heading text-2xl uppercase tracking-wider text-gd-cream mt-1 mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-gd-cream-muted">
                  Custom designed and printed with premium materials. This project
                  showcases our attention to detail and commitment to quality
                  craftsmanship.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
