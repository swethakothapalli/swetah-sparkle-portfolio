import { useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard, { Project } from "./ProjectCard";
import { Link } from "react-router-dom";

const ProjectsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const projects: Project[] = [
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
    }
  ];
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
      
      // Update scroll position
      setTimeout(() => {
        if (container) {
          setScrollPosition(container.scrollLeft);
        }
      }, 300);
    }
  };
  
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };
  
  return (
    <section className="section">
      <div className="container-content">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h2 className="heading-lg mb-2">Featured Projects</h2>
            <div className="h-1 w-20 bg-primary rounded-full"></div>
            <p className="text-muted-foreground mt-4 max-w-xl">
              A selection of my recent data science and machine learning projects.
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={scrollPosition === 0}
              className="mr-2"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-8 scroll-smooth hide-scrollbar"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] flex-shrink-0 animate-fade-in"
              style={{ animationDelay: `${parseInt(project.id) * 150}ms` }}
            >
              <ProjectCard project={project} className="h-full" />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button asChild variant="default" className="font-medium">
            <Link to="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
