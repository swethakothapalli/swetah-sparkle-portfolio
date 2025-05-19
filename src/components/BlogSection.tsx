
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAllPosts, BlogPost } from "@/utils/blogUtils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Fetching blog posts...");
        const allPosts = await getAllPosts();
        console.log("Fetched blog posts:", allPosts);
        setPosts(allPosts);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
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
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p>Loading blog posts...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p className="text-red-500">{error}</p>
              <Button 
                onClick={() => {setLoading(true); setError(null); getAllPosts().then(setPosts).finally(() => setLoading(false)).catch(e => setError(e.message))}} 
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          </div>
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
            
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => handlePageChange(index + 1)}
                          isActive={currentPage === index + 1}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
            
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
