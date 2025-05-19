
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/utils/projectUtils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const Projects = () => {
  const allProjects: Project[] = [
    {
      id: "1",
      title: "Customer Segmentation Analysis",
      description: "Applied unsupervised learning techniques to segment customers based on purchasing behavior, increasing targeted campaign efficiency by 30%.",
      tags: ["Python", "Scikit-learn", "Clustering", "Data Visualization"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/projects/customer-segmentation"
    },
    {
      id: "2",
      title: "Predictive Sales Forecasting",
      description: "Built a time series forecasting model to predict monthly sales trends with 92% accuracy, enabling better inventory management.",
      tags: ["Time Series", "Prophet", "Feature Engineering"],
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/projects/sales-forecasting"
    },
    {
      id: "3",
      title: "NLP for Customer Support",
      description: "Developed a sentiment analysis tool to automatically categorize customer feedback, reducing response time by 40%.",
      tags: ["NLP", "BERT", "Python", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/projects/nlp-customer-support"
    },
    {
      id: "4",
      title: "Real-time Anomaly Detection",
      description: "Created a system to detect anomalies in IoT sensor data streams in real-time, preventing equipment failures.",
      tags: ["Anomaly Detection", "Streaming Data", "Kafka"],
      image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/projects/anomaly-detection"
    },
    {
      id: "5",
      title: "Recommender System for E-commerce",
      description: "Built a collaborative filtering-based recommendation engine that improved click-through rates by 22% and increased average order value.",
      tags: ["Recommender Systems", "Collaborative Filtering", "Python", "AWS"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/projects/recommender-system"
    },
    {
      id: "6",
      title: "Computer Vision for Quality Control",
      description: "Developed a CV system to detect manufacturing defects with 98% accuracy, reducing manual inspection time by 75%.",
      tags: ["Computer Vision", "OpenCV", "CNNs", "PyTorch"],
      image: "https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/projects/computer-vision-qc"
    },
    {
      id: "7",
      title: "Fraud Detection System",
      description: "Implemented an ensemble learning approach for detecting fraudulent transactions with high precision and recall rates.",
      tags: ["Machine Learning", "Ensemble Methods", "Fraud Detection"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/projects/fraud-detection"
    },
    {
      id: "8",
      title: "Churn Prediction Model",
      description: "Created a predictive model to identify customers at risk of churning, allowing for proactive retention strategies.",
      tags: ["Predictive Modeling", "XGBoost", "Feature Engineering"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/projects/churn-prediction"
    },
  ];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(allProjects);
  
  const allTags = Array.from(
    new Set(allProjects.flatMap(project => project.tags))
  ).sort();
  
  useEffect(() => {
    let results = allProjects;
    
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      results = results.filter(
        project =>
          project.title.toLowerCase().includes(lowerCaseSearch) ||
          project.description.toLowerCase().includes(lowerCaseSearch) ||
          project.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch))
      );
    }
    
    if (activeFilter) {
      results = results.filter(project => project.tags.includes(activeFilter));
    }
    
    setFilteredProjects(results);
  }, [searchTerm, activeFilter, allProjects]);
  
  const handleFilterClick = (tag: string) => {
    setActiveFilter(activeFilter === tag ? null : tag);
  };
  
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pb-24 bg-secondary/20 dark:bg-secondary/10">
          <div className="container-content">
            <div className="max-w-3xl">
              <h1 className="heading-xl mb-4">My Projects</h1>
              <p className="text-xl text-muted-foreground">
                Explore some of the data science projects I've worked on over the years.
              </p>
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section className="section">
          <div className="container-content">
            {/* Search and Filters */}
            <div className="mb-12 space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search projects by name, description, or technology..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Filter by technology:</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={activeFilter === tag ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleFilterClick(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {activeFilter && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveFilter(null)}
                      className="text-sm"
                    >
                      Clear filter
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Project Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">No projects found matching your criteria.</p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setActiveFilter(null);
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Projects;
