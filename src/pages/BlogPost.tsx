
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
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
                  h4: ({ children }) => <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>,
                  p: ({ children }) => <p className="my-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-md my-6"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                  img: ({ src, alt }) => (
                    <div className="my-6">
                      <img src={src} alt={alt} className="rounded-md mx-auto" />
                      {alt && <p className="text-center text-sm text-muted-foreground mt-2">{alt}</p>}
                    </div>
                  ),
                  hr: () => <hr className="my-8 border-border" />,
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="w-full border-collapse">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-border px-4 py-2">{children}</td>
                  ),
                }}
              >
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
