
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Project } from "@/components/ProjectCard";

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
  },
  {
    id: "5",
    title: "Recommender System for E-commerce",
    description: "Built a collaborative filtering-based recommendation engine that improved click-through rates by 22% and increased average order value.",
    tags: ["Recommender Systems", "Collaborative Filtering", "Python", "AWS"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/projects/recommender-system"
  },
  {
    id: "6",
    title: "Computer Vision for Quality Control",
    description: "Developed a CV system to detect manufacturing defects with 98% accuracy, reducing manual inspection time by 75%.",
    tags: ["Computer Vision", "OpenCV", "CNNs", "PyTorch"],
    image: "https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/projects/computer-vision-qc"
  },
  {
    id: "7",
    title: "Fraud Detection System",
    description: "Implemented an ensemble learning approach for detecting fraudulent transactions with high precision and recall rates.",
    tags: ["Machine Learning", "Ensemble Methods", "Fraud Detection"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/projects/fraud-detection"
  },
  {
    id: "8",
    title: "Churn Prediction Model",
    description: "Created a predictive model to identify customers at risk of churning, allowing for proactive retention strategies.",
    tags: ["Predictive Modeling", "XGBoost", "Feature Engineering"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/projects/churn-prediction"
  },
];

// Extended project details with more content
const extendedProjects = {
  "customer-segmentation": {
    fullTitle: "Customer Segmentation Analysis",
    summary: "A comprehensive customer segmentation project that identified key customer groups for targeted marketing campaigns.",
    challenge: "The client, a retail company with over 1 million customers, was struggling with declining campaign effectiveness and customer engagement. Traditional demographic-based targeting was proving insufficient.",
    approach: "I implemented an unsupervised learning approach using K-means clustering and hierarchical clustering algorithms. The analysis incorporated transaction history, browsing behavior, and customer service interactions to create comprehensive customer profiles.",
    methodology: [
      "Data cleaning and preprocessing of multiple data sources",
      "Feature engineering to create meaningful customer metrics",
      "Dimensionality reduction using PCA to identify key factors",
      "K-means clustering optimized with silhouette analysis",
      "Cluster validation and profiling for business insights"
    ],
    results: "The analysis revealed 5 distinct customer segments with unique purchasing patterns. By tailoring marketing strategies to each segment, the client achieved a 30% increase in campaign ROI and a 25% improvement in customer retention within high-value segments.",
    tools: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Seaborn", "Jupyter Notebooks"],
    implementation: "I delivered an interactive dashboard that allowed marketing teams to explore cluster profiles and customize audience selection for campaigns. The solution included automated customer classification for new customers."
  },
  "sales-forecasting": {
    fullTitle: "Predictive Sales Forecasting",
    summary: "A time-series forecasting solution that predicts monthly sales trends with high accuracy, enabling better inventory and staffing decisions.",
    challenge: "The retail client was experiencing frequent inventory issues - overstocking in some product categories while facing stockouts in others. This led to lost sales opportunities and increased holding costs.",
    approach: "I developed a forecasting system that combined classical time-series methods with machine learning approaches to account for seasonality, trends, and external factors like promotions and market conditions.",
    methodology: [
      "Time-series decomposition to analyze seasonal and trend components",
      "Feature engineering incorporating calendar effects and promotional events",
      "Model comparison between ARIMA, ETS, Prophet, and ensemble methods",
      "Hyperparameter optimization for selected models",
      "Cross-validation using time-series specific techniques"
    ],
    results: "The final model achieved 92% accuracy in forecasting monthly sales, with particular strength in predicting seasonal peaks. Implementation led to a 15% reduction in inventory costs and a 7% decrease in stockout events.",
    tools: ["Python", "Prophet", "Statsmodels", "Scikit-learn", "Pandas", "AWS SageMaker"],
    implementation: "The solution was deployed as an automated pipeline that generates weekly forecasts and integrates with the client's inventory management system. Interactive visualizations allow business users to explore forecasts and adjust parameters."
  },
  "nlp-customer-support": {
    fullTitle: "NLP for Customer Support",
    summary: "A natural language processing system that automatically categorizes and prioritizes customer support tickets based on content and sentiment analysis.",
    challenge: "The client's customer support team was overwhelmed by high ticket volume, leading to slow response times and customer dissatisfaction. Manual categorization was inconsistent and time-consuming.",
    approach: "I built an NLP pipeline that analyzes incoming customer messages, extracts key information, detects sentiment, and routes tickets to appropriate departments with priority flags.",
    methodology: [
      "Text preprocessing and normalization specific to customer support language",
      "Fine-tuning BERT models for domain-specific classification",
      "Sentiment analysis using transformer-based models",
      "Named entity recognition to extract product references and issue types",
      "Evaluation framework to assess classification accuracy and business impact"
    ],
    results: "The system reduced average response time by 40% by ensuring tickets were routed to the right teams immediately. Accuracy in categorization reached 89%, and critical issues were identified with 94% precision.",
    tools: ["Python", "BERT", "TensorFlow", "Hugging Face Transformers", "spaCy", "Docker"],
    implementation: "The solution was deployed as a microservice that integrates with the client's ticketing system. An admin dashboard provides insights into common issues and sentiment trends."
  },
  "anomaly-detection": {
    fullTitle: "Real-time Anomaly Detection",
    summary: "A streaming analytics system that monitors IoT sensor data to detect anomalies and prevent equipment failures in manufacturing environments.",
    challenge: "The manufacturing client was experiencing unexpected equipment failures resulting in costly production downtime. Traditional threshold-based monitoring was missing subtle indicators of impending problems.",
    approach: "I designed a real-time anomaly detection system that processes streaming sensor data, builds dynamic baseline models, and alerts maintenance teams to potential issues before failures occur.",
    methodology: [
      "Signal processing techniques to clean and normalize sensor data",
      "Feature extraction from time-series data streams",
      "Multivariate anomaly detection using isolation forests and autoencoders",
      "Online learning components to adapt to changing equipment conditions",
      "Alert management system with prioritization logic"
    ],
    results: "The system achieved 85% accuracy in predicting equipment failures 24-48 hours before occurrence. This enabled preventative maintenance that reduced unplanned downtime by 32% and extended equipment lifespan.",
    tools: ["Python", "Kafka", "Spark Streaming", "TensorFlow", "Scikit-learn", "Docker"],
    implementation: "The solution runs on edge computing devices connected to equipment sensors, with a centralized dashboard for monitoring anomaly alerts across multiple production lines."
  },
  "recommender-system": {
    fullTitle: "Recommender System for E-commerce", 
    summary: "A hybrid recommendation engine that combines collaborative filtering and content-based approaches to personalize product recommendations for online shoppers.",
    challenge: "The e-commerce client was struggling with low cross-selling rates and decreasing average order value despite having a large product catalog. Generic recommendations were not effectively engaging customers.",
    approach: "I developed a hybrid recommendation system that analyzes user behavior, purchase history, and product attributes to generate personalized recommendations at multiple touchpoints in the customer journey.",
    methodology: [
      "Collaborative filtering using matrix factorization techniques",
      "Content-based filtering using natural language processing on product descriptions",
      "Feature engineering to capture temporal browsing patterns",
      "A/B testing framework to evaluate recommendation performance",
      "Cold-start strategies for new users and products"
    ],
    results: "The recommendation engine improved click-through rates by 22% and increased average order value by 15%. Customer engagement metrics showed a 30% increase in product page views from recommendations.",
    tools: ["Python", "AWS Personalize", "PyTorch", "Redis", "FastAPI", "Docker"],
    implementation: "The system was deployed as a real-time API service that integrates with the client's website and email marketing platform, delivering consistent recommendations across channels."
  },
  "computer-vision-qc": {
    fullTitle: "Computer Vision for Quality Control",
    summary: "An automated visual inspection system using computer vision to detect manufacturing defects in production lines with high accuracy and speed.",
    challenge: "The manufacturing client relied on manual visual inspection, which was labor-intensive, inconsistent, and unable to keep pace with production speeds. This resulted in quality issues reaching customers.",
    approach: "I built a computer vision system using convolutional neural networks to automatically detect and classify manufacturing defects from camera feeds on the production line.",
    methodology: [
      "Custom data collection and annotation of product defect images",
      "Data augmentation to expand limited defect examples",
      "CNN architecture selection and modification for specific defect types",
      "Transfer learning to leverage pre-trained vision models",
      "Optimization for edge deployment with limited computing resources"
    ],
    results: "The system achieved 98% accuracy in defect detection, reducing manual inspection time by 75% and decreasing defective products reaching customers by 90%. The solution processes items at twice the speed of human inspection.",
    tools: ["Python", "OpenCV", "PyTorch", "TensorFlow", "NVIDIA Jetson", "Docker"],
    implementation: "The solution was deployed directly on the production line with camera integration and a touchscreen interface for quality control staff to review flagged items and manage system settings."
  },
  "fraud-detection": {
    fullTitle: "Fraud Detection System",
    summary: "A machine learning system that identifies potentially fraudulent financial transactions in real-time, balancing fraud prevention with minimal false positives.",
    challenge: "The financial services client was experiencing increasing fraud losses while legitimate transactions were sometimes incorrectly flagged, causing customer friction and operational costs.",
    approach: "I developed an ensemble-based fraud detection system that analyzes transaction patterns, account behavior, and contextual signals to score the risk of each transaction.",
    methodology: [
      "Feature engineering to capture temporal patterns and anomalies",
      "Handling extreme class imbalance with advanced sampling techniques",
      "Ensemble model combining gradient boosting, random forests, and neural networks",
      "Cost-sensitive learning to optimize for business impact, not just accuracy",
      "Explainable AI techniques to provide reasoning for fraud flags"
    ],
    results: "The system achieved 92% recall in detecting fraudulent transactions while reducing false positives by 60% compared to the previous rule-based system. This resulted in $2.5M estimated annual fraud savings.",
    tools: ["Python", "XGBoost", "Scikit-learn", "TensorFlow", "SHAP", "Kafka"],
    implementation: "The solution was deployed as a real-time decision service integrated with the transaction processing system, with a separate investigation interface for the fraud team."
  },
  "churn-prediction": {
    fullTitle: "Churn Prediction Model",
    summary: "A predictive analytics solution that identifies customers at risk of churning, enabling proactive retention strategies and personalized interventions.",
    challenge: "The subscription-based client was experiencing high customer churn rates, with retention efforts applied too late in the customer lifecycle or targeted to the wrong customers.",
    approach: "I created an early-warning system that analyzes customer behavior, engagement metrics, and support interactions to predict likely churners weeks before they would typically cancel.",
    methodology: [
      "Longitudinal feature engineering to capture changing engagement patterns",
      "Survival analysis to understand churn timing and risk factors",
      "Model comparison across logistic regression, random forests, and gradient boosting",
      "Feature importance analysis to identify key churn indicators",
      "Calibration to ensure predicted probabilities reflect actual risk"
    ],
    results: "The model identifies 80% of churners with a 4-week advance notice. Targeted retention campaigns based on model predictions improved customer retention by 20% and showed a 3x ROI on retention spending.",
    tools: ["Python", "XGBoost", "Scikit-learn", "Pandas", "Matplotlib", "SQL"],
    implementation: "The solution includes a weekly batch scoring process integrated with the CRM system and a dashboard allowing customer success teams to monitor churn risk and track intervention effectiveness."
  }
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (projectId && extendedProjects[projectId as keyof typeof extendedProjects]) {
      setProjectDetails(extendedProjects[projectId as keyof typeof extendedProjects]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [projectId]);
  
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="animate-pulse">Loading project details...</div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!projectDetails) {
    return (
      <>
        <Navbar />
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="heading-xl mb-4">Project Not Found</h1>
            <p className="text-xl text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been moved.
            </p>
            <div className="space-x-4">
              <Button asChild>
                <Link to="/projects">Browse All Projects</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  // Find the original project to get the image
  const originalProject = projects.find(p => p.link.includes(projectId || ''));
  
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section with project image */}
        <section className="pt-32 pb-16 md:pb-24 bg-secondary/20 dark:bg-secondary/10">
          <div className="container-content">
            <div className="max-w-4xl mx-auto">
              <h1 className="heading-xl mb-4">{projectDetails.fullTitle}</h1>
              <p className="text-xl text-muted-foreground">
                {projectDetails.summary}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {projectDetails.tools.map((tool: string) => (
                  <Badge key={tool} variant="secondary" className="font-normal">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Project Image */}
        <section className="py-12">
          <div className="container-content">
            <div className="max-w-4xl mx-auto overflow-hidden rounded-lg shadow-md">
              <img 
                src={originalProject?.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"} 
                alt={projectDetails.fullTitle}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
        
        {/* Project Content */}
        <section className="section pb-24">
          <div className="container-content">
            <div className="max-w-4xl mx-auto grid gap-12">
              <div>
                <h2 className="heading-md mb-4">The Challenge</h2>
                <p className="text-muted-foreground">{projectDetails.challenge}</p>
              </div>
              
              <div>
                <h2 className="heading-md mb-4">My Approach</h2>
                <p className="text-muted-foreground">{projectDetails.approach}</p>
              </div>
              
              <div>
                <h2 className="heading-md mb-4">Methodology</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {projectDetails.methodology.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="heading-md mb-4">Results & Impact</h2>
                <p className="text-muted-foreground">{projectDetails.results}</p>
              </div>
              
              <div>
                <h2 className="heading-md mb-4">Implementation</h2>
                <p className="text-muted-foreground">{projectDetails.implementation}</p>
              </div>
              
              <div className="text-center pt-8">
                <Button asChild size="lg">
                  <Link to="/projects">
                    View More Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetail;
