import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Shield, Users, TrendingUp, Award } from "lucide-react"

const seasonStats = {
  overall: {
    matchesPlayed: 15,
    wins: 8,
    draws: 4,
    losses: 3,
    goalsFor: 23,
    goalsAgainst: 15,
    goalDifference: 8,
    points: 28,
    position: 6,
  },
  topScorers: [
    { name: "Chris Brown", goals: 8, assists: 2, appearances: 13 },
    { name: "David Wilson", goals: 5, assists: 7, appearances: 14 },
    { name: "Alex Davis", goals: 3, assists: 4, appearances: 12 },
    { name: "Mike Johnson", goals: 2, assists: 1, appearances: 15 },
  ],
  topAssists: [
    { name: "David Wilson", assists: 7, goals: 5, appearances: 14 },
    { name: "Alex Davis", assists: 4, goals: 3, appearances: 12 },
    { name: "Chris Brown", assists: 2, goals: 8, appearances: 13 },
    { name: "Mike Johnson", assists: 1, goals: 2, appearances: 15 },
  ],
  cleanSheets: [
    { name: "John Smith", cleanSheets: 5, appearances: 14, position: "GK" },
    { name: "Mike Johnson", cleanSheets: 5, appearances: 15, position: "CB" },
  ],
}

const recentForm = ["W", "D", "W", "L", "W"]

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-galacticos-black via-galacticos-black/90 to-galacticos-black">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Season Statistics</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto text-pretty">
            Track Galacticos FC's performance throughout the 2024/25 season with detailed statistics and player data.
          </p>
        </div>
      </section>

      {/* Season Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-12">
            <Trophy className="w-8 h-8 text-galacticos-gold mr-3" />
            <h2 className="text-3xl font-bold text-white">Season Overview</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-galacticos-gold mb-2">{seasonStats.overall.position}</div>
                <p className="text-sm text-gray-400">League Position</p>
              </CardContent>
            </Card>

            <Card className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-galacticos-gold mb-2">{seasonStats.overall.points}</div>
                <p className="text-sm text-gray-400">Points</p>
              </CardContent>
            </Card>

            <Card className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-galacticos-gold mb-2">{seasonStats.overall.goalsFor}</div>
                <p className="text-sm text-gray-400">Goals Scored</p>
              </CardContent>
            </Card>

            <Card className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-galacticos-gold mb-2">
                  {seasonStats.overall.goalDifference > 0 ? "+" : ""}
                  {seasonStats.overall.goalDifference}
                </div>
                <p className="text-sm text-gray-400">Goal Difference</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Match Record */}
            <Card className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Match Record</CardTitle>
                <CardDescription className="text-gray-400">2024/25 Season Performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-galacticos-gold">{seasonStats.overall.matchesPlayed}</div>
                    <p className="text-xs text-gray-400">Played</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">{seasonStats.overall.wins}</div>
                    <p className="text-xs text-gray-400">Won</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">{seasonStats.overall.draws}</div>
                    <p className="text-xs text-gray-400">Drawn</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-400">{seasonStats.overall.losses}</div>
                    <p className="text-xs text-gray-400">Lost</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Form */}
            <Card className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 text-galacticos-gold mr-2" />
                  Recent Form
                </CardTitle>
                <CardDescription className="text-gray-400">Last 5 matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-2">
                  {recentForm.map((result, index) => (
                    <div
                      key={index}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        result === "W"
                          ? "bg-green-600 text-white"
                          : result === "D"
                            ? "bg-yellow-600 text-white"
                            : "bg-red-600 text-white"
                      }`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-4">Most recent on the right</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Player Statistics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-galacticos-black/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-12">
            <Users className="w-8 h-8 text-galacticos-gold mr-3" />
            <h2 className="text-3xl font-bold text-white">Player Statistics</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Scorers */}
            <Card className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 text-galacticos-gold mr-2" />
                  Top Scorers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {seasonStats.topScorers.map((player, index) => (
                  <div key={player.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-galacticos-gold text-galacticos-black rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-white font-medium">{player.name}</p>
                        <p className="text-xs text-gray-400">{player.appearances} apps</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-galacticos-gold font-bold">{player.goals}</p>
                      <p className="text-xs text-gray-400">goals</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Assists */}
            <Card className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 text-galacticos-gold mr-2" />
                  Top Assists
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {seasonStats.topAssists.map((player, index) => (
                  <div key={player.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-galacticos-gold text-galacticos-black rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-white font-medium">{player.name}</p>
                        <p className="text-xs text-gray-400">{player.appearances} apps</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-galacticos-gold font-bold">{player.assists}</p>
                      <p className="text-xs text-gray-400">assists</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Clean Sheets */}
            <Card className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 text-galacticos-gold mr-2" />
                  Clean Sheets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {seasonStats.cleanSheets.map((player, index) => (
                  <div key={player.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-galacticos-gold text-galacticos-black rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-white font-medium">{player.name}</p>
                        <p className="text-xs text-gray-400">
                          {player.position} • {player.appearances} apps
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-galacticos-gold font-bold">{player.cleanSheets}</p>
                      <p className="text-xs text-gray-400">clean sheets</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
