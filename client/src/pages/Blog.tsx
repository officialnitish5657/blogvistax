import { useQuery } from "@tanstack/react-query";
import BlogCard from "@/components/blog/BlogCard";
import { Loader2 } from "lucide-react";
import type { Blog } from "@shared/schema";

export default function Blog() {
  const { data: blogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs?published=true"],
  });

  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4" data-testid="blog-page-title">
            Our Blog
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto" data-testid="blog-page-subtitle">
            Insights, strategies, and thought leadership from industry experts
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" data-testid="loading-spinner" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="blog-grid">
            {blogs?.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

        {!isLoading && (!blogs || blogs.length === 0) && (
          <div className="text-center py-12">
            <p className="text-slate-600" data-testid="no-blogs-message">
              No blog posts available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
