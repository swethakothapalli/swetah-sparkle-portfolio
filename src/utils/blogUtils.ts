
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
    // Fetch the list of blog files from the JSON file
    const response = await fetch('/api/blog-files.json');
    
    if (!response.ok) {
      console.error('Failed to fetch blog files list');
      // Fallback to static list if fetch fails
      const fallbackFiles = [
        "beyond-basic-eda.md",
        "ml-models-fail-lessons.md",
        "optimizing-python-data.md"
      ];
      
      const postsPromises = fallbackFiles.map(async (fileName) => {
        const post = await getPostBySlug(fileName.replace('.md', ''));
        return post;
      });
      
      const posts = await Promise.all(postsPromises);
      
      return posts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    }
    
    // Parse the JSON response
    const fileNames = await response.json();
    
    // Process each file to extract metadata and content
    const postsPromises = fileNames.map(async (fileName: string) => {
      const post = await getPostBySlug(fileName.replace('.md', ''));
      return post;
    });
    
    // Wait for all posts to be processed
    const posts = await Promise.all(postsPromises);
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    
    // Fallback if any error occurs
    try {
      // Use a static array of blog files instead of fetching from API
      const fileNames = [
        "beyond-basic-eda.md",
        "ml-models-fail-lessons.md",
        "optimizing-python-data.md"
      ];
      
      // Process each file to extract metadata and content
      const postsPromises = fileNames.map(async (fileName) => {
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
      
      // Sort posts by date (newest first)
      return posts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    } catch (fallbackError) {
      console.error('Failed to load fallback blog posts:', fallbackError);
      return [];
    }
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  try {
    // Fetch the content of the specific markdown file
    const response = await fetch(`/BlogArticles/${slug}.md`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog post: ${slug}`);
    }
    
    const markdown = await response.text();
    
    // Parse the markdown file with gray-matter to separate frontmatter from content
    const { data, content } = matter(markdown);
    
    // Parse the date string into a Date object
    const date = new Date(data.date);
    
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
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    throw error;
  }
}
