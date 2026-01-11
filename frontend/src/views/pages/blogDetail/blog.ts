// types/blog.ts
export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  categories: string[];
  tags: string[];
  author: Author;
  publishedAt: Date;
  updatedAt?: Date;
  readTime: number;
  views: number;
  likes: number;
  commentsCount: number;
  isFeatured: boolean;
  isBookmarked?: boolean;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  content: string;
  createdAt: Date;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

export interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  readTime: number;
  publishedAt: Date;
  author: {
    name: string;
    avatar: string;
  };
}