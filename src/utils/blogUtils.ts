
import { BlogPost } from "./blogTypes";
import { ensureValidDate } from "./dateUtils";
import { parseFrontMatter } from "./markdownUtils";
import { getStaticBlogPosts } from "./blogStaticData";

// Use export type for re-exporting types when isolatedModules is enabled
export type { BlogPost } from "./blogTypes";

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
      // Parse the markdown file with our enhanced frontmatter parser
      const { data, content } = parseFrontMatter(markdown);
      
      // Parse the date string into a Date object with validation
      const parsedDate = data.date ? new Date(data.date) : new Date();
      const date = ensureValidDate(parsedDate);
      
      // Process the content to remove any remaining frontmatter markers
      const cleanContent = content.trim();
      
      // Return the post with all needed properties
      return {
        id: slug,
        title: data.title || slug,
        excerpt: data.excerpt || '',
        content: cleanContent, // Use the cleaned content
        date: date,
        image: data.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
        category: data.category || 'Uncategorized',
        tags: data.tags || [],
        slug: slug,
        readTime: data.readTime || '5 min read'
      };
    } catch (parseError) {
      console.error(`Error parsing frontmatter for ${slug}:`, parseError);
      // Return a basic post object even if parsing fails
      return {
        id: slug,
        title: slug,
        excerpt: 'Content preview unavailable',
        content: markdown.replace(/^---[\s\S]*?---/, '').trim(), // Remove frontmatter from raw markdown
        date: new Date(),
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
        category: 'Uncategorized',
        tags: [],
        slug: slug,
        readTime: '5 min read'
      };
    }
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    throw error;
  }
}
