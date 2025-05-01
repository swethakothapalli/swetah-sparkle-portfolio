
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
