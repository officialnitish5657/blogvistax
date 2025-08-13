import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, Tag, User, Loader2 } from "lucide-react";
import type { Blog } from "@shared/schema";
import { useEffect } from "react";
import { updatePageSEO, generateStructuredData } from "@/utils/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: blog, isLoading, error } = useQuery<Blog>({
    queryKey: [`/api/blogs/${id}`],
    enabled: !!id,
  });

  // Update SEO when blog data is loaded
  useEffect(() => {
    if (blog) {
      const blogUrl = `${window.location.origin}/blog/${blog.id}`;
      
      // Generate rich keywords from content
      const contentKeywords = blog.content
        .toLowerCase()
        .match(/\b\w+\b/g)
        ?.filter(word => word.length > 4)
        .slice(0, 10)
        .join(', ') || '';
      
      const keywords = `${blog.category.toLowerCase()}, ${blog.title.toLowerCase()}, ${contentKeywords}, technology blog, expert insights`;

      updatePageSEO({
        title: `${blog.title} | TechBlog`,
        description: blog.excerpt,
        keywords: keywords,
        type: 'article',
        author: 'TechBlog Team',
        publishedDate: blog.createdAt ? new Date(blog.createdAt).toISOString() : undefined,
        modifiedDate: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined,
        category: blog.category,
        image: blog.imageUrl || undefined,
        url: blogUrl
      });

      // Generate structured data for the blog post
      generateStructuredData('BlogPosting', {
        title: blog.title,
        excerpt: blog.excerpt,
        imageUrl: blog.imageUrl,
        createdAt: blog.createdAt ? new Date(blog.createdAt).toISOString() : undefined,
        updatedAt: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined,
        category: blog.category,
        keywords: keywords
      });
    }
  }, [blog]);

  const formatDate = (date: Date | null) => {
    if (!date) return "No date";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "strategy":
        return "bg-primary/10 text-primary";
      case "technology":
        return "bg-accent/10 text-accent";
      case "leadership":
        return "bg-emerald-100 text-emerald-700";
      case "innovation":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 bg-white min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" data-testid="loading-spinner" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="py-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4" data-testid="error-title">
            Blog Post Not Found
          </h1>
          <p className="text-slate-600 mb-8" data-testid="error-message">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            data-testid="back-to-blog"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="py-12 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/blog"
          className="text-primary hover:text-blue-700 font-medium mb-8 flex items-center transition-colors duration-200"
          data-testid="back-button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article header */}
        <header className="mb-12">
          <div className="flex items-center mb-4">
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1 ${getCategoryColor(blog.category)}`}
              data-testid="blog-category"
            >
              <Tag className="h-3 w-3" />
              {blog.category}
            </span>
            <span className="text-slate-500 text-sm ml-4 flex items-center gap-1" data-testid="blog-date">
              <Calendar className="h-3 w-3" />
              {formatDate(blog.createdAt)}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6" data-testid="blog-title">
            {blog.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed" data-testid="blog-excerpt">
            {blog.excerpt}
          </p>
        </header>

        {/* Featured image */}
        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg mb-12"
            data-testid="blog-image"
            loading="lazy"
          />
        )}

        {/* Article content */}
        <div className="prose prose-lg prose-slate max-w-none" data-testid="blog-content">
          {blog.content.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-2xl font-bold text-slate-900 mt-12 mb-6">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            } else if (paragraph.startsWith('- ')) {
              return (
                <li key={index} className="text-slate-700 mb-2">
                  {paragraph.replace('- ', '')}
                </li>
              );
            } else if (paragraph.trim()) {
              return (
                <p key={index} className="text-slate-700 leading-relaxed mb-6">
                  {paragraph}
                </p>
              );
            }
            return null;
          })}
        </div>

        {/* Author info */}
        <div className="border-t border-slate-200 pt-8 mt-12">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
              <User className="text-slate-500 h-8 w-8" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900" data-testid="author-name">
                TechBlog Editorial Team
              </h4>
              <p className="text-slate-600" data-testid="author-title">
                Industry Experts & Thought Leaders
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
