
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
