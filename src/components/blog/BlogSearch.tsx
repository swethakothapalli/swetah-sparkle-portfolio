
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlogSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const BlogSearch = ({ searchTerm, setSearchTerm }: BlogSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input
        type="text"
        placeholder="Search articles..."
        className="pl-10"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default BlogSearch;
