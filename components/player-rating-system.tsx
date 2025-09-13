"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Trophy, Calendar, Users, Save, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Match {
  id: string
  match_date: string
  opponent_id: string
  home_score: number
  away_score: number
  is_home: boolean
  status: string
  teams: { name: string }
}

interface Player {
  id: string
  name: string
  jersey_number: number
  position: string
  photo_url: string
}

interface PlayerRating {
  player_id: string
  rating: number
}

export function PlayerRatingSystem() {
  const [matches, setMatches] = useState<Match[]>([])
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [ratings, setRatings] = useState<PlayerRating[]>([])
  const [existingRatings, setExistingRatings] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchRecentMatches()
  }, [])

  useEffect(() => {
    if (selectedMatch) {
      fetchMatchPlayers()
      checkExistingRatings()
    }
  }, [selectedMatch])

  const fetchRecentMatches = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("matches")
      .select(`
        *,
        teams:opponent_id (name)
      `)
      .eq("status", "finished")
      .order("match_date", { ascending: false })
      .limit(10)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch matches",
        variant: "destructive",
      })
    } else {
      setMatches(data || [])
      if (data && data.length > 0) {
        setSelectedMatch(data[0])
      }
    }
    setIsLoading(false)
  }

  const fetchMatchPlayers = async () => {
    if (!selectedMatch) return

    const supabase = createClient()
    const { data, error } = await supabase
      .from("match_lineups")
      .select(`
        player_id,
        players (
          id,
          name,
          jersey_number,
          position,
          photo_url
        )
      `)
      .eq("match_id", selectedMatch.id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch match players",
        variant: "destructive",
      })
    } else {
      const matchPlayers = data?.map((lineup) => lineup.players).filter(Boolean) || []
      setPlayers(matchPlayers as Player[])
      // Initialize ratings for all players
      setRatings(matchPlayers.map((player) => ({ player_id: player.id, rating: 0 })))
    }
  }

  const checkExistingRatings = async () => {
    if (!selectedMatch) return

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from("player_ratings")
      .select("player_id")
      .eq("match_id", selectedMatch.id)
      .eq("rater_id", user.id)

    if (!error && data) {
      setExistingRatings(data.map((rating) => rating.player_id))
    }
  }

  const updateRating = (playerId: string, rating: number) => {
    setRatings((prev) => prev.map((r) => (r.player_id === playerId ? { ...r, rating } : r)))
  }

  const submitRatings = async () => {
    if (!selectedMatch) return

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    setIsSaving(true)

    // Filter out ratings that are 0 (not rated)
    const validRatings = ratings.filter((r) => r.rating > 0)

    if (validRatings.length === 0) {
      toast({
        title: "Error",
        description: "Please rate at least one player",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    // Prepare ratings data
    const ratingsData = validRatings.map((rating) => ({
      match_id: selectedMatch.id,
      player_id: rating.player_id,
      rater_id: user.id,
      rating: rating.rating,
    }))

    // Insert ratings (will handle conflicts with existing ratings)
    const { error } = await supabase.from("player_ratings").upsert(ratingsData, {
      onConflict: "match_id,player_id,rater_id",
    })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit ratings",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Submitted ratings for ${validRatings.length} players`,
      })
      checkExistingRatings()
    }

    setIsSaving(false)
  }

  const renderStarRating = (playerId: string, currentRating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => updateRating(playerId, star)}
            className={`w-6 h-6 ${
              star <= currentRating ? "text-yellow-400" : "text-gray-400"
            } hover:text-yellow-300 transition-colors`}
            disabled={existingRatings.includes(playerId)}
          >
            <Star className="w-full h-full fill-current" />
          </button>
        ))}
        <span className="ml-2 text-sm text-white font-medium">{currentRating > 0 ? currentRating : "-"}</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-green-950 to-black">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-white">Loading matches...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-green-950 to-black">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Rate Players</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto text-pretty">
            Rate your teammates' performance after each match. Your ratings help track player development and
            performance.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Match Selection */}
        <Card className="bg-green-900/20 border-green-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Select Match
            </CardTitle>
            <CardDescription className="text-gray-400">Choose a recent match to rate players</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedMatch?.id || ""}
              onValueChange={(value) => {
                const match = matches.find((m) => m.id === value)
                setSelectedMatch(match || null)
              }}
            >
              <SelectTrigger className="bg-green-900/20 border-green-800 text-white">
                <SelectValue placeholder="Select a match" />
              </SelectTrigger>
              <SelectContent>
                {matches.map((match) => (
                  <SelectItem key={match.id} value={match.id}>
                    <div className="flex items-center space-x-2">
                      <span>
                        Local FC {match.is_home ? match.home_score : match.away_score} -{" "}
                        {match.is_home ? match.away_score : match.home_score} {match.teams?.name}
                      </span>
                      <span className="text-gray-500">({new Date(match.match_date).toLocaleDateString("en-GB")})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedMatch && (
          <>
            {/* Match Info */}
            <Card className="bg-green-900/20 border-green-800 mb-8">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center space-x-8 mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white font-semibold">Local FC</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {selectedMatch.is_home ? selectedMatch.home_score : selectedMatch.away_score} -{" "}
                      {selectedMatch.is_home ? selectedMatch.away_score : selectedMatch.home_score}
                    </div>
                    <Badge
                      className={
                        (selectedMatch.is_home ? selectedMatch.home_score : selectedMatch.away_score) >
                        (selectedMatch.is_home ? selectedMatch.away_score : selectedMatch.home_score)
                          ? "bg-green-600 text-white"
                          : (selectedMatch.is_home ? selectedMatch.home_score : selectedMatch.away_score) <
                              (selectedMatch.is_home ? selectedMatch.away_score : selectedMatch.home_score)
                            ? "bg-red-600 text-white"
                            : "bg-yellow-600 text-white"
                      }
                    >
                      {(selectedMatch.is_home ? selectedMatch.home_score : selectedMatch.away_score) >
                      (selectedMatch.is_home ? selectedMatch.away_score : selectedMatch.home_score)
                        ? "WIN"
                        : (selectedMatch.is_home ? selectedMatch.home_score : selectedMatch.away_score) <
                            (selectedMatch.is_home ? selectedMatch.away_score : selectedMatch.home_score)
                          ? "LOSS"
                          : "DRAW"}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Trophy className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-white font-semibold">{selectedMatch.teams?.name}</p>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-400">
                  {new Date(selectedMatch.match_date).toLocaleDateString("en-GB", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Player Ratings */}
            <Card className="bg-green-900/20 border-green-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Rate Players (1-10 stars)
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Rate each player's performance in this match. You can only rate each player once per match.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {players.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No players found for this match.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {players.map((player) => {
                        const playerRating = ratings.find((r) => r.player_id === player.id)?.rating || 0
                        const alreadyRated = existingRatings.includes(player.id)

                        return (
                          <div
                            key={player.id}
                            className={`p-4 rounded-lg border ${
                              alreadyRated ? "bg-green-900/10 border-green-700" : "bg-green-900/20 border-green-800"
                            }`}
                          >
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="relative">
                                <img
                                  src={player.photo_url || "/placeholder.svg"}
                                  alt={player.name}
                                  className="w-12 h-12 rounded-full object-cover border-2 border-green-600"
                                />
                                <div className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                  {player.jersey_number}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-white font-semibold">{player.name}</h3>
                                <Badge variant="secondary" className="bg-green-700 text-white text-xs">
                                  {player.position}
                                </Badge>
                              </div>
                              {alreadyRated && (
                                <div className="flex items-center text-green-400">
                                  <CheckCircle className="w-5 h-5 mr-1" />
                                  <span className="text-sm">Rated</span>
                                </div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Performance Rating:</span>
                                {alreadyRated && <span className="text-xs text-green-400">Already submitted</span>}
                              </div>
                              {renderStarRating(player.id, playerRating)}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="flex justify-center pt-6">
                      <Button
                        onClick={submitRatings}
                        disabled={isSaving || ratings.every((r) => r.rating === 0)}
                        className="bg-green-700 hover:bg-green-800 px-8"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Submitting..." : "Submit Ratings"}
                      </Button>
                    </div>

                    <div className="text-center text-sm text-gray-400">
                      <p>Rating Scale: 1-4 (Poor), 5-6 (Average), 7-8 (Good), 9-10 (Excellent)</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
