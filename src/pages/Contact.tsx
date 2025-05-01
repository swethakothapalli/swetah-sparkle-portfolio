
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const Contact = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pb-24 bg-secondary/20 dark:bg-secondary/10">
          <div className="container-content">
            <div className="max-w-3xl">
              <h1 className="heading-xl mb-4">Contact Me</h1>
              <p className="text-xl text-muted-foreground">
                Have a question or want to work together? I'd love to hear from you!
              </p>
            </div>
          </div>
        </section>
        
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Contact;
