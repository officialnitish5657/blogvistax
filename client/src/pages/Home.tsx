import { useQuery } from "@tanstack/react-query";
import BlogCard from "@/components/blog/BlogCard";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";
import type { Blog } from "@shared/schema";

export default function Home() {
  const { data: blogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs", { published: true }],
  });

  const latestBlogs = blogs?.slice(0, 3) || [];

  const scrollToBlogs = () => {
    const blogsSection = document.getElementById("latest-blogs");
    blogsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight" data-testid="hero-headline">
                Insights That <span className="text-accent">Transform</span> Your Business
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed" data-testid="hero-description">
                Discover cutting-edge strategies, industry insights, and practical advice from leading experts in technology, business, and innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToBlogs}
                  className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg"
                  data-testid="hero-explore-articles"
                >
                  Explore Articles
                </button>
                <Link
                  href="/about"
                  className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 text-center"
                  data-testid="hero-learn-more"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Modern workspace with analytics dashboards"
                className="rounded-xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section id="latest-blogs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4" data-testid="latest-blogs-title">
              Latest Insights
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto" data-testid="latest-blogs-subtitle">
              Stay ahead of the curve with our latest articles on technology trends, business strategies, and industry innovations.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" data-testid="loading-spinner" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="latest-blogs-grid">
              {latestBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}

          {!isLoading && latestBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600" data-testid="no-blogs-message">
                No blog posts available at the moment.
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
              data-testid="view-all-articles"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
