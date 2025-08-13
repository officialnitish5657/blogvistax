# TechBlog Application

## Overview

TechBlog is a full-stack blog application built with React and Express.js. The application follows a modern, component-based architecture that allows users to view, create, and manage blog posts. It features a responsive design using shadcn/ui components, a REST API backend, and is designed to support both public content consumption and administrative content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built with React and uses a file-based routing system through Wouter. The UI is constructed using shadcn/ui components built on top of Radix UI primitives, providing accessible and customizable interface elements. The styling is handled through Tailwind CSS with a comprehensive design system that includes custom CSS variables for theming.

**State Management**: React Query (TanStack Query) is used for server state management, providing caching, synchronization, and background updates. Local component state is managed with React's built-in useState and useContext hooks.

**Component Structure**: The application follows a modular component architecture with clear separation between layout components (Navbar, Footer), page components (Home, Blog, Admin), and reusable UI components. Components are organized in a hierarchical structure with shared components in the `/components` directory.

### Backend Architecture
The server is built using Express.js with TypeScript, following a RESTful API design pattern. The application uses a storage abstraction layer (`IStorage` interface) that currently implements an in-memory storage solution (`MemStorage`) but is designed to easily switch to database-backed storage.

**API Design**: REST endpoints follow conventional patterns with proper HTTP methods and status codes. The API includes comprehensive error handling and validation using Zod schemas. Request/response logging middleware provides visibility into API usage.

**Development Setup**: The application uses Vite for development with hot module replacement and includes middleware for serving the React application in production builds.

### Data Storage Solutions
The application uses an abstract storage interface that supports both users and blog management. Currently implemented with in-memory storage but includes database schema definitions using Drizzle ORM for PostgreSQL. The schema includes proper relationships, constraints, and type safety.

**Schema Design**: Blog posts include fields for title, content, excerpt, category, publication status, and timestamps. Users have basic authentication fields. The schema uses UUID primary keys and includes proper indexing considerations.

### Authentication and Authorization
The application includes user authentication infrastructure with session-based authentication using connect-pg-simple for session storage. While not fully implemented in the current codebase, the foundation is in place for user registration, login, and role-based access control.

## SEO Implementation

### Comprehensive SEO Strategy
The application now features a complete SEO implementation designed for maximum search engine visibility and social media sharing optimization.

**Page-Level SEO**: Every page (Home, Blog, About, Contact, Admin) includes custom meta tags, Open Graph properties, Twitter Cards, and canonical URLs. Each page has unique, descriptive titles and meta descriptions optimized for search engines.

**Blog Article SEO**: Individual blog posts feature advanced SEO with:
- Dynamic title generation with blog title and site name
- Rich meta descriptions using blog excerpts  
- Auto-generated keywords from content analysis
- Article-specific Open Graph and Twitter Card tags
- Author, publication date, and category metadata
- Canonical URLs for each blog post

**Structured Data**: JSON-LD structured data implementation for:
- WebSite schema for the main site with search functionality
- BlogPosting schema for individual articles with rich metadata
- Organization schema for publisher information
- Breadcrumb navigation support

**Technical SEO Features**:
- Robots.txt file with proper crawling guidelines
- XML sitemap foundation (ready for dynamic generation)
- Semantic HTML structure with proper heading hierarchy
- Image alt text and lazy loading implementation
- Mobile-responsive design for Core Web Vitals
- Fast loading times with optimized assets

### SEO Utilities
Custom SEO utility functions provide:
- Dynamic meta tag updates without page reload
- Structured data generation for different content types
- Keyword extraction from blog content
- Social media sharing optimization
- Search engine crawler guidance

## External Dependencies

### UI and Styling
- **Radix UI**: Provides accessible, unstyled component primitives for complex UI elements like dialogs, dropdowns, and form controls
- **Tailwind CSS**: Utility-first CSS framework for responsive design and consistent styling
- **shadcn/ui**: Pre-built component library that combines Radix UI with Tailwind CSS for a complete design system
- **Lucide React**: Icon library providing consistent iconography throughout the application

### Data Management
- **TanStack React Query**: Server state management library for data fetching, caching, and synchronization
- **Drizzle ORM**: Type-safe database ORM for PostgreSQL with schema definition and migration support
- **Zod**: Schema validation library for runtime type checking and form validation

### Development and Build Tools
- **Vite**: Build tool and development server with hot module replacement and optimized production builds
- **TypeScript**: Static type checking for improved developer experience and code reliability
- **Wouter**: Lightweight routing library for single-page application navigation

### Database and Session Management
- **Neon Database**: Serverless PostgreSQL database service for data persistence
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **Express Session**: Session middleware for user authentication state management

### Utilities and Helpers
- **clsx/class-variance-authority**: Utility libraries for conditional CSS class management
- **date-fns**: Date manipulation and formatting library
- **nanoid**: URL-safe unique ID generator for various application needs