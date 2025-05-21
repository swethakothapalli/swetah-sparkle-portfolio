
import { BlogPost } from "./blogTypes";

// Function to create static blog posts when markdown processing fails
export function getStaticBlogPosts(): BlogPost[] {
  console.log("Using static blog posts as fallback");
  
  const currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  const lastWeek = new Date(currentDate);
  lastWeek.setDate(currentDate.getDate() - 7);
  
  // Create hardcoded blog posts to ensure content is displayed
  const staticPosts: BlogPost[] = [
    {
      id: 'beyond-basic-eda',
      slug: 'beyond-basic-eda',
      title: 'Beyond Basic EDA: Advanced Techniques for Data Scientists',
      excerpt: 'Move past simple exploratory data analysis with these advanced techniques that can uncover hidden patterns in your data.',
      date: currentDate,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      category: 'Data Science',
      tags: ['Data Analysis', 'Statistics', 'Visualization'],
      readTime: '8 min read',
      content: '# Beyond Basic EDA\n\nExploratory Data Analysis (EDA) is often the first step in any data science project...'
    },
    {
      id: 'ml-models-fail-lessons',
      slug: 'ml-models-fail-lessons',
      title: 'Why ML Models Fail in Production: Lessons from the Field',
      excerpt: 'Discover the common pitfalls that cause machine learning models to fail when deployed to production environments and how to avoid them.',
      date: yesterday,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      category: 'Machine Learning',
      tags: ['MLOps', 'Production', 'Deployment'],
      readTime: '10 min read',
      content: '# Why ML Models Fail in Production\n\nMachine learning models that perform brilliantly in development often fail when deployed to production...'
    },
    {
      id: 'optimizing-python-data',
      slug: 'optimizing-python-data',
      title: 'Optimizing Python Data Pipelines for Better Performance',
      excerpt: 'Learn practical techniques to speed up your Python data processing pipelines and handle larger datasets more efficiently.',
      date: lastWeek,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      category: 'Data Engineering',
      tags: ['Python', 'Performance', 'Big Data'],
      readTime: '12 min read',
      content: '# Optimizing Python Data Pipelines\n\nData scientists and engineers frequently work with datasets that push the limits of their hardware...'
    }
  ];
  
  return staticPosts;
}
