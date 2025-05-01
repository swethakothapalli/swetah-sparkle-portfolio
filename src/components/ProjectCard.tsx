
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={cn(
        "overflow-hidden border border-border transition-all duration-300 h-full flex flex-col", 
        isHovered ? "shadow-md transform -translate-y-1" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={project.image} 
          alt={project.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered ? "scale-105" : ""
          )}
        />
      </div>
      
      <CardHeader>
        <CardTitle className="font-display text-xl">{project.title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </CardDescription>
      </CardContent>
      
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full group">
          <Link to={project.link}>
            View Project
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
