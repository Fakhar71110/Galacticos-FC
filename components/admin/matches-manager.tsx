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
import { Plus, Edit, Trash2, Save, X, Calendar, Trophy } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Match {
  id: string
  opponent_id: string
  match_date: string
  venue: string
  competition: string
  status: string
  home_score: number
  away_score: number
  is_home: boolean
  match_report: string
  formation: string
  teams?: { name: string }
}

interface Team {
  id: string
  name: string
  is_home_team: boolean
}

export function MatchesManager() {
  const [matches, setMatches] = useState<Match[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingMatch, setEditingMatch] = useState<Match | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    opponent_id: "",
    match_date: "",
    venue: "",
    competition: "",
    status: "scheduled",
    home_score: "0",
    away_score: "0",
    is_home: true,
    match_report: "",
    formation: "",
  })

  useEffect(() => {
    fetchMatches()
    fetchTeams()
  }, [])

  const fetchMatches = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("matches")
      .select(`
        *,
        teams:opponent_id (name)
      `)
      .order("match_date", { ascending: false })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch matches",
        variant: "destructive",
      })
    } else {
      setMatches(data || [])
    }
    setIsLoading(false)
  }

  const fetchTeams = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("teams").select("*").eq("is_home_team", false).order("name")

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch teams",
        variant: "destructive",
      })
    } else {
      setTeams(data || [])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    // Get current season
    const { data: season } = await supabase.from("seasons").select("id").eq("is_current", true).single()

    const matchData = {
      ...formData,
      season_id: season?.id,
      home_score: Number.parseInt(formData.home_score),
      away_score: Number.parseInt(formData.away_score),
    }

    let error
    if (editingMatch) {
      const { error: updateError } = await supabase.from("matches").update(matchData).eq("id", editingMatch.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from("matches").insert([matchData])
      error = insertError
    }

    if (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingMatch ? "update" : "create"} match`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Match ${editingMatch ? "updated" : "created"} successfully`,
      })
      setIsDialogOpen(false)
      resetForm()
      fetchMatches()
    }
  }

  const handleEdit = (match: Match) => {
    setEditingMatch(match)
    setFormData({
      opponent_id: match.opponent_id,
      match_date: match.match_date.split("T")[0],
      venue: match.venue,
      competition: match.competition || "",
      status: match.status,
      home_score: match.home_score.toString(),
      away_score: match.away_score.toString(),
      is_home: match.is_home,
      match_report: match.match_report || "",
      formation: match.formation || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (matchId: string) => {
    if (!confirm("Are you sure you want to delete this match?")) return

    const supabase = createClient()
    const { error } = await supabase.from("matches").delete().eq("id", matchId)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete match",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Match deleted successfully",
      })
      fetchMatches()
    }
  }

  const resetForm = () => {
    setFormData({
      opponent_id: "",
      match_date: "",
      venue: "",
      competition: "",
      status: "scheduled",
      home_score: "0",
      away_score: "0",
      is_home: true,
      match_report: "",
      formation: "",
    })
    setEditingMatch(null)
  }

  const getResultBadge = (match: Match) => {
    if (match.status !== "finished") return null

    const ourScore = match.is_home ? match.home_score : match.away_score
    const theirScore = match.is_home ? match.away_score : match.home_score

    if (ourScore > theirScore) {
      return <Badge className="bg-green-600 text-white">WIN</Badge>
    } else if (ourScore < theirScore) {
      return <Badge className="bg-red-600 text-white">LOSS</Badge>
    } else {
      return <Badge className="bg-yellow-600 text-white">DRAW</Badge>
    }
  }

  if (isLoading) {
    return <div className="text-white">Loading matches...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Matches Management</h2>
          <p className="text-gray-400">Manage fixtures and results</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-green-700 hover:bg-green-800">
              <Plus className="w-4 h-4 mr-2" />
              Add Match
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border-green-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingMatch ? "Edit Match" : "Add New Match"}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {editingMatch ? "Update match information" : "Add a new fixture or result"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="opponent_id">Opponent</Label>
                  <Select
                    value={formData.opponent_id}
                    onValueChange={(value) => setFormData({ ...formData, opponent_id: value })}
                  >
                    <SelectTrigger className="bg-green-900/20 border-green-800">
                      <SelectValue placeholder="Select opponent" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="match_date">Match Date</Label>
                  <Input
                    id="match_date"
                    type="date"
                    value={formData.match_date}
                    onChange={(e) => setFormData({ ...formData, match_date: e.target.value })}
                    className="bg-green-900/20 border-green-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="bg-green-900/20 border-green-800"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="competition">Competition</Label>
                  <Input
                    id="competition"
                    value={formData.competition}
                    onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                    className="bg-green-900/20 border-green-800"
                    placeholder="e.g., Premier League, FA Cup"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="bg-green-900/20 border-green-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="finished">Finished</SelectItem>
                      <SelectItem value="postponed">Postponed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="home_score">Home Score</Label>
                  <Input
                    id="home_score"
                    type="number"
                    min="0"
                    value={formData.home_score}
                    onChange={(e) => setFormData({ ...formData, home_score: e.target.value })}
                    className="bg-green-900/20 border-green-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="away_score">Away Score</Label>
                  <Input
                    id="away_score"
                    type="number"
                    min="0"
                    value={formData.away_score}
                    onChange={(e) => setFormData({ ...formData, away_score: e.target.value })}
                    className="bg-green-900/20 border-green-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="formation">Formation</Label>
                <Input
                  id="formation"
                  value={formData.formation}
                  onChange={(e) => setFormData({ ...formData, formation: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  placeholder="e.g., 4-4-2, 3-5-2"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_home"
                  checked={formData.is_home}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_home: checked })}
                />
                <Label htmlFor="is_home">Home Match</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="match_report">Match Report</Label>
                <Textarea
                  id="match_report"
                  value={formData.match_report}
                  onChange={(e) => setFormData({ ...formData, match_report: e.target.value })}
                  className="bg-green-900/20 border-green-800"
                  rows={4}
                  placeholder="Write a summary of the match..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-700 hover:bg-green-800">
                  <Save className="w-4 h-4 mr-2" />
                  {editingMatch ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {matches.map((match) => (
          <Card key={match.id} className="bg-green-900/20 border-green-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <div>
                    <CardTitle className="text-white text-lg">Local FC vs {match.teams?.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {new Date(match.match_date).toLocaleDateString("en-GB")} • {match.competition}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getResultBadge(match)}
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(match)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(match.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-1">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm text-white">Local FC</p>
                  </div>
                  <div className="text-center">
                    {match.status === "finished" ? (
                      <div className="text-2xl font-bold text-white">
                        {match.is_home ? match.home_score : match.away_score} -{" "}
                        {match.is_home ? match.away_score : match.home_score}
                      </div>
                    ) : (
                      <div className="text-lg font-bold text-green-400">VS</div>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-1">
                      <Trophy className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-white">{match.teams?.name}</p>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-400">
                  <p>
                    {match.venue} • {match.is_home ? "Home" : "Away"}
                  </p>
                  {match.formation && <p>Formation: {match.formation}</p>}
                </div>

                {match.match_report && (
                  <div className="text-sm text-gray-300 text-pretty">
                    <p>{match.match_report}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
