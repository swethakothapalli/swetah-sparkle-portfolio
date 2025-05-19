
// We're removing the matter import since it relies on Node.js Buffer
// import matter from 'gray-matter';

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
      try {
        const project = await getProjectBySlug(fileName.replace('.md', ''));
        return project;
      } catch (error) {
        console.error(`Error processing ${fileName}:`, error);
        // Return a basic fallback project
        return createFallbackProject(fileName.replace('.md', ''));
      }
    });
    
    // Wait for all projects to be processed
    const projects = await Promise.all(projectsPromises);
    
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    // Return fallback projects if there's an error
    return getFallbackProjects();
  }
}

// Function to create a fallback project when loading fails
function createFallbackProject(slug: string): Project {
  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return {
    id: slug,
    title: title,
    description: "Project details currently unavailable.",
    tags: ["Project"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    link: `/projects/${slug}`
  };
}

// Function to get predefined fallback projects
function getFallbackProjects(): Project[] {
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

export async function getProjectBySlug(slug: string): Promise<Project> {
  try {
    // Fetch the content of the specific markdown file
    const response = await fetch(`/Projects/${slug}.md`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${slug}`);
    }
    
    const markdown = await response.text();
    
    // Parse the markdown file with our own frontmatter parser (not using matter)
    const { data, content } = parseFrontMatter(markdown);
    
    // Return the project with all needed properties
    return {
      id: slug,
      title: data.title || slug,
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

// Custom frontmatter parser that doesn't rely on Buffer
function parseFrontMatter(markdown: string) {
  // Look for frontmatter section
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
  const match = frontmatterRegex.exec(markdown);
  
  if (!match) {
    console.warn("No frontmatter found in project markdown");
    return { data: {}, content: markdown };
  }
  
  const frontMatter = match[1];
  const content = markdown.replace(frontmatterRegex, '');
  
  // Parse the YAML-like frontmatter
  const data: Record<string, any> = {};
  const lines = frontMatter.split('\n');
  
  for (const line of lines) {
    if (line.trim() === '') continue;
    
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Handle quoted strings
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      
      // Handle arrays (simple implementation)
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          const arrayStr = value.replace(/'/g, '"'); // Replace single quotes with double quotes
          data[key] = JSON.parse(arrayStr);
        } catch (e) {
          console.warn(`Failed to parse array value for key ${key}:`, value);
          data[key] = [];
        }
      } else {
        data[key] = value;
      }
    }
  }
  
  return { data, content };
}
