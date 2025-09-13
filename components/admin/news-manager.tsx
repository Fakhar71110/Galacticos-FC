"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, FileText, Eye } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface NewsArticle {
  id: string
  title: string
  content: string
  excerpt: string
  author_id: string
  featured_image_url: string
  is_published: boolean
  published_at: string
  created_at: string
  updated_at: string
}

export function NewsManager() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    featured_image_url: "",
    is_published: false,
  })

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch articles",
        variant: "destructive",
      })
    } else {
      setArticles(data || [])
    }
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const articleData = {
      ...formData,
      author_id: user.id,
      published_at: formData.is_published ? new Date().toISOString() : null,
    }

    let error
    if (editingArticle) {
      const { error: updateError } = await supabase.from("news").update(articleData).eq("id", editingArticle.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from("news").insert([articleData])
      error = insertError
    }

    if (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingArticle ? "update" : "create"} article`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Article ${editingArticle ? "updated" : "created"} successfully`,
      })
      setIsDialogOpen(false)
      resetForm()
      fetchArticles()
    }
  }

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article)
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt || "",
      featured_image_url: article.featured_image_url || "",
      is_published: article.is_published,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (articleId: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return

    const supabase = createClient()
    const { error } = await supabase.from("news").delete().eq("id", articleId)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Article deleted successfully",
      })
      fetchArticles()
    }
  }

  const togglePublished = async (article: NewsArticle) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("news")
      .update({
        is_published: !article.is_published,
        published_at: !article.is_published ? new Date().toISOString() : null,
      })
      .eq("id", article.id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update article status",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Article ${!article.is_published ? "published" : "unpublished"} successfully`,
      })
      fetchArticles()
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      featured_image_url: "",
      is_published: false,
    })
    setEditingArticle(null)
  }

  if (isLoading) {
    return <div className="text-white">Loading articles...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">News Management</h2>
          <p className="text-gray-400">Create and manage club news and articles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-green-700 hover:bg-green-800">
              <Plus className="w-4 h-4 mr-2" />
              Write Article
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border-green-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingArticle ? "Edit Article" : "Write New Article"}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {editingArticle ? "Update article content" : "Create a new news article for your club"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  rows={2}
                  placeholder="Brief summary of the article..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured_image_url">Featured Image URL</Label>
                <Input
                  id="featured_image_url"
                  type="url"
                  value={formData.featured_image_url}
                  onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  rows={12}
                  required
                  placeholder="Write your article content here..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="is_published">Publish immediately</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-700 hover:bg-green-800">
                  <Save className="w-4 h-4 mr-2" />
                  {editingArticle ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="bg-green-900/20 border-green-800">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg mb-2 text-pretty">{article.title}</CardTitle>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge
                      variant={article.is_published ? "default" : "secondary"}
                      className={article.is_published ? "bg-green-600 text-white" : "bg-gray-600 text-white"}
                    >
                      {article.is_published ? "Published" : "Draft"}
                    </Badge>
                    <span className="text-xs text-gray-400">{new Date(article.created_at).toLocaleDateString()}</span>
                  </div>
                  {article.excerpt && (
                    <CardDescription className="text-gray-400 text-pretty">{article.excerpt}</CardDescription>
                  )}
                </div>
                <div className="flex flex-col space-y-1 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(article)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => togglePublished(article)}
                    className={article.is_published ? "text-yellow-400" : "text-green-400"}
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(article.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {article.featured_image_url && (
                <img
                  src={article.featured_image_url || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-32 object-cover rounded mb-3"
                />
              )}
              <div className="text-sm text-gray-300">
                <p className="text-pretty">
                  {article.content.length > 150 ? `${article.content.substring(0, 150)}...` : article.content}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {articles.length === 0 && (
        <Card className="bg-green-900/20 border-green-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No articles yet</h3>
            <p className="text-gray-400 text-center mb-4">
              Start sharing club news, match reports, and updates with your community.
            </p>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-green-700 hover:bg-green-800">
              <Plus className="w-4 h-4 mr-2" />
              Write First Article
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
