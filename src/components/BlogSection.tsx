
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { getAllPosts, BlogPost } from "@/utils/blogUtils";

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        // Get exactly 3 posts for the homepage section
        setPosts(allPosts.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  return (
    <section className="section bg-secondary/20 dark:bg-secondary/10">
      <div className="container-content">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-2">From The Blog</h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto"></div>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Thoughts, insights, and explorations in data science, machine learning, and technology.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p>Loading blog posts...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden border border-border h-full flex flex-col animate-fade-in">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  <CardHeader className="pt-5 pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="secondary">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-grow py-4">
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <Button asChild variant="ghost" className="p-0 h-auto font-medium group">
                      <Link to={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="default">
                <Link to="/blog">
                  View All Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
