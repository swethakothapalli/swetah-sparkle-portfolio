
import React from 'react';
import { Button } from "@/components/ui/button";

interface BlogErrorProps {
  error: string;
  onRetry: () => void;
}

const BlogError = ({ error, onRetry }: BlogErrorProps) => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-center">
        <p className="text-red-500">{error}</p>
        <Button 
          onClick={onRetry} 
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default BlogError;
