"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface ClubSettings {
  id: string
  club_name: string
  club_logo_url: string
  club_slogan: string
  founded_year: number
  home_ground: string
  club_colors: string
  about_text: string
  contact_email: string
  social_facebook: string
  social_instagram: string
  social_twitter: string
  social_youtube: string
  social_tiktok: string
}

export function ClubSettings() {
  const [settings, setSettings] = useState<ClubSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    club_name: "",
    club_logo_url: "",
    club_slogan: "",
    founded_year: "",
    home_ground: "",
    club_colors: "",
    about_text: "",
    contact_email: "",
    social_facebook: "",
    social_instagram: "",
    social_twitter: "",
    social_youtube: "",
    social_tiktok: "",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("club_settings").select("*").single()

    if (error && error.code !== "PGRST116") {
      toast({
        title: "Error",
        description: "Failed to fetch club settings",
        variant: "destructive",
      })
    } else if (data) {
      setSettings(data)
      setFormData({
        club_name: data.club_name || "",
        club_logo_url: data.club_logo_url || "",
        club_slogan: data.club_slogan || "",
        founded_year: data.founded_year?.toString() || "",
        home_ground: data.home_ground || "",
        club_colors: data.club_colors || "",
        about_text: data.about_text || "",
        contact_email: data.contact_email || "",
        social_facebook: data.social_facebook || "",
        social_instagram: data.social_instagram || "",
        social_twitter: data.social_twitter || "",
        social_youtube: data.social_youtube || "",
        social_tiktok: data.social_tiktok || "",
      })
    }
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    const supabase = createClient()

    const settingsData = {
      ...formData,
      founded_year: formData.founded_year ? Number.parseInt(formData.founded_year) : null,
    }

    let error
    if (settings) {
      const { error: updateError } = await supabase.from("club_settings").update(settingsData).eq("id", settings.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from("club_settings").insert([settingsData])
      error = insertError
    }

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save club settings",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Club settings saved successfully",
      })
      fetchSettings()
    }
    setIsSaving(false)
  }

  if (isLoading) {
    return <div className="text-white">Loading settings...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Club Settings</h2>
        <p className="text-gray-400">Manage your club's basic information and social media links</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="bg-green-900/20 border-green-800">
          <CardHeader>
            <CardTitle className="text-white">Basic Information</CardTitle>
            <CardDescription className="text-gray-400">Core details about your football club</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="club_name">Club Name</Label>
                <Input
                  id="club_name"
                  value={formData.club_name}
                  onChange={(e) => setFormData({ ...formData, club_name: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="club_slogan">Club Slogan</Label>
                <Input
                  id="club_slogan"
                  value={formData.club_slogan}
                  onChange={(e) => setFormData({ ...formData, club_slogan: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  placeholder="e.g., Unity, Passion, Victory"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="founded_year">Founded Year</Label>
                <Input
                  id="founded_year"
                  type="number"
                  min="1800"
                  max="2024"
                  value={formData.founded_year}
                  onChange={(e) => setFormData({ ...formData, founded_year: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="home_ground">Home Ground</Label>
                <Input
                  id="home_ground"
                  value={formData.home_ground}
                  onChange={(e) => setFormData({ ...formData, home_ground: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  placeholder="e.g., Community Stadium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="club_colors">Club Colors</Label>
                <Input
                  id="club_colors"
                  value={formData.club_colors}
                  onChange={(e) => setFormData({ ...formData, club_colors: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  placeholder="e.g., Dark Green and Black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  placeholder="info@localfc.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="club_logo_url">Club Logo URL</Label>
              <Input
                id="club_logo_url"
                type="url"
                value={formData.club_logo_url}
                onChange={(e) => setFormData({ ...formData, club_logo_url: e.target.value })}
                className="bg-green-900/20 border-green-800"
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="about_text">About the Club</Label>
              <Textarea
                id="about_text"
                value={formData.about_text}
                onChange={(e) => setFormData({ ...formData, about_text: e.target.value })}
                className="bg-green-900/20 border-green-800"
                rows={4}
                placeholder="Tell the story of your club..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="bg-green-900/20 border-green-800">
          <CardHeader>
            <CardTitle className="text-white">Social Media</CardTitle>
            <CardDescription className="text-gray-400">Connect your social media accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="social_facebook">Facebook URL</Label>
                <Input
                  id="social_facebook"
                  type="url"
                  value={formData.social_facebook}
                  onChange={(e) => setFormData({ ...formData, social_facebook: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  placeholder="https://facebook.com/localfc"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_instagram">Instagram URL</Label>
                <Input
                  id="social_instagram"
                  type="url"
                  value={formData.social_instagram}
                  onChange={(e) => setFormData({ ...formData, social_instagram: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  placeholder="https://instagram.com/localfc"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="social_twitter">Twitter URL</Label>
                <Input
                  id="social_twitter"
                  type="url"
                  value={formData.social_twitter}
                  onChange={(e) => setFormData({ ...formData, social_twitter: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  placeholder="https://twitter.com/localfc"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_youtube">YouTube URL</Label>
                <Input
                  id="social_youtube"
                  type="url"
                  value={formData.social_youtube}
                  onChange={(e) => setFormData({ ...formData, social_youtube: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  placeholder="https://youtube.com/localfc"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="social_tiktok">TikTok URL</Label>
              <Input
                id="social_tiktok"
                type="url"
                value={formData.social_tiktok}
                onChange={(e) => setFormData({ ...formData, social_tiktok: e.target.value })}
                className="bg-green-900/20 border-green-800"
                placeholder="https://tiktok.com/@localfc"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving} className="bg-green-700 hover:bg-green-800">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  )
}
