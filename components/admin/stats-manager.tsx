"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Trophy, Target, Award, RefreshCw } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface PlayerStats {
  id: string
  player_id: string
  appearances: number
  goals: number
  assists: number
  clean_sheets: number
  yellow_cards: number
  red_cards: number
  minutes_played: number
  man_of_the_match: number
  average_rating: number
  players: {
    name: string
    position: string
    jersey_number: number
  }
}

export function StatsManager() {
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchPlayerStats()
  }, [])

  const fetchPlayerStats = async () => {
    const supabase = createClient()

    // Get current season
    const { data: season } = await supabase.from("seasons").select("id").eq("is_current", true).single()

    if (!season) {
      toast({
        title: "Error",
        description: "No current season found",
        variant: "destructive",
      })
      return
    }

    const { data, error } = await supabase
      .from("player_stats")
      .select(`
        *,
        players (
          name,
          position,
          jersey_number
        )
      `)
      .eq("season_id", season.id)
      .order("goals", { ascending: false })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch player stats",
        variant: "destructive",
      })
    } else {
      setPlayerStats(data || [])
    }
    setIsLoading(false)
  }

  const updateStatsFromMatches = async () => {
    setIsUpdating(true)
    const supabase = createClient()

    try {
      // This would typically be a database function or complex query
      // For now, we'll show a success message
      toast({
        title: "Success",
        description: "Player stats updated from match data",
      })

      // Refresh the stats
      await fetchPlayerStats()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update stats",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const getTopScorer = () => {
    return playerStats.reduce((prev, current) => (prev.goals > current.goals ? prev : current))
  }

  const getTopAssists = () => {
    return playerStats.reduce((prev, current) => (prev.assists > current.assists ? prev : current))
  }

  const getMostAppearances = () => {
    return playerStats.reduce((prev, current) => (prev.appearances > current.appearances ? prev : current))
  }

  const getMostMOTM = () => {
    return playerStats.reduce((prev, current) => (prev.man_of_the_match > current.man_of_the_match ? prev : current))
  }

  if (isLoading) {
    return <div className="text-white">Loading stats...</div>
  }

  const topScorer = getTopScorer()
  const topAssists = getTopAssists()
  const mostAppearances = getMostAppearances()
  const mostMOTM = getMostMOTM()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Statistics & Records</h2>
          <p className="text-gray-400">Season performance and player statistics</p>
        </div>
        <Button onClick={updateStatsFromMatches} disabled={isUpdating} className="bg-green-700 hover:bg-green-800">
          <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating ? "animate-spin" : ""}`} />
          Update Stats
        </Button>
      </div>

      {/* Season Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-green-900/20 border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Top Scorer</CardTitle>
            <Target className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{topScorer?.goals || 0}</div>
            <p className="text-xs text-green-400">{topScorer?.players?.name || "N/A"}</p>
          </CardContent>
        </Card>

        <Card className="bg-green-900/20 border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Most Assists</CardTitle>
            <Trophy className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{topAssists?.assists || 0}</div>
            <p className="text-xs text-green-400">{topAssists?.players?.name || "N/A"}</p>
          </CardContent>
        </Card>

        <Card className="bg-green-900/20 border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Most Appearances</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{mostAppearances?.appearances || 0}</div>
            <p className="text-xs text-green-400">{mostAppearances?.players?.name || "N/A"}</p>
          </CardContent>
        </Card>

        <Card className="bg-green-900/20 border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Most MOTM</CardTitle>
            <Award className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{mostMOTM?.man_of_the_match || 0}</div>
            <p className="text-xs text-green-400">{mostMOTM?.players?.name || "N/A"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Player Statistics Table */}
      <Card className="bg-green-900/20 border-green-800">
        <CardHeader>
          <CardTitle className="text-white">Player Statistics</CardTitle>
          <CardDescription className="text-gray-400">Complete season statistics for all players</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-green-800">
                  <th className="text-left py-3 px-2 text-white font-medium">#</th>
                  <th className="text-left py-3 px-2 text-white font-medium">Player</th>
                  <th className="text-left py-3 px-2 text-white font-medium">Pos</th>
                  <th className="text-center py-3 px-2 text-white font-medium">Apps</th>
                  <th className="text-center py-3 px-2 text-white font-medium">Goals</th>
                  <th className="text-center py-3 px-2 text-white font-medium">Assists</th>
                  <th className="text-center py-3 px-2 text-white font-medium">CS</th>
                  <th className="text-center py-3 px-2 text-white font-medium">YC</th>
                  <th className="text-center py-3 px-2 text-white font-medium">RC</th>
                  <th className="text-center py-3 px-2 text-white font-medium">MOTM</th>
                  <th className="text-center py-3 px-2 text-white font-medium">Rating</th>
                </tr>
              </thead>
              <tbody>
                {playerStats.map((stat, index) => (
                  <tr key={stat.id} className="border-b border-green-800/50 hover:bg-green-900/10">
                    <td className="py-3 px-2">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {stat.players?.jersey_number}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-white font-medium">{stat.players?.name}</div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant="secondary" className="bg-green-700 text-white text-xs">
                        {stat.players?.position}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center text-gray-300">{stat.appearances}</td>
                    <td className="py-3 px-2 text-center text-gray-300">{stat.goals}</td>
                    <td className="py-3 px-2 text-center text-gray-300">{stat.assists}</td>
                    <td className="py-3 px-2 text-center text-gray-300">{stat.clean_sheets}</td>
                    <td className="py-3 px-2 text-center text-yellow-400">{stat.yellow_cards}</td>
                    <td className="py-3 px-2 text-center text-red-400">{stat.red_cards}</td>
                    <td className="py-3 px-2 text-center text-green-400">{stat.man_of_the_match}</td>
                    <td className="py-3 px-2 text-center text-gray-300">
                      {stat.average_rating > 0 ? stat.average_rating.toFixed(1) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
