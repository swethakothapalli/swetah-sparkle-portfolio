
import React from "react";
import { Badge } from "@/components/ui/badge";

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
}

const TagFilter = ({ tags, activeTag, setActiveTag }: TagFilterProps) => {
  if (tags.length === 0) return null;

  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">Popular Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={activeTag === tag ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
