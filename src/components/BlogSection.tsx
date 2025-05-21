
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAllPosts, BlogPost } from "@/utils/blogUtils";
import { useToast } from "@/hooks/use-toast";
import BlogCard from "./blog/BlogCard";
import BlogPagination from "./blog/BlogPagination";
import BlogLoading from "./blog/BlogLoading";
import BlogError from "./blog/BlogError";

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const { toast } = useToast();
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const fetchPosts = async () => {
    try {
      console.log("Fetching blog posts...");
      setLoading(true);
      setError(null);
      
      const allPosts = await getAllPosts();
      console.log("Fetched blog posts:", allPosts);
      
      if (allPosts.length === 0) {
        setError("No blog posts found. Please check your content files.");
      } else {
        setPosts(allPosts);
        setError(null);
      }
    } catch (err) {
      console.error("Failed to fetch blog posts:", err);
      setError("Failed to load blog posts. Please try again later.");
      toast({
        title: "Error loading blog posts",
        description: "There was a problem loading the blog content.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
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
          <BlogLoading />
        ) : error ? (
          <BlogError error={error} onRetry={fetchPosts} />
        ) : posts.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p>No blog posts found.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <div key={post.id} className="animate-fade-in">
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
            
            <BlogPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            
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
