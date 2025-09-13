"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Player {
  id: string
  name: string
  jersey_number: number
  position: string
  bio: string
  photo_url: string
  is_captain: boolean
  is_vice_captain: boolean
  date_joined: string
  is_active: boolean
}

const positions = ["GK", "CB", "LB", "RB", "CDM", "CM", "CAM", "LM", "RM", "LW", "RW", "ST", "CF"]

export function PlayersManager() {
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    jersey_number: "",
    position: "",
    bio: "",
    photo_url: "",
    is_captain: false,
    is_vice_captain: false,
    date_joined: "",
    is_active: true,
  })

  useEffect(() => {
    fetchPlayers()
  }, [])

  const fetchPlayers = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("players").select("*").order("jersey_number")

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch players",
        variant: "destructive",
      })
    } else {
      setPlayers(data || [])
    }
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    const playerData = {
      ...formData,
      jersey_number: Number.parseInt(formData.jersey_number),
    }

    let error
    if (editingPlayer) {
      const { error: updateError } = await supabase.from("players").update(playerData).eq("id", editingPlayer.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from("players").insert([playerData])
      error = insertError
    }

    if (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingPlayer ? "update" : "create"} player`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Player ${editingPlayer ? "updated" : "created"} successfully`,
      })
      setIsDialogOpen(false)
      resetForm()
      fetchPlayers()
    }
  }

  const handleEdit = (player: Player) => {
    setEditingPlayer(player)
    setFormData({
      name: player.name,
      jersey_number: player.jersey_number.toString(),
      position: player.position,
      bio: player.bio || "",
      photo_url: player.photo_url || "",
      is_captain: player.is_captain,
      is_vice_captain: player.is_vice_captain,
      date_joined: player.date_joined || "",
      is_active: player.is_active,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (playerId: string) => {
    if (!confirm("Are you sure you want to delete this player?")) return

    const supabase = createClient()
    const { error } = await supabase.from("players").delete().eq("id", playerId)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete player",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Player deleted successfully",
      })
      fetchPlayers()
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      jersey_number: "",
      position: "",
      bio: "",
      photo_url: "",
      is_captain: false,
      is_vice_captain: false,
      date_joined: "",
      is_active: true,
    })
    setEditingPlayer(null)
  }

  if (isLoading) {
    return <div className="text-white">Loading players...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Players Management</h2>
          <p className="text-gray-400">Manage your squad members</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-green-700 hover:bg-green-800">
              <Plus className="w-4 h-4 mr-2" />
              Add Player
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border-green-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingPlayer ? "Edit Player" : "Add New Player"}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {editingPlayer ? "Update player information" : "Add a new player to your squad"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-green-900/20 border-green-800"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jersey_number">Jersey Number</Label>
                  <Input
                    id="jersey_number"
                    type="number"
                    min="1"
                    max="99"
                    value={formData.jersey_number}
                    onChange={(e) => setFormData({ ...formData, jersey_number: e.target.value })}
                    className="bg-green-900/20 border-green-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) => setFormData({ ...formData, position: value })}
                >
                  <SelectTrigger className="bg-green-900/20 border-green-800">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((pos) => (
                      <SelectItem key={pos} value={pos}>
                        {pos}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo_url">Photo URL</Label>
                <Input
                  id="photo_url"
                  type="url"
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_joined">Date Joined</Label>
                <Input
                  id="date_joined"
                  type="date"
                  value={formData.date_joined}
                  onChange={(e) => setFormData({ ...formData, date_joined: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                />
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_captain"
                    checked={formData.is_captain}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_captain: checked })}
                  />
                  <Label htmlFor="is_captain">Captain</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_vice_captain"
                    checked={formData.is_vice_captain}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_vice_captain: checked })}
                  />
                  <Label htmlFor="is_vice_captain">Vice Captain</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-700 hover:bg-green-800">
                  <Save className="w-4 h-4 mr-2" />
                  {editingPlayer ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <Card key={player.id} className="bg-green-900/20 border-green-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {player.jersey_number}
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{player.name}</CardTitle>
                    <CardDescription className="text-gray-400">{player.position}</CardDescription>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(player)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(player.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {player.is_captain && <Badge className="bg-yellow-600 text-white">Captain</Badge>}
                  {player.is_vice_captain && <Badge className="bg-yellow-500 text-white">Vice Captain</Badge>}
                  {!player.is_active && (
                    <Badge variant="secondary" className="bg-gray-600">
                      Inactive
                    </Badge>
                  )}
                </div>
                {player.bio && <p className="text-sm text-gray-400 text-pretty">{player.bio}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
