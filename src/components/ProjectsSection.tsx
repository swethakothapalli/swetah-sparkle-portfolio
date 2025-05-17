
import { useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard, { Project } from "./ProjectCard";
import { Link } from "react-router-dom";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const ProjectsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;
  
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
  
  // Calculate total pages
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  
  // Get current projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentProjects.map((project) => (
            <div 
              key={project.id}
              className="animate-fade-in"
              style={{ animationDelay: `${parseInt(project.id) * 150}ms` }}
            >
              <ProjectCard project={project} className="h-full" />
            </div>
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
