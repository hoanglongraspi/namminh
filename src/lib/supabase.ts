import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wcuebhfcywnwrcwtladu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjdWViaGZjeXdud3Jjd3RsYWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NzY4ODUsImV4cCI6MjA2NTQ1Mjg4NX0.4GUBD0AYvJB_whvFK7mUe809gVeT0U-D6B2W65kA3fQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  features: any[];
  specifications: Record<string, any>;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  featured_image: string | null;
  category: string | null;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  view_count: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface AdminUser {
  id: string;
  username: string;
  created_at: string;
  updated_at: string;
} 