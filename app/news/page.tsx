import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const newsArticles = [
  {
    id: 1,
    title: "Galacticos FC Secure Thrilling 2-1 Victory Over United FC",
    excerpt:
      "A dramatic comeback in the second half saw Galacticos FC claim all three points in front of a packed Royal Stadium.",
    content: "Chris Brown and David Wilson were the heroes as Galacticos FC mounted a stunning comeback...",
    author: "Sports Reporter",
    date: "2024-12-15",
    category: "Match Report",
    featured: true,
    image: "/football-match-celebration.jpg",
  },
  {
    id: 2,
    title: "New Signing: Midfielder Alex Rodriguez Joins Galacticos FC",
    excerpt:
      "The club announces the signing of promising midfielder Alex Rodriguez from Championship side City United.",
    content: "Galacticos FC are delighted to announce the signing of midfielder Alex Rodriguez...",
    author: "Club Reporter",
    date: "2024-12-12",
    category: "Transfer News",
    featured: false,
    image: "/football-player-signing-contract.jpg",
  },
  {
    id: 3,
    title: "Youth Academy Success: Three Players Called Up to National Team",
    excerpt:
      "Galacticos FC's youth development continues to bear fruit with three academy graduates receiving international recognition.",
    content: "The club's commitment to youth development has been rewarded with three academy players...",
    author: "Academy Reporter",
    date: "2024-12-10",
    category: "Academy News",
    featured: false,
    image: "/young-football-players-training.jpg",
  },
  {
    id: 4,
    title: "Community Outreach: Players Visit Local Schools",
    excerpt: "First team players spent the morning inspiring young students at three local primary schools.",
    content: "As part of our ongoing community commitment, several first team players visited...",
    author: "Community Team",
    date: "2024-12-08",
    category: "Community",
    featured: false,
    image: "/football-players-with-school-children.jpg",
  },
  {
    id: 5,
    title: "Stadium Renovation Update: New Training Facilities Unveiled",
    excerpt:
      "The club reveals plans for state-of-the-art training facilities as part of the ongoing stadium development project.",
    content: "Galacticos FC today unveiled exciting plans for new training facilities...",
    author: "Club News",
    date: "2024-12-05",
    category: "Club News",
    featured: false,
    image: "/modern-football-training-facility.jpg",
  },
]

const categories = ["All", "Match Report", "Transfer News", "Academy News", "Community", "Club News"]

export default function NewsPage() {
  const featuredArticle = newsArticles.find((article) => article.featured)
  const regularArticles = newsArticles.filter((article) => !article.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-galacticos-black via-galacticos-black/90 to-galacticos-black">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Latest News</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto text-pretty">
            Stay up to date with all the latest news, match reports, and updates from Galacticos FC.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <Card className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative aspect-video lg:aspect-auto">
                  <Image
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-galacticos-gold text-galacticos-black">Featured</Badge>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge variant="outline" className="border-galacticos-gold text-galacticos-gold w-fit mb-4">
                    {featuredArticle.category}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-balance">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-400 mb-6 text-pretty">{featuredArticle.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <User className="w-4 h-4 mr-1" />
                    <span className="mr-4">{featuredArticle.author}</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(featuredArticle.date).toLocaleDateString("en-GB")}</span>
                  </div>
                  <Button
                    asChild
                    className="bg-galacticos-gold hover:bg-galacticos-dark-gold text-galacticos-black w-fit"
                  >
                    <Link href={`/news/${featuredArticle.id}`}>
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

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

      {/* News Articles Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <Card
                key={article.id}
                className="bg-galacticos-gold/10 border-galacticos-gold backdrop-blur-sm overflow-hidden group hover:bg-galacticos-gold/20 transition-colors"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-galacticos-gold text-galacticos-black">
                      {article.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 text-balance line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 text-pretty line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <User className="w-3 h-3 mr-1" />
                    <span className="mr-3">{article.author}</span>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{new Date(article.date).toLocaleDateString("en-GB")}</span>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-galacticos-gold text-galacticos-gold hover:bg-galacticos-gold/10 bg-transparent"
                  >
                    <Link href={`/news/${article.id}`}>
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Load More Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <Button
            variant="outline"
            className="border-galacticos-gold text-galacticos-gold hover:bg-galacticos-gold/10 bg-transparent"
          >
            Load More Articles
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
