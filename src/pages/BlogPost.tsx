import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, BlogPost } from "@/utils/blogUtils";
import { useToast } from "@/hooks/use-toast";
import { isValid } from "date-fns";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug) {
          throw new Error("No slug provided");
        }
        
        setLoading(true);
        const postData = await getPostBySlug(slug);
        setPost(postData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
        setError("Failed to load blog post. It might have been moved or deleted.");
        toast({
          title: "Error loading blog post",
          description: "The requested blog post could not be loaded.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug, toast]);
  
  // Format date safely
  const formatPostDate = (date: Date | undefined | null) => {
    if (!date || !isValid(new Date(date))) {
      return "Date unavailable";
    }
    try {
      return new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      console.error("Error formatting post date:", e);
      return "Date unavailable";
    }
  };
  
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-16">
          <div className="container-content">
            <div className="text-center py-16">
              <p>Loading blog post...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (error || !post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-16">
          <div className="container-content">
            <div className="text-center py-16">
              <h2 className="heading-lg mb-4">Post Not Found</h2>
              <p className="text-muted-foreground mb-6">{error || "The blog post you're looking for doesn't exist."}</p>
              <Button asChild>
                <Link to="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Clean up the markdown content if needed
  const cleanContent = post?.content ? post.content.replace(/^---[\s\S]*?---/, '') : '';
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section with post image */}
        <section className="h-[60vh] relative">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container-content text-center text-white">
              <Badge variant="outline" className="mb-4 text-white border-white">
                {post.category}
              </Badge>
              <h1 className="heading-xl mb-4 text-white max-w-4xl mx-auto">{post.title}</h1>
              <div className="flex items-center justify-center space-x-4 text-white/90 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatPostDate(post.date)}
                </div>
                <span>•</span>
                <div>{post.readTime}</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog content section */}
        <section className="section">
          <div className="container-content max-w-4xl">
            <div className="mb-6">
              <Button asChild variant="outline" className="mb-8">
                <Link to="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown>
                {cleanContent}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPostPage;
