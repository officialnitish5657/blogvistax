import { Lightbulb, Users, Target } from "lucide-react";

export default function About() {
  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6" data-testid="about-title">
            About TechBlog
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto" data-testid="about-subtitle">
            We're passionate about sharing insights that drive innovation and transform businesses across industries.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6" data-testid="mission-title">
              Our Mission
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6" data-testid="mission-text-1">
              At TechBlog, we believe that knowledge should be accessible, actionable, and transformative. Our mission is to bridge the gap between cutting-edge research and practical implementation.
            </p>
            <p className="text-slate-700 leading-relaxed" data-testid="mission-text-2">
              We curate insights from industry leaders, emerging technologies, and proven strategies to help professionals and organizations stay ahead in a rapidly evolving digital landscape.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              alt="Diverse team brainstorming in modern office"
              className="rounded-xl shadow-lg w-full h-auto"
              data-testid="mission-image"
              loading="lazy"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12" data-testid="values-title">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6" data-testid="value-innovation">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Innovation</h3>
              <p className="text-slate-600">We embrace new ideas and emerging technologies to drive meaningful change.</p>
            </div>
            <div className="text-center p-6" data-testid="value-collaboration">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-accent h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Collaboration</h3>
              <p className="text-slate-600">We believe in the power of diverse perspectives and shared knowledge.</p>
            </div>
            <div className="text-center p-6" data-testid="value-excellence">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-emerald-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Excellence</h3>
              <p className="text-slate-600">We strive for the highest quality in everything we create and share.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12" data-testid="team-title">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="team-member-sarah">
              <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-slate-500">SJ</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Sarah Johnson</h3>
              <p className="text-slate-600 mb-2">Editor-in-Chief</p>
              <p className="text-slate-500 text-sm">10+ years in tech journalism and strategy consulting</p>
            </div>
            <div className="text-center" data-testid="team-member-michael">
              <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-slate-500">MC</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Michael Chen</h3>
              <p className="text-slate-600 mb-2">Technology Writer</p>
              <p className="text-slate-500 text-sm">Former software engineer turned tech evangelist</p>
            </div>
            <div className="text-center" data-testid="team-member-emily">
              <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-slate-500">ER</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Emily Rodriguez</h3>
              <p className="text-slate-600 mb-2">Business Analyst</p>
              <p className="text-slate-500 text-sm">Expert in digital transformation and organizational change</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
