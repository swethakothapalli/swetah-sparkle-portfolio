
import React from "react";
import { Button } from "@/components/ui/button";
import BlogSearch from "./BlogSearch";
import CategoryFilter from "./CategoryFilter";
import TagFilter from "./TagFilter";

interface BlogSidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  tags: string[];
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
  clearFilters: () => void;
}

const BlogSidebar = ({
  searchTerm,
  setSearchTerm,
  categories,
  activeCategory,
  setActiveCategory,
  tags,
  activeTag,
  setActiveTag,
  clearFilters,
}: BlogSidebarProps) => {
  return (
    <div className="lg:col-span-1 space-y-8">
      <BlogSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      
      <TagFilter 
        tags={tags} 
        activeTag={activeTag} 
        setActiveTag={setActiveTag} 
      />
      
      {(activeCategory || activeTag || searchTerm) && (
        <Button variant="outline" onClick={clearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  );
};

export default BlogSidebar;
