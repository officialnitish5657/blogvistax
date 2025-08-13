export interface SEOData {
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

export function updatePageSEO(seoData: SEOData) {
  // Update document title
  document.title = seoData.title;

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
  updateMetaTag('meta[name="description"]', seoData.description);
  if (seoData.keywords) {
    updateMetaTag('meta[name="keywords"]', seoData.keywords);
  }

  // Open Graph tags
  updateMetaTag('meta[property="og:title"]', seoData.title);
  updateMetaTag('meta[property="og:description"]', seoData.description);
  updateMetaTag('meta[property="og:type"]', seoData.type || 'website');
  
  if (seoData.image) {
    updateMetaTag('meta[property="og:image"]', seoData.image);
    updateMetaTag('meta[property="og:image:alt"]', seoData.title);
  }
  
  if (seoData.url) {
    updateMetaTag('meta[property="og:url"]', seoData.url);
  }

  // Twitter Card tags
  updateMetaTag('meta[name="twitter:card"]', 'summary_large_image');
  updateMetaTag('meta[name="twitter:title"]', seoData.title);
  updateMetaTag('meta[name="twitter:description"]', seoData.description);
  
  if (seoData.image) {
    updateMetaTag('meta[name="twitter:image"]', seoData.image);
  }

  // Article specific meta tags
  if (seoData.type === 'article') {
    if (seoData.author) {
      updateMetaTag('meta[name="author"]', seoData.author);
      updateMetaTag('meta[property="article:author"]', seoData.author);
    }
    
    if (seoData.publishedDate) {
      updateMetaTag('meta[property="article:published_time"]', seoData.publishedDate);
    }
    
    if (seoData.modifiedDate) {
      updateMetaTag('meta[property="article:modified_time"]', seoData.modifiedDate);
    }
    
    if (seoData.category) {
      updateMetaTag('meta[property="article:section"]', seoData.category);
    }
  }

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = seoData.url || window.location.href;
}

export function generateStructuredData(type: 'WebSite' | 'BlogPosting', data: any) {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  let structuredData: any;

  if (type === 'WebSite') {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "TechBlog",
      "description": "Modern insights on technology, strategy, and innovation",
      "url": window.location.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  } else if (type === 'BlogPosting') {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.title,
      "description": data.excerpt,
      "image": data.imageUrl,
      "author": {
        "@type": "Person",
        "name": "TechBlog Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "TechBlog",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`
        }
      },
      "datePublished": data.createdAt,
      "dateModified": data.updatedAt || data.createdAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      },
      "articleSection": data.category,
      "keywords": data.keywords || `${data.category}, technology, blog`,
      "url": window.location.href
    };
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

export const defaultSEO: SEOData = {
  title: 'TechBlog - Modern Insights on Technology & Innovation',
  description: 'Discover cutting-edge insights on technology, strategy, and innovation. Expert articles on AI, development, leadership, and emerging trends.',
  keywords: 'technology blog, innovation, AI, development, strategy, leadership, tech trends',
  type: 'website'
};