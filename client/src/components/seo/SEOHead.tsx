import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  category?: string;
}

export function SEOHead({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  publishedDate,
  modifiedDate,
  category
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (selector: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('property=')) {
          element.setAttribute('property', selector.split('"')[1]);
        } else if (selector.includes('name=')) {
          element.setAttribute('name', selector.split('"')[1]);
        }
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Basic meta tags
    updateMetaTag('meta[name="description"]', description);
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', keywords);
    }

    // Open Graph tags
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:type"]', type);
    
    if (image) {
      updateMetaTag('meta[property="og:image"]', image);
      updateMetaTag('meta[property="og:image:alt"]', title);
      updateMetaTag('meta[property="og:image:width"]', '1200');
      updateMetaTag('meta[property="og:image:height"]', '630');
    }
    
    if (url) {
      updateMetaTag('meta[property="og:url"]', url);
    }

    // Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', description);
    
    if (image) {
      updateMetaTag('meta[name="twitter:image"]', image);
    }

    // Article specific meta tags
    if (type === 'article') {
      if (author) {
        updateMetaTag('meta[name="author"]', author);
        updateMetaTag('meta[property="article:author"]', author);
      }
      
      if (publishedDate) {
        updateMetaTag('meta[property="article:published_time"]', publishedDate);
      }
      
      if (modifiedDate) {
        updateMetaTag('meta[property="article:modified_time"]', modifiedDate);
      }
      
      if (category) {
        updateMetaTag('meta[property="article:section"]', category);
        updateMetaTag('meta[property="article:tag"]', category);
      }
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url || window.location.href;

    // Schema.org JSON-LD structured data
    const generateStructuredData = () => {
      // Remove existing structured data
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      let structuredData: any;

      if (type === 'article') {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": title,
          "description": description,
          "image": image ? [image] : undefined,
          "author": {
            "@type": "Person",
            "name": author || "TechBlog Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "TechBlog",
            "logo": {
              "@type": "ImageObject",
              "url": `${window.location.origin}/logo.png`
            }
          },
          "datePublished": publishedDate,
          "dateModified": modifiedDate || publishedDate,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url || window.location.href
          },
          "articleSection": category,
          "keywords": keywords,
          "url": url || window.location.href,
          "wordCount": description.split(' ').length * 20, // Estimate
          "isAccessibleForFree": true,
          "genre": "Technology"
        };
      } else {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "TechBlog",
          "description": description,
          "url": window.location.origin,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "TechBlog",
            "logo": {
              "@type": "ImageObject",
              "url": `${window.location.origin}/logo.png`
            }
          }
        };
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData, null, 2);
      document.head.appendChild(script);
    };

    generateStructuredData();

  }, [title, description, keywords, image, url, type, author, publishedDate, modifiedDate, category]);

  return null;
}