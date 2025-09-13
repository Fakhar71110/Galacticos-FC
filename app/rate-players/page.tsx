import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PlayerRatingSystem } from "@/components/player-rating-system"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Lock } from "lucide-react"
import Link from "next/link"

export default async function RatePlayersPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, authorized_for_ratings")
    .eq("id", data.user.id)
    .single()

  if (!profile || !["player", "admin"].includes(profile.role)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-green-950 to-black flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto bg-red-900/20 border-red-800">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-white">Access Denied</CardTitle>
            <CardDescription className="text-gray-400">
              You need to be a registered player to access this feature
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-gray-300">
              Only players authorized by the admin can rate teammates after matches.
            </p>
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (profile.role === "player" && !profile.authorized_for_ratings) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-green-950 to-black flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto bg-yellow-900/20 border-yellow-800">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-white">Authorization Required</CardTitle>
            <CardDescription className="text-gray-400">You need admin authorization to rate players</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-gray-300">
              Please contact the admin to get authorized for player ratings after matches.
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/contact">Contact Admin</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-green-600 text-green-400 hover:bg-green-900/20 bg-transparent"
              >
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <PlayerRatingSystem />
}
