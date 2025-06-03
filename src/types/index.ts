export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  author: string;
}