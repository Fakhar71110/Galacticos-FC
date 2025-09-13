"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Save, X, ImageIcon } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface GalleryItem {
  id: string
  title: string
  description: string
  image_url: string
  gallery_type: string
  match_id: string | null
  upload_date: string
  is_featured: boolean
}

export function GalleryManager() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    gallery_type: "general",
    match_id: "",
    is_featured: false,
  })

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("gallery").select("*").order("upload_date", { ascending: false })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch gallery items",
        variant: "destructive",
      })
    } else {
      setGalleryItems(data || [])
    }
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    const galleryData = {
      ...formData,
      match_id: formData.match_id || null,
    }

    let error
    if (editingItem) {
      const { error: updateError } = await supabase.from("gallery").update(galleryData).eq("id", editingItem.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from("gallery").insert([galleryData])
      error = insertError
    }

    if (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingItem ? "update" : "add"} gallery item`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Gallery item ${editingItem ? "updated" : "added"} successfully`,
      })
      setIsDialogOpen(false)
      resetForm()
      fetchGalleryItems()
    }
  }

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description || "",
      image_url: item.image_url,
      gallery_type: item.gallery_type,
      match_id: item.match_id || "",
      is_featured: item.is_featured,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return

    const supabase = createClient()
    const { error } = await supabase.from("gallery").delete().eq("id", itemId)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete gallery item",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Gallery item deleted successfully",
      })
      fetchGalleryItems()
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
      gallery_type: "general",
      match_id: "",
      is_featured: false,
    })
    setEditingItem(null)
  }

  if (isLoading) {
    return <div className="text-white">Loading gallery...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Gallery Management</h2>
          <p className="text-gray-400">Manage photos and media content</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-green-700 hover:bg-green-800">
              <Plus className="w-4 h-4 mr-2" />
              Add Photo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border-green-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Photo" : "Add New Photo"}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {editingItem ? "Update photo information" : "Add a new photo to the gallery"}
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  required
                />
                <p className="text-xs text-gray-400">Upload your image to a hosting service and paste the URL here</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gallery_type">Category</Label>
                <Select
                  value={formData.gallery_type}
                  onValueChange={(value) => setFormData({ ...formData, gallery_type: value })}
                >
                  <SelectTrigger className="bg-green-900/20 border-green-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match">Match Photos</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="event">Club Events</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label htmlFor="is_featured">Featured Photo</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-700 hover:bg-green-800">
                  <Save className="w-4 h-4 mr-2" />
                  {editingItem ? "Update" : "Add"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryItems.map((item) => (
          <Card key={item.id} className="bg-green-900/20 border-green-800 overflow-hidden">
            <div className="relative">
              <img src={item.image_url || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
              {item.is_featured && (
                <div className="absolute top-2 left-2">
                  <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">Featured</span>
                </div>
              )}
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button size="sm" variant="secondary" onClick={() => handleEdit(item)}>
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="secondary" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-white font-semibold mb-2 text-pretty">{item.title}</h3>
              {item.description && <p className="text-sm text-gray-400 mb-2 text-pretty">{item.description}</p>}
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-400 capitalize">{item.gallery_type}</span>
                <span className="text-xs text-gray-500">{new Date(item.upload_date).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {galleryItems.length === 0 && (
        <Card className="bg-green-900/20 border-green-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No photos yet</h3>
            <p className="text-gray-400 text-center mb-4">
              Start building your gallery by adding match photos, training sessions, and club events.
            </p>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-green-700 hover:bg-green-800">
              <Plus className="w-4 h-4 mr-2" />
              Add First Photo
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
