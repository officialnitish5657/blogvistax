import { type User, type InsertUser, type Blog, type InsertBlog, type UpdateBlog } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog methods
  getAllBlogs(): Promise<Blog[]>;
  getBlogById(id: string): Promise<Blog | undefined>;
  getPublishedBlogs(): Promise<Blog[]>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  updateBlog(id: string, blog: UpdateBlog): Promise<Blog | undefined>;
  deleteBlog(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private blogs: Map<string, Blog>;

  constructor() {
    this.users = new Map();
    this.blogs = new Map();
    this.initializeSampleBlogs();
  }

  private initializeSampleBlogs() {
    const sampleBlogs: Blog[] = [
      {
        id: "1",
        title: "The Future of Remote Team Collaboration",
        content: `The landscape of work has fundamentally changed. What once required physical presence and face-to-face meetings has evolved into a sophisticated ecosystem of digital collaboration tools and remote-first methodologies.

## The Evolution of Remote Collaboration

Remote collaboration has moved beyond simple video calls and shared documents. Today's teams leverage advanced project management platforms, real-time collaborative editing tools, and sophisticated communication channels that enable seamless workflow integration.

## Key Technologies Driving Change

- Cloud-based project management systems
- Real-time collaborative documentation platforms
- Advanced video conferencing with screen sharing capabilities
- Integrated communication channels (Slack, Microsoft Teams)
- Virtual whiteboarding and brainstorming tools

These technologies have created new possibilities for distributed teams to maintain productivity levels that often exceed those of traditional office environments.

## Best Practices for Remote Team Success

Successful remote collaboration requires intentional strategy and clear communication protocols. Teams that thrive in remote environments establish regular check-ins, maintain transparent project tracking, and invest in quality collaboration tools.`,
        excerpt: "Explore how modern teams are leveraging technology to create seamless collaborative experiences across distributed workforces...",
        category: "Strategy",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        published: true,
        createdAt: new Date("2024-11-15"),
        updatedAt: new Date("2024-11-15"),
      },
      {
        id: "2",
        title: "AI-Powered Business Intelligence Trends",
        content: `Artificial intelligence is revolutionizing how businesses analyze data and make strategic decisions. The integration of AI into business intelligence platforms is creating unprecedented opportunities for insights and automation.

## The Current State of AI in BI

Modern AI-powered BI tools can process vast amounts of data in real-time, identify patterns that humans might miss, and provide predictive analytics that help organizations stay ahead of market trends.

## Key Benefits

- Automated data analysis and pattern recognition
- Predictive modeling for future trends
- Natural language querying of complex datasets
- Real-time anomaly detection
- Personalized dashboards and insights

## Implementation Strategies

Organizations looking to implement AI-powered BI should start with clear objectives, ensure data quality, and invest in proper training for their teams.`,
        excerpt: "Discover how artificial intelligence is revolutionizing data analysis and decision-making processes in modern enterprises...",
        category: "Technology",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        published: true,
        createdAt: new Date("2024-11-12"),
        updatedAt: new Date("2024-11-12"),
      },
      {
        id: "3",
        title: "Building High-Performance Teams",
        content: `Creating and maintaining teams that consistently deliver exceptional results requires a combination of strategic planning, effective communication, and continuous development.

## Core Principles

High-performance teams share several key characteristics: clear goals, defined roles, open communication, mutual trust, and a commitment to continuous improvement.

## Leadership Strategies

- Set clear expectations and objectives
- Foster a culture of psychological safety
- Provide regular feedback and recognition
- Invest in team development and training
- Encourage innovation and risk-taking

## Measuring Success

Track team performance through both quantitative metrics and qualitative assessments to ensure continuous improvement and alignment with organizational goals.`,
        excerpt: "Learn the essential strategies for creating and maintaining teams that consistently deliver exceptional results...",
        category: "Leadership",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        published: true,
        createdAt: new Date("2024-11-10"),
        updatedAt: new Date("2024-11-10"),
      },
      {
        id: "4",
        title: "Digital Transformation Best Practices",
        content: `Digital transformation is more than just implementing new technology—it's about fundamentally changing how organizations operate and deliver value to customers.

## Understanding Digital Transformation

True digital transformation involves reimagining business processes, culture, and customer experiences to leverage the full potential of digital technologies.

## Key Success Factors

- Executive leadership and commitment
- Clear vision and strategy
- Employee engagement and training
- Customer-centric approach
- Iterative implementation

## Common Pitfalls to Avoid

Many organizations fail in their digital transformation efforts due to lack of clear strategy, resistance to change, or trying to do too much too quickly.`,
        excerpt: "A comprehensive guide to implementing successful digital transformation initiatives in enterprise environments...",
        category: "Innovation",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        published: true,
        createdAt: new Date("2024-11-08"),
        updatedAt: new Date("2024-11-08"),
      },
    ];

    sampleBlogs.forEach(blog => {
      this.blogs.set(blog.id, blog);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getBlogById(id: string): Promise<Blog | undefined> {
    return this.blogs.get(id);
  }

  async getPublishedBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values())
      .filter(blog => blog.published)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const id = randomUUID();
    const now = new Date();
    const blog: Blog = {
      ...insertBlog,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.blogs.set(id, blog);
    return blog;
  }

  async updateBlog(id: string, updateBlog: UpdateBlog): Promise<Blog | undefined> {
    const existingBlog = this.blogs.get(id);
    if (!existingBlog) {
      return undefined;
    }

    const updatedBlog: Blog = {
      ...existingBlog,
      ...updateBlog,
      updatedAt: new Date(),
    };
    this.blogs.set(id, updatedBlog);
    return updatedBlog;
  }

  async deleteBlog(id: string): Promise<boolean> {
    return this.blogs.delete(id);
  }
}

export const storage = new MemStorage();
