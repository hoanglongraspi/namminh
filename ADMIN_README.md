# Admin Dashboard Documentation

## Overview
The admin dashboard is a CMS (Content Management System) for managing products and news content on the Namminh landing page.

## Access
- URL: `/admin`
- Login URL: `/admin/login`

## Credentials
- Username: `namminhmed`
- Password: `namminhmed25@`

## Features

### Dashboard
- Overview of total products and news articles
- Quick statistics for active/published content
- Quick action buttons for creating new content

### Products Management
- **List Products**: View all products with their status, category, and display order
- **Add Product**: Create new products with:
  - Name and description
  - Category
  - Image URL
  - Features (dynamic list)
  - Specifications (key-value pairs)
  - Display order
  - Active/Inactive status
- **Edit Product**: Modify existing product information
- **Delete Product**: Remove products from the database
- **Toggle Status**: Quickly activate/deactivate products

### News Management
- **List Articles**: View all news articles with publication status and view count
- **Create Article**: Write new articles with:
  - Title and slug (auto-generated)
  - Content and excerpt
  - Featured image
  - Category and tags
  - Publication status
- **Edit Article**: Update existing articles
- **Delete Article**: Remove articles from the database
- **Publish/Unpublish**: Control article visibility

## Database Structure

### Products Table
- No price field (as requested)
- Features stored as JSON array
- Specifications stored as JSON object
- Display order for custom sorting

### News Table
- Full content management
- View tracking
- Tag system for categorization
- Publication date tracking

## Technical Details
- Built with React and TypeScript
- Connected to Supabase backend
- Responsive design for mobile and desktop
- Real-time data updates

## Security
- Protected routes requiring authentication
- Session-based authentication with localStorage
- Row Level Security (RLS) enabled on all tables 