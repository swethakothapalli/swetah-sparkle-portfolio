
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatDistanceToNow, isValid } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/utils/blogTypes";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  // Format date with validation to avoid "Invalid time value" error
  const getFormattedDate = () => {
    try {
      const dateObj = new Date(post.date);
      if (isValid(dateObj)) {
        return formatDistanceToNow(dateObj, { addSuffix: true });
      }
      return "Date unavailable";
    } catch (err) {
      console.error("Error formatting date:", err, post.date);
      return "Date unavailable";
    }
  };

  return (
    <Card className="overflow-hidden border border-border h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            console.error(`Failed to load image for post: ${post.title}`);
            e.currentTarget.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d";
          }}
        />
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary" className="font-medium">
            {post.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {getFormattedDate()}
          </span>
        </div>
        <CardTitle className="line-clamp-2">
          <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="py-0 flex-grow">
        <CardDescription className="line-clamp-3 mb-4">
          {post.excerpt}
        </CardDescription>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button asChild variant="ghost" className="p-0 h-auto group">
          <Link to={`/blog/${post.slug}`}>
            Read Article
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
