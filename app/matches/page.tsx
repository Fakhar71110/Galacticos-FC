import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Trophy, Target } from "lucide-react"
import Link from "next/link"

const upcomingMatches = [
  {
    id: 1,
    opponent: "City Rovers",
    date: "2024-12-21",
    time: "15:00",
    venue: "Community Stadium",
    isHome: true,
    competition: "Premier League",
  },
  {
    id: 2,
    opponent: "Athletic Club",
    date: "2024-12-28",
    time: "14:30",
    venue: "Athletic Ground",
    isHome: false,
    competition: "Premier League",
  },
  {
    id: 3,
    opponent: "Town FC",
    date: "2025-01-04",
    time: "15:00",
    venue: "Community Stadium",
    isHome: true,
    competition: "FA Cup",
  },
]

const recentMatches = [
  {
    id: 1,
    opponent: "United FC",
    date: "2024-12-14",
    homeScore: 2,
    awayScore: 1,
    isHome: true,
    result: "W",
    competition: "Premier League",
    venue: "Community Stadium",
  },
  {
    id: 2,
    opponent: "Rangers FC",
    date: "2024-12-07",
    homeScore: 1,
    awayScore: 1,
    isHome: false,
    result: "D",
    competition: "Premier League",
    venue: "Rangers Park",
  },
  {
    id: 3,
    opponent: "City Rovers",
    date: "2024-11-30",
    homeScore: 3,
    awayScore: 0,
    isHome: true,
    result: "W",
    competition: "Premier League",
    venue: "Community Stadium",
  },
]

export default function MatchesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-galacticos-black via-galacticos-black/90 to-galacticos-black">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Fixtures & Results</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto text-pretty">
            Follow our journey through the season with upcoming fixtures and recent match results.
          </p>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-12">
            <Calendar className="w-8 h-8 text-galacticos-gold mr-3" />
            <h2 className="text-3xl font-bold text-white">Upcoming Fixtures</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcomingMatches.map((match) => (
              <Card key={match.id} className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-galacticos-gold text-galacticos-black">
                      {match.competition}
                    </Badge>
                    <Badge variant="outline" className="border-galacticos-gold text-galacticos-gold">
                      {match.isHome ? "HOME" : "AWAY"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center space-x-6">
                    <div className="text-center">
                      <div className="w-12 h-12 relative mx-auto mb-2">
                        <img src="/galacticos-logo.png" alt="Galacticos FC" className="w-full h-full object-contain" />
                      </div>
                      <p className="text-sm font-semibold text-white">Galacticos FC</p>
                    </div>
                    <div className="text-xl font-bold text-galacticos-gold">VS</div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Trophy className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-sm font-semibold text-white">{match.opponent}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center justify-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(match.date).toLocaleDateString("en-GB", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{match.time}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{match.venue}</span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-galacticos-gold hover:bg-galacticos-dark-gold text-galacticos-black"
                  >
                    <Link href={`/matches/${match.id}`}>Match Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-galacticos-black/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-12">
            <Target className="w-8 h-8 text-galacticos-gold mr-3" />
            <h2 className="text-3xl font-bold text-white">Recent Results</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentMatches.map((match) => (
              <Card key={match.id} className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-galacticos-gold text-galacticos-black">
                      {match.competition}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`${
                        match.result === "W"
                          ? "border-galacticos-gold text-galacticos-gold"
                          : match.result === "D"
                            ? "border-yellow-500 text-yellow-400"
                            : "border-red-500 text-red-400"
                      }`}
                    >
                      {match.result === "W" ? "WIN" : match.result === "D" ? "DRAW" : "LOSS"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center space-x-6">
                    <div className="text-center">
                      <div className="w-12 h-12 relative mx-auto mb-2">
                        <img src="/galacticos-logo.png" alt="Galacticos FC" className="w-full h-full object-contain" />
                      </div>
                      <p className="text-sm font-semibold text-white">Galacticos FC</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        {match.isHome ? match.homeScore : match.awayScore} -{" "}
                        {match.isHome ? match.awayScore : match.homeScore}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Trophy className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-sm font-semibold text-white">{match.opponent}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-300 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(match.date).toLocaleDateString("en-GB")}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{match.venue}</span>
                    </div>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-galacticos-gold text-galacticos-gold hover:bg-galacticos-gold/10 bg-transparent"
                  >
                    <Link href={`/matches/${match.id}`}>Match Report</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
