
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section className="section bg-secondary/20 dark:bg-secondary/10">
      <div className="container-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Swetah working"
              className="rounded-lg shadow-lg w-full object-cover"
              style={{ maxHeight: "500px" }}
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="heading-lg mb-2">About Me</h2>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>
            
            <p className="text-muted-foreground">
              Hello! I'm Swetah Kothapalli, a passionate Data Scientist with 4+ years of experience using Python to solve complex problems and extract valuable insights from data.
            </p>
            
            <p>
              My background combines strong technical skills with a keen understanding of business objectives, allowing me to translate raw data into strategic recommendations that drive results.
            </p>
            
            <div className="grid grid-cols-2 gap-4 my-6">
              <div>
                <h3 className="font-semibold text-lg">Skills</h3>
                <ul className="mt-2 space-y-1">
                  <li>• Data Analysis</li>
                  <li>• Machine Learning</li>
                  <li>• Statistical Modeling</li>
                  <li>• Data Visualization</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg">Education</h3>
                <ul className="mt-2 space-y-1">
                  <li>• MS in Data Science</li>
                  <li>• BS in Computer Science</li>
                  <li>• ML Certification</li>
                </ul>
              </div>
            </div>
            
            <Button asChild variant="default" className="font-medium">
              <Link to="/about">
                Learn More About Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
