
import React from "react";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }: CategoryFilterProps) => {
  if (categories.length === 0) return null;

  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center">
            <Button
              variant="ghost"
              className={`justify-start px-2 py-1 h-auto text-left w-full ${
                activeCategory === category ? "bg-primary/10 text-primary" : ""
              }`}
              onClick={() => setActiveCategory(activeCategory === category ? null : category)}
            >
              {category}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
