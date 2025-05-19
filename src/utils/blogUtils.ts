import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: Date;
  image: string;
  category: string;
  tags: string[];
  slug: string;
  readTime: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    console.log("Starting to fetch blog posts...");
    // Fetch the list of blog files from the JSON file
    const response = await fetch('/api/blog-files.json');
    
    if (!response.ok) {
      console.error('Failed to fetch blog files list');
      // Fallback to static list if fetch fails
      return getStaticBlogPosts();
    }
    
    // Parse the JSON response
    const fileNames = await response.json();
    console.log("Fetched blog file names:", fileNames);
    
    try {
      // Process each file to extract metadata and content
      const postsPromises = fileNames.map(async (fileName: string) => {
        try {
          const post = await getPostBySlug(fileName.replace('.md', ''));
          return post;
        } catch (err) {
          console.error(`Error processing ${fileName}:`, err);
          return null;
        }
      });
      
      // Wait for all posts to be processed and filter out nulls
      const posts = (await Promise.all(postsPromises)).filter(Boolean) as BlogPost[];
      
      if (posts.length === 0) {
        console.warn("No posts were successfully loaded, falling back to static posts");
        return getStaticBlogPosts();
      }
      
      // Sort posts by date (newest first)
      return posts.sort((a, b) => {
        // Ensure we have valid date objects
        const dateA = ensureValidDate(a.date);
        const dateB = ensureValidDate(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    } catch (innerError) {
      console.error('Error processing blog posts:', innerError);
      return getStaticBlogPosts();
    }
  } catch (error) {
    console.error('Error in main getAllPosts function:', error);
    return getStaticBlogPosts();
  }
}

// Helper function to ensure we have a valid date object
function ensureValidDate(date: any): Date {
  try {
    const dateObj = new Date(date);
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      console.warn("Invalid date encountered, using current date instead:", date);
      return new Date(); // Return current date as fallback
    }
    return dateObj;
  } catch (e) {
    console.error("Error parsing date:", e);
    return new Date(); // Return current date as fallback
  }
}

// Function to create static blog posts when markdown processing fails
function getStaticBlogPosts(): BlogPost[] {
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

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  try {
    console.log(`Fetching blog post for slug: ${slug}`);
    // Fetch the content of the specific markdown file
    const response = await fetch(`/BlogArticles/${slug}.md`);
    
    if (!response.ok) {
      console.error(`Failed to fetch blog post: ${slug}`, response.statusText);
      throw new Error(`Failed to fetch blog post: ${slug}`);
    }
    
    const markdown = await response.text();
    console.log(`Successfully fetched markdown for ${slug}, length: ${markdown.length} characters`);
    
    try {
      // Parse the markdown file with gray-matter to separate frontmatter from content
      const { data, content } = parseFrontMatter(markdown);
      
      // Parse the date string into a Date object with validation
      const parsedDate = data.date ? new Date(data.date) : new Date();
      const date = ensureValidDate(parsedDate);
      
      // Return the post with all needed properties
      return {
        id: slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        content: content || '',
        date: date,
        image: data.image || '',
        category: data.category || '',
        tags: data.tags || [],
        slug: slug,
        readTime: data.readTime || ''
      };
    } catch (parseError) {
      console.error(`Error parsing frontmatter for ${slug}:`, parseError);
      throw parseError;
    }
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    throw error;
  }
}

// Custom function to parse frontmatter without relying on Buffer
function parseFrontMatter(markdown: string) {
  // Simple regex-based frontmatter parser for browser environment
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
  const match = frontmatterRegex.exec(markdown);
  
  if (!match) {
    console.error("No frontmatter found in markdown");
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
