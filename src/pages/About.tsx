
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillsSection from "@/components/SkillsSection";
import { ArrowRight, Award, BookOpen, Briefcase, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const experience = [
    {
      title: "Senior Data Scientist",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description: "Leading a team to develop and deploy machine learning solutions for customer analytics and prediction modeling."
    },
    {
      title: "Data Scientist",
      company: "Data Innovations LLC",
      period: "2020 - 2022",
      description: "Designed and implemented data processing pipelines and predictive models for various business applications."
    },
    {
      title: "Junior Data Analyst",
      company: "Analytics Startup",
      period: "2019 - 2020",
      description: "Performed data cleaning, visualization, and basic analysis for business intelligence reports."
    }
  ];
  
  const education = [
    {
      degree: "MSc in Data Science",
      institution: "Tech University",
      period: "2018 - 2019",
      description: "Specialized in machine learning and statistical analysis with distinction."
    },
    {
      degree: "BSc in Computer Science",
      institution: "State University",
      period: "2014 - 2018",
      description: "Graduated with honors, specialization in computational methods and algorithms."
    }
  ];
  
  const certifications = [
    {
      name: "TensorFlow Developer Certification",
      issuer: "Google",
      year: "2021"
    },
    {
      name: "Advanced Machine Learning",
      issuer: "Stanford Online",
      year: "2020"
    },
    {
      name: "Deep Learning Specialization",
      issuer: "Coursera",
      year: "2019"
    }
  ];
  
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pb-24 bg-secondary/20 dark:bg-secondary/10">
          <div className="container-content">
            <div className="max-w-3xl">
              <h1 className="heading-xl mb-4">About Me</h1>
              <p className="text-xl text-muted-foreground">
                Data scientist passionate about turning raw information into actionable insights.
              </p>
            </div>
          </div>
        </section>
        
        {/* Profile Section */}
        <section className="section">
          <div className="container-content">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <div className="sticky top-24">
                  <div className="relative w-full h-auto rounded-lg overflow-hidden mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Swetah Kothapalli"
                      className="w-full object-cover"
                    />
                  </div>
                  <h2 className="font-display text-2xl font-bold mb-2">Swetah Kothapalli</h2>
                  <p className="text-lg text-primary font-medium mb-4">Data Scientist & Python Developer</p>
                  
                  <div className="space-y-4">
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      <a href="mailto:hello@swetah.com" className="text-muted-foreground hover:text-primary">
                        hello@swetah.com
                      </a>
                    </p>
                    <p>
                      <span className="font-medium">Location:</span>{" "}
                      <span className="text-muted-foreground">San Francisco, CA</span>
                    </p>
                    <div className="pt-4">
                      <Button asChild>
                        <a href="/files/resume.pdf" download>
                          Download Resume
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3 space-y-12">
                <div className="space-y-6">
                  <h2 className="heading-lg border-b border-border pb-4">About Me</h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p>
                      Hello! I'm Swetah Kothapalli, a data scientist with 4+ years of experience applying Python to solve complex data challenges.
                      I specialize in developing machine learning models and data analysis solutions that help organizations make better decisions.
                    </p>
                    <p>
                      My approach combines technical expertise with business acumen, allowing me to translate raw data into strategic insights.
                      I enjoy working on projects that involve predictive modeling, computer vision, and natural language processing.
                    </p>
                    <p>
                      When I'm not working with data, you can find me contributing to open-source projects, writing technical blogs, and participating in data science hackathons.
                      I'm passionate about mentoring aspiring data scientists and sharing knowledge with the community.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h2 className="heading-lg border-b border-border pb-4">Experience</h2>
                  <div className="space-y-8">
                    {experience.map((item, index) => (
                      <div key={index} className="relative pl-8 pb-8 border-l border-border">
                        <div className="absolute w-4 h-4 bg-primary rounded-full -left-2 top-1"></div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                          <span className="inline-flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {item.period}
                          </span>
                        </div>
                        <p className="font-medium text-primary mb-2">{item.company}</p>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h2 className="heading-lg border-b border-border pb-4">Education</h2>
                  <div className="space-y-8">
                    {education.map((item, index) => (
                      <div key={index} className="relative pl-8 pb-8 border-l border-border">
                        <div className="absolute w-4 h-4 bg-primary rounded-full -left-2 top-1"></div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="font-display text-xl font-semibold">{item.degree}</h3>
                          <span className="inline-flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {item.period}
                          </span>
                        </div>
                        <p className="font-medium text-primary mb-2">{item.institution}</p>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h2 className="heading-lg border-b border-border pb-4">Certifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certifications.map((cert, index) => (
                      <div key={index} className="bg-secondary/30 p-6 rounded-lg">
                        <Award className="h-8 w-8 text-primary mb-3" />
                        <h3 className="font-display text-lg font-semibold mb-1">{cert.name}</h3>
                        <p className="text-muted-foreground mb-2">{cert.issuer}</p>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{cert.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <SkillsSection />
        
        <section className="section bg-secondary/20 dark:bg-secondary/10">
          <div className="container-content text-center">
            <h2 className="heading-lg mb-6">Want to see my work?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Check out my portfolio to see examples of projects I've worked on and the results I've achieved.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/projects">
                  View My Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">
                  Get In Touch
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
