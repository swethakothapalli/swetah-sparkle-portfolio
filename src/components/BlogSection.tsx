
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: Date;
  image: string;
  category: string;
  slug: string;
}

const BlogSection = () => {
  const posts: BlogPost[] = [
    {
      id: "1",
      title: "Beyond Basic EDA: Advanced Techniques for Data Understanding",
      excerpt: "Discover powerful techniques that go beyond the basic data exploration methods to uncover hidden patterns in complex datasets.",
      date: new Date(2023, 9, 12),
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Data Science",
      slug: "beyond-basic-eda"
    },
    {
      id: "2",
      title: "When Machine Learning Models Fail: Lessons from the Field",
      excerpt: "Learn from real-world examples of ML deployment challenges and how to overcome them.",
      date: new Date(2023, 8, 5),
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Machine Learning",
      slug: "ml-models-fail-lessons"
    },
    {
      id: "3",
      title: "Optimizing Python for Data-Intensive Applications",
      excerpt: "Practical tips to make your Python data processing pipelines more efficient and scalable.",
      date: new Date(2023, 7, 18),
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Programming",
      slug: "optimizing-python-data"
    }
  ];
  
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    {formatDistanceToNow(post.date, { addSuffix: true })}
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
      </div>
    </section>
  );
};

export default BlogSection;
