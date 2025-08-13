import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, FileText, CheckCircle, Edit3, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Blog, InsertBlog, UpdateBlog } from "@shared/schema";

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState<InsertBlog>({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    imageUrl: "",
    published: false,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: blogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  const createBlogMutation = useMutation({
    mutationFn: (data: InsertBlog) => apiRequest("POST", "/api/blogs", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      toast({ title: "Blog created successfully!" });
      resetForm();
    },
    onError: () => {
      toast({ title: "Failed to create blog", variant: "destructive" });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBlog }) =>
      apiRequest("PUT", `/api/blogs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      toast({ title: "Blog updated successfully!" });
      resetForm();
    },
    onError: () => {
      toast({ title: "Failed to update blog", variant: "destructive" });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/blogs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      toast({ title: "Blog deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to delete blog", variant: "destructive" });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handlePublishedChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, published: checked }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: "",
      imageUrl: "",
      published: false,
    });
    setEditingBlog(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      category: blog.category,
      imageUrl: blog.imageUrl || "",
      published: blog.published || false,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlog) {
      updateBlogMutation.mutate({ id: editingBlog.id, data: formData });
    } else {
      createBlogMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      deleteBlogMutation.mutate(id);
    }
  };

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

  const stats = blogs ? {
    totalPosts: blogs.length,
    published: blogs.filter(blog => blog.published).length,
    drafts: blogs.filter(blog => !blog.published).length,
    views: 1234, // Mock data
  } : { totalPosts: 0, published: 0, drafts: 0, views: 0 };

  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900" data-testid="admin-title">
            Admin Dashboard
          </h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddModal} data-testid="add-blog-button">
                <Plus className="mr-2 h-4 w-4" />
                Add New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle data-testid="modal-title">
                  {editingBlog ? "Edit Blog Post" : "Add New Blog Post"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter blog title"
                    required
                    data-testid="blog-title-input"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={handleSelectChange} required>
                    <SelectTrigger data-testid="blog-category-select">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Strategy">Strategy</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Leadership">Leadership</SelectItem>
                      <SelectItem value="Innovation">Innovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Brief description of the blog post"
                    rows={3}
                    required
                    data-testid="blog-excerpt-input"
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl || ""}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    data-testid="blog-image-input"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your blog content..."
                    rows={8}
                    required
                    data-testid="blog-content-input"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={handlePublishedChange}
                    data-testid="blog-published-switch"
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={resetForm} data-testid="modal-cancel">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createBlogMutation.isPending || updateBlogMutation.isPending}
                    data-testid="modal-save"
                  >
                    {editingBlog ? "Update Post" : "Save Post"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6" data-testid="stats-total">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Total Posts</p>
                <p className="text-3xl font-bold text-slate-900">{stats.totalPosts}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="text-primary h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6" data-testid="stats-published">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Published</p>
                <p className="text-3xl font-bold text-slate-900">{stats.published}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-emerald-600 h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6" data-testid="stats-drafts">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Drafts</p>
                <p className="text-3xl font-bold text-slate-900">{stats.drafts}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Edit3 className="text-amber-600 h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6" data-testid="stats-views">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Views</p>
                <p className="text-3xl font-bold text-slate-900">{stats.views}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="text-purple-600 h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900" data-testid="manage-posts-title">
              Manage Posts
            </h2>
          </div>
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" data-testid="loading-spinner" />
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {blogs?.map((blog) => (
                    <tr key={blog.id} data-testid={`blog-row-${blog.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900" data-testid={`blog-title-${blog.id}`}>
                          {blog.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(blog.category)}`}
                          data-testid={`blog-category-${blog.id}`}
                        >
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            blog.published
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                          data-testid={`blog-status-${blog.id}`}
                        >
                          {blog.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500" data-testid={`blog-date-${blog.id}`}>
                        {formatDate(blog.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                        <button
                          onClick={() => openEditModal(blog)}
                          className="text-primary hover:text-blue-700 transition-colors duration-200"
                          data-testid={`edit-blog-${blog.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="text-red-600 hover:text-red-700 transition-colors duration-200"
                          disabled={deleteBlogMutation.isPending}
                          data-testid={`delete-blog-${blog.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {!isLoading && (!blogs || blogs.length === 0) && (
          <div className="text-center py-12">
            <p className="text-slate-600" data-testid="no-blogs-message">
              No blog posts available. Create your first post!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
