import { Link } from "wouter";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import type { Blog } from "@shared/schema";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "No date";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
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

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-200">
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1 ${getCategoryColor(blog.category)}`}
            data-testid={`blog-category-${blog.id}`}
          >
            <Tag className="h-3 w-3" />
            {blog.category}
          </span>
          <span className="text-slate-500 text-sm ml-auto flex items-center gap-1" data-testid={`blog-date-${blog.id}`}>
            <Calendar className="h-3 w-3" />
            {formatDate(blog.createdAt)}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 hover:text-primary transition-colors duration-200">
          <Link href={`/blog/${blog.id}`} data-testid={`blog-title-${blog.id}`}>
            {blog.title}
          </Link>
        </h3>
        <p className="text-slate-600 mb-4 line-clamp-3" data-testid={`blog-excerpt-${blog.id}`}>
          {blog.excerpt}
        </p>
        <Link
          href={`/blog/${blog.id}`}
          className="text-primary font-semibold hover:text-blue-700 transition-colors duration-200 flex items-center group"
          data-testid={`blog-read-more-${blog.id}`}
        >
          Read More 
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </article>
  );
}
