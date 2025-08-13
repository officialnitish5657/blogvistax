import { Link } from "wouter";
import { Twitter, Linkedin, Github, Rss, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest insights in your inbox.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">TechBlog</h3>
            <p className="text-slate-300">
              Insights that transform your business. Stay ahead with cutting-edge strategies and industry expertise.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-300 hover:text-white transition-colors duration-200"
                data-testid="social-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-300 hover:text-white transition-colors duration-200"
                data-testid="social-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-300 hover:text-white transition-colors duration-200"
                data-testid="social-github"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                  data-testid="footer-home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                  data-testid="footer-blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                  data-testid="footer-about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                  data-testid="footer-contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                  data-testid="category-strategy"
                >
                  Strategy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                  data-testid="category-technology"
                >
                  Technology
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                  data-testid="category-leadership"
                >
                  Leadership
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                  data-testid="category-innovation"
                >
                  Innovation
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-slate-300 mb-4">Subscribe to our newsletter for the latest insights.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l-lg border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="newsletter-email"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors duration-200"
                data-testid="newsletter-submit"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 mt-12 pt-8 text-center">
          <p className="text-slate-300">
            © 2024 TechBlog. All rights reserved. | 
            <a href="#" className="hover:text-white transition-colors duration-200 ml-1" data-testid="privacy-policy">
              Privacy Policy
            </a> | 
            <a href="#" className="hover:text-white transition-colors duration-200 ml-1" data-testid="terms-service">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
