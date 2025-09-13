import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Calendar } from "lucide-react"
import Image from "next/image"

const galleryItems = [
  {
    id: 1,
    title: "Victory Celebration",
    description: "Team celebrating after the 2-1 win against United FC",
    image: "/football-team-celebrating-victory.jpg",
    date: "2024-12-14",
    category: "Match Day",
  },
  {
    id: 2,
    title: "Training Session",
    description: "Players during intensive training at Royal Stadium",
    image: "/football-training.png",
    date: "2024-12-10",
    category: "Training",
  },
  {
    id: 3,
    title: "Team Photo 2024/25",
    description: "Official team photo for the 2024/25 season",
    image: "/football-team-official-photo.jpg",
    date: "2024-08-15",
    category: "Official",
  },
  {
    id: 4,
    title: "Stadium Atmosphere",
    description: "Fans supporting the team during home match",
    image: "/football-stadium-crowd.png",
    date: "2024-12-07",
    category: "Fans",
  },
  {
    id: 5,
    title: "Youth Academy",
    description: "Young players training with the academy coaches",
    image: "/youth-football-training.jpg",
    date: "2024-11-28",
    category: "Academy",
  },
  {
    id: 6,
    title: "Community Event",
    description: "Players visiting local schools for community outreach",
    image: "/football-players-community-event.jpg",
    date: "2024-11-20",
    category: "Community",
  },
]

const categories = ["All", "Match Day", "Training", "Official", "Fans", "Academy", "Community"]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-galacticos-black via-galacticos-black/90 to-galacticos-black">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Gallery</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto text-pretty">
            Capture the moments that define Galacticos FC - from match day victories to community events.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  category === "All"
                    ? "bg-galacticos-gold text-galacticos-black hover:bg-galacticos-dark-gold"
                    : "border-galacticos-gold text-galacticos-gold hover:bg-galacticos-gold/10"
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <Card
                key={item.id}
                className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm overflow-hidden group hover:bg-galacticos-gold/20 transition-colors"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-galacticos-gold text-galacticos-black">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 mb-3 text-pretty">{item.description}</p>
                  <div className="flex items-center text-xs text-galacticos-gold">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Load More Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Camera className="w-6 h-6 text-galacticos-gold mr-2" />
            <p className="text-gray-400">More photos coming soon!</p>
          </div>
          <p className="text-sm text-gray-500">
            Follow us on social media for the latest photos and behind-the-scenes content.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
