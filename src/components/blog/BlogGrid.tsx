
import React from "react";
import { BlogPost } from "@/utils/blogUtils";
import { Button } from "@/components/ui/button";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  loading: boolean;
  filteredPosts: BlogPost[];
  clearFilters: () => void;
}

const BlogGrid = ({ loading, filteredPosts, clearFilters }: BlogGridProps) => {
  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground mb-4">Loading blog posts...</p>
      </div>
    );
  }
  
  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground mb-4">No articles found matching your criteria.</p>
        <Button onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {filteredPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogGrid;
