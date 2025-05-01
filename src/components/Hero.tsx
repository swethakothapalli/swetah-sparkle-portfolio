
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const quotes = [
    "Data has a better idea.",
    "Where data speaks, insights emerge.",
    "Turning data into decisions.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <section className="min-h-[90vh] flex flex-col justify-center relative overflow-hidden pt-20">
      <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in">
          <h1 className="heading-xl gradient-text">
            Hi, I'm Swetah Kothapalli
          </h1>
          <p className="text-xl md:text-2xl font-light">
            Data Scientist & Python Developer with <span className="font-medium">4+ years</span> of turning complex data into actionable insights.
          </p>
          
          <div className="h-20">
            <p className="text-lg md:text-xl text-muted-foreground italic transition-opacity duration-500">
              "{quotes[currentQuote]}"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="font-medium">
              <Link to="/projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-medium">
              <Link to="/contact">
                Get In Touch
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="relative flex justify-center lg:justify-end animate-slide-in">
          <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Swetah Kothapalli"
              className="w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-full"
            />
          </div>
          <div className="absolute -bottom-4 right-4 md:right-12 bg-background shadow-lg rounded-lg p-4 max-w-xs">
            <span className="font-medium block mb-1">Languages & Tools:</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-secondary/80 rounded-md text-xs font-medium">Python</span>
              <span className="px-2 py-1 bg-secondary/80 rounded-md text-xs font-medium">Pandas</span>
              <span className="px-2 py-1 bg-secondary/80 rounded-md text-xs font-medium">Scikit-learn</span>
              <span className="px-2 py-1 bg-secondary/80 rounded-md text-xs font-medium">TensorFlow</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Element */}
      <div className="absolute -z-10 top-1/3 left-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -z-10 bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default Hero;
