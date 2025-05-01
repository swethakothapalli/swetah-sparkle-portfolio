
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="heading-xl mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Oops! The page you're looking for doesn't exist.
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link to="/">Return Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
