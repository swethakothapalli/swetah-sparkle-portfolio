
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Resume = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Header Section */}
        <section className="pt-32 pb-16 md:pb-24 bg-secondary/20 dark:bg-secondary/10">
          <div className="container-content">
            <div className="max-w-3xl">
              <h1 className="heading-xl mb-4">Resume</h1>
              <p className="text-xl text-muted-foreground">
                My professional background and qualifications in data science and machine learning.
              </p>
              <div className="mt-6">
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Resume PDF
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Content */}
        <section className="section">
          <div className="container-content">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Experience */}
              <div>
                <h2 className="heading-md mb-6">Work Experience</h2>
                
                <div className="space-y-8">
                  <div className="border-l-4 border-primary pl-6 pb-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <h3 className="text-xl font-display font-semibold">Senior Data Scientist</h3>
                      <span className="text-sm text-muted-foreground mt-1 md:mt-0">2021 - Present</span>
                    </div>
                    <p className="text-muted-foreground mb-2">Tech Innovations Inc.</p>
                    <ul className="list-disc list-outside ml-5 space-y-1">
                      <li>Led a team of 5 data scientists in developing machine learning models for customer segmentation and predictive analytics</li>
                      <li>Implemented NLP solutions that improved customer support efficiency by 40%</li>
                      <li>Developed real-time anomaly detection systems for IoT device data</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-6 pb-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <h3 className="text-xl font-display font-semibold">Data Scientist</h3>
                      <span className="text-sm text-muted-foreground mt-1 md:mt-0">2019 - 2021</span>
                    </div>
                    <p className="text-muted-foreground mb-2">Data Analysis Corp.</p>
                    <ul className="list-disc list-outside ml-5 space-y-1">
                      <li>Built recommendation systems increasing average order value by 22%</li>
                      <li>Created time series forecasting models with 92% accuracy</li>
                      <li>Developed dashboards and analytics tools for business stakeholders</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-6 pb-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <h3 className="text-xl font-display font-semibold">Data Analyst</h3>
                      <span className="text-sm text-muted-foreground mt-1 md:mt-0">2017 - 2019</span>
                    </div>
                    <p className="text-muted-foreground mb-2">Global Analytics Partners</p>
                    <ul className="list-disc list-outside ml-5 space-y-1">
                      <li>Conducted exploratory data analysis on large datasets</li>
                      <li>Created reports and visualizations for management</li>
                      <li>Improved data collection methodologies and accuracy</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Education */}
              <div>
                <h2 className="heading-md mb-6">Education</h2>
                
                <div className="space-y-8">
                  <div className="border-l-4 border-primary pl-6 pb-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <h3 className="text-xl font-display font-semibold">M.S. in Data Science</h3>
                      <span className="text-sm text-muted-foreground mt-1 md:mt-0">2017</span>
                    </div>
                    <p className="text-muted-foreground mb-2">Stanford University</p>
                    <p>Thesis: "Deep Learning Applications in Natural Language Processing"</p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-6 pb-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <h3 className="text-xl font-display font-semibold">B.S. in Computer Science</h3>
                      <span className="text-sm text-muted-foreground mt-1 md:mt-0">2015</span>
                    </div>
                    <p className="text-muted-foreground mb-2">University of California, Berkeley</p>
                    <p>Minor in Statistics</p>
                  </div>
                </div>
              </div>
              
              {/* Skills */}
              <div>
                <h2 className="heading-md mb-6">Skills</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Technical Skills</h3>
                    <ul className="list-disc list-outside ml-5 space-y-1">
                      <li>Python (NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch)</li>
                      <li>SQL and NoSQL Databases</li>
                      <li>Big Data Technologies (Spark, Hadoop)</li>
                      <li>Data Visualization (Matplotlib, Seaborn, Plotly, Tableau)</li>
                      <li>Cloud Platforms (AWS, Google Cloud, Azure)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Machine Learning</h3>
                    <ul className="list-disc list-outside ml-5 space-y-1">
                      <li>Supervised Learning (Regression, Classification)</li>
                      <li>Unsupervised Learning (Clustering, Dimensionality Reduction)</li>
                      <li>Deep Learning (CNN, RNN, Transformers)</li>
                      <li>Natural Language Processing</li>
                      <li>Computer Vision</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Certifications */}
              <div>
                <h2 className="heading-md mb-6">Certifications</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">AWS Certified Machine Learning Specialty</h3>
                      <span className="text-sm text-muted-foreground">2022</span>
                    </div>
                    <p className="text-muted-foreground">Amazon Web Services</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">TensorFlow Developer Certificate</h3>
                      <span className="text-sm text-muted-foreground">2021</span>
                    </div>
                    <p className="text-muted-foreground">Google</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">Deep Learning Specialization</h3>
                      <span className="text-sm text-muted-foreground">2020</span>
                    </div>
                    <p className="text-muted-foreground">Coursera (deeplearning.ai)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Resume;
