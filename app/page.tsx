import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Trophy, Target, Award, Users, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-galacticos-black via-galacticos-black/90 to-galacticos-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <Image
                src="/galacticos-logo.png"
                alt="Galacticos FC Logo"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
              Welcome to <span className="text-galacticos-gold">Galacticos FC</span>
            </h1>
            <p className="text-xl md:text-2xl text-galacticos-gold mb-8 text-balance">Unity, Passion, Victory</p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto text-pretty">
              Experience the passion of elite football. Follow our journey, support our players, and be part of our
              royal community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-galacticos-gold hover:bg-galacticos-dark-gold text-galacticos-black"
              >
                <Link href="/matches">View Fixtures</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-galacticos-gold text-galacticos-gold hover:bg-galacticos-gold/10 bg-transparent"
              >
                <Link href="/team">Meet the Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Next Match Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Next Match</h2>
            <p className="text-gray-400">Don't miss our upcoming fixture</p>
          </div>

          <Card className="max-w-2xl mx-auto bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-8 mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 relative mx-auto mb-2">
                    <Image
                      src="/galacticos-logo.png"
                      alt="Galacticos FC"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-white font-semibold">Galacticos FC</p>
                </div>
                <div className="text-2xl font-bold text-galacticos-gold">VS</div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-white font-semibold">City Rovers</p>
                </div>
              </div>
              <CardTitle className="text-white">Premier League</CardTitle>
              <CardDescription className="text-gray-400">Matchday 15</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Saturday, Dec 21, 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>3:00 PM</span>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Royal Stadium (Home)</span>
              </div>
              <div className="text-center pt-4">
                <Button asChild className="bg-galacticos-gold hover:bg-galacticos-dark-gold text-galacticos-black">
                  <Link href="/matches">View Match Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Last Match Result */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-galacticos-black/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Last Match Result</h2>
            <p className="text-gray-400">Our latest performance</p>
          </div>

          <Card className="max-w-2xl mx-auto bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-8 mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 relative mx-auto mb-2">
                    <Image
                      src="/galacticos-logo.png"
                      alt="Galacticos FC"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-white font-semibold">Galacticos FC</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-galacticos-gold mb-2">2 - 1</div>
                  <Badge variant="secondary" className="bg-galacticos-gold text-galacticos-black">
                    WIN
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-white font-semibold">United FC</p>
                </div>
              </div>
              <CardTitle className="text-white">Premier League</CardTitle>
              <CardDescription className="text-gray-400">December 14, 2024 • Royal Stadium</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-sm text-gray-300 mb-4">
                  A thrilling comeback victory with goals from Chris Brown and David Wilson securing all three points.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-galacticos-gold text-galacticos-gold hover:bg-galacticos-gold/10 bg-transparent"
                >
                  <Link href="/matches">View Match Report</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Season Highlights</h2>
            <p className="text-gray-400">Key stats from the 2024-25 season</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <Target className="w-8 h-8 text-galacticos-gold mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">23</div>
                <p className="text-sm text-gray-400">Goals Scored</p>
                <p className="text-xs text-galacticos-gold mt-1">Top Scorer: Chris Brown (8)</p>
              </CardContent>
            </Card>

            <Card className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <Award className="w-8 h-8 text-galacticos-gold mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">5</div>
                <p className="text-sm text-gray-400">Clean Sheets</p>
                <p className="text-xs text-galacticos-gold mt-1">John Smith (GK)</p>
              </CardContent>
            </Card>

            <Card className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <Trophy className="w-8 h-8 text-galacticos-gold mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">3</div>
                <p className="text-sm text-gray-400">MOTM Awards</p>
                <p className="text-xs text-galacticos-gold mt-1">Mike Johnson (C)</p>
              </CardContent>
            </Card>

            <Card className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 text-galacticos-gold mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">8.2</div>
                <p className="text-sm text-gray-400">Avg Rating</p>
                <p className="text-xs text-galacticos-gold mt-1">Player of Month: David Wilson</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-galacticos">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Royal Community</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty">
            Follow Galacticos FC's journey, view match results, player stats, and stay connected with our elite football
            community. All content is freely accessible to supporters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-galacticos-black hover:bg-gray-100">
              <Link href="/team">Meet the Team</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
