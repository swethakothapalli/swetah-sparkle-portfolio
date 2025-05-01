
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts, BlogPost } from "@/utils/blogUtils";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogGrid from "@/components/blog/BlogGrid";

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
  
  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory(null);
    setActiveTag(null);
  };
  
  return (
    <>
      <Navbar />
      <main>
        <BlogHeader />
        
        {/* Blog Section */}
        <section className="section">
          <div className="container-content">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar with filters */}
              <BlogSidebar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                tags={allTags}
                activeTag={activeTag}
                setActiveTag={setActiveTag}
                clearFilters={clearFilters}
              />
              
              {/* Blog posts grid */}
              <div className="lg:col-span-3">
                <BlogGrid 
                  loading={loading} 
                  filteredPosts={filteredPosts}
                  clearFilters={clearFilters}
                />
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
