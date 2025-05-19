
import matter from 'gray-matter';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  content?: string;
  date?: Date;
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    // Use a static array of project files
    const fileNames = [
      "customer-segmentation.md",
      "sales-forecasting.md", 
      "nlp-customer-support.md",
      "anomaly-detection.md"
    ];
    
    // Process each file to extract metadata and content
    const projectsPromises = fileNames.map(async (fileName) => {
      const project = await getProjectBySlug(fileName.replace('.md', ''));
      return project;
    });
    
    // Wait for all projects to be processed
    const projects = await Promise.all(projectsPromises);
    
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    // Return fallback projects if there's an error
    return [
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
  }
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  try {
    // Fetch the content of the specific markdown file
    const response = await fetch(`/Projects/${slug}.md`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${slug}`);
    }
    
    const markdown = await response.text();
    
    // Parse the markdown file with gray-matter to separate frontmatter from content
    const { data, content } = matter(markdown);
    
    // Return the project with all needed properties
    return {
      id: slug,
      title: data.title || '',
      description: data.description || '',
      tags: data.tags || [],
      image: data.image || '',
      link: `/projects/${slug}`,
      content: content || '',
      date: data.date ? new Date(data.date) : undefined
    };
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    throw error;
  }
}
