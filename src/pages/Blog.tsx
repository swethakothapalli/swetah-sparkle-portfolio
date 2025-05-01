
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getAllPosts, BlogPost } from "@/utils/blogUtils";

const Blog = () => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts();
        setAllPosts(posts);
        setFilteredPosts(posts);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  useEffect(() => {
    let results = allPosts;
    
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      results = results.filter(
        post =>
          post.title.toLowerCase().includes(lowerCaseSearch) ||
          post.excerpt.toLowerCase().includes(lowerCaseSearch) ||
          post.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch))
      );
    }
    
    if (activeCategory) {
      results = results.filter(post => post.category === activeCategory);
    }
    
    if (activeTag) {
      results = results.filter(post => post.tags.includes(activeTag));
    }
    
    setFilteredPosts(results);
  }, [searchTerm, activeCategory, activeTag, allPosts]);
  
  // Extract categories and tags from posts
  const categories = Array.from(new Set(allPosts.map(post => post.category))).sort();
  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags))).sort();
  
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
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
        
        {/* Blog Section */}
        <section className="section">
          <div className="container-content">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar with filters */}
              <div className="lg:col-span-1 space-y-8">
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
                
                {categories.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category} className="flex items-center">
                          <Button
                            variant="ghost"
                            className={`justify-start px-2 py-1 h-auto text-left w-full ${
                              activeCategory === category ? "bg-primary/10 text-primary" : ""
                            }`}
                            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                          >
                            {category}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {allTags.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
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
                )}
                
                {(activeCategory || activeTag || searchTerm) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setActiveCategory(null);
                      setActiveTag(null);
                      setSearchTerm("");
                    }}
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
              
              {/* Blog posts grid */}
              <div className="lg:col-span-3">
                {loading ? (
                  <div className="text-center py-16">
                    <p className="text-xl text-muted-foreground mb-4">Loading blog posts...</p>
                  </div>
                ) : filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden border border-border h-full flex flex-col">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        
                        <CardHeader>
                          <div className="flex justify-between items-center mb-2">
                            <Badge variant="secondary">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                            </span>
                          </div>
                          <CardTitle className="line-clamp-2">
                            <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                              {post.title}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="py-0">
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
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-xl text-muted-foreground mb-4">No articles found matching your criteria.</p>
                    <Button onClick={() => {
                      setSearchTerm("");
                      setActiveCategory(null);
                      setActiveTag(null);
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
