
import React from "react";

const BlogHeader = () => {
  return (
    <section className="pt-32 pb-16 md:pb-24 bg-secondary/20 dark:bg-secondary/10">
      <div className="container-content">
        <div className="max-w-3xl">
          <h1 className="heading-xl mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, insights, and explorations in data science, machine learning, and technology.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHeader;
