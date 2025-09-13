import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Shield } from "lucide-react"

const players = [
  {
    id: 1,
    name: "John Smith",
    number: 1,
    position: "GK",
    photo: "/goalkeeper.png",
    bio: "Reliable goalkeeper with excellent shot-stopping ability.",
    isCaptain: false,
    isViceCaptain: false,
    stats: { appearances: 14, goals: 0, assists: 0, cleanSheets: 5 },
  },
  {
    id: 2,
    name: "Mike Johnson",
    number: 5,
    position: "CB",
    photo: "/fantasy-knight.png",
    bio: "Strong central defender and team captain.",
    isCaptain: true,
    isViceCaptain: false,
    stats: { appearances: 15, goals: 2, assists: 1, cleanSheets: 5 },
  },
  {
    id: 3,
    name: "David Wilson",
    number: 10,
    position: "CAM",
    photo: "/placeholder-rh04c.png",
    bio: "Creative midfielder with excellent passing range.",
    isCaptain: false,
    isViceCaptain: true,
    stats: { appearances: 14, goals: 5, assists: 7, cleanSheets: 0 },
  },
  {
    id: 4,
    name: "Chris Brown",
    number: 9,
    position: "ST",
    photo: "/placeholder-wsbwn.png",
    bio: "Clinical striker with a keen eye for goal.",
    isCaptain: false,
    isViceCaptain: false,
    stats: { appearances: 13, goals: 8, assists: 2, cleanSheets: 0 },
  },
  {
    id: 5,
    name: "Alex Davis",
    number: 7,
    position: "RW",
    photo: "/placeholder-b7dl8.png",
    bio: "Pacey winger who loves to take on defenders.",
    isCaptain: false,
    isViceCaptain: false,
    stats: { appearances: 12, goals: 3, assists: 4, cleanSheets: 0 },
  },
]

const staff = [
  {
    id: 1,
    name: "Robert Martinez",
    role: "Manager",
    photo: "/diverse-team-manager.png",
    bio: "Experienced manager with a passion for developing young talent.",
  },
  {
    id: 2,
    name: "Sarah Thompson",
    role: "Assistant Manager",
    photo: "/placeholder-4s7km.png",
    bio: "Former professional player turned coach.",
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-galacticos-black via-galacticos-black/90 to-galacticos-black">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Team & Staff</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto text-pretty">
            Meet the players and staff who make Galacticos FC a force to be reckoned with on and off the pitch.
          </p>
        </div>
      </section>

      {/* Players Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-12">
            <Users className="w-8 h-8 text-galacticos-gold mr-3" />
            <h2 className="text-3xl font-bold text-white">Players</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {players.map((player) => (
              <Card
                key={player.id}
                className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm hover:bg-galacticos-gold/20 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="relative mb-4">
                      <img
                        src={player.photo || "/placeholder.svg"}
                        alt={player.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-galacticos-gold"
                      />
                      <div className="absolute -top-2 -right-2 bg-galacticos-gold text-galacticos-black text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                        {player.number}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-1">{player.name}</h3>

                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <Badge variant="secondary" className="bg-galacticos-gold text-galacticos-black">
                        {player.position}
                      </Badge>
                      {player.isCaptain && (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                          C
                        </Badge>
                      )}
                      {player.isViceCaptain && (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                          VC
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-400 mb-4 text-pretty">{player.bio}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-galacticos-black/30 rounded p-2">
                        <div className="text-galacticos-gold font-semibold">{player.stats.appearances}</div>
                        <div className="text-gray-400">Apps</div>
                      </div>
                      <div className="bg-galacticos-black/30 rounded p-2">
                        <div className="text-galacticos-gold font-semibold">{player.stats.goals}</div>
                        <div className="text-gray-400">Goals</div>
                      </div>
                      <div className="bg-galacticos-black/30 rounded p-2">
                        <div className="text-galacticos-gold font-semibold">{player.stats.assists}</div>
                        <div className="text-gray-400">Assists</div>
                      </div>
                      <div className="bg-galacticos-black/30 rounded p-2">
                        <div className="text-galacticos-gold font-semibold">{player.stats.cleanSheets}</div>
                        <div className="text-gray-400">CS</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-galacticos-black/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-12">
            <Shield className="w-8 h-8 text-galacticos-gold mr-3" />
            <h2 className="text-3xl font-bold text-white">Coaching Staff</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {staff.map((member) => (
              <Card key={member.id} className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <img
                    src={member.photo || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-2 border-galacticos-gold"
                  />
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <Badge className="bg-galacticos-gold text-galacticos-black mb-4">{member.role}</Badge>
                  <p className="text-sm text-gray-400 text-pretty">{member.bio}</p>
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
