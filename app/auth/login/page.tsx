"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Info, Trophy } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", (await supabase.auth.getUser()).data.user?.id)
        .single()

      if (profile?.role === "admin") {
        router.push("/admin")
      } else if (profile?.role === "player") {
        router.push("/rate-players")
      } else {
        router.push("/")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-galacticos-black via-galacticos-black/90 to-galacticos-black flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <Alert className="bg-galacticos-gold/10 border-galacticos-gold text-white">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Note:</strong> All website content (team info, matches, stats, gallery) is publicly accessible.
            Login is only required for admins to manage content or authorized players to rate teammates.
          </AlertDescription>
        </Alert>

        <Card className="bg-white/95 backdrop-blur-sm border-galacticos-gold/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-galacticos-gold to-galacticos-dark-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-galacticos-black" />
            </div>
            <CardTitle className="text-2xl font-bold text-galacticos-black">Galacticos FC Login</CardTitle>
            <CardDescription className="text-galacticos-black/70">Admin & Player Access Portal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-galacticos-black">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-galacticos-gold/30 focus:border-galacticos-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-galacticos-black">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-galacticos-gold/30 focus:border-galacticos-gold"
                />
              </div>
              {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}
              <Button
                type="submit"
                className="w-full bg-galacticos-gold hover:bg-galacticos-dark-gold text-galacticos-black"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center text-sm text-galacticos-black/70">
                Need an account?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-galacticos-gold hover:text-galacticos-dark-gold underline"
                >
                  Register here
                </Link>
              </div>

              <div className="text-xs text-galacticos-black/60 bg-galacticos-gold/10 p-3 rounded-md">
                <strong>Registration Info:</strong>
                <br />• <strong>Admin:</strong> Full website management access
                <br />• <strong>Player:</strong> Rate teammates after matches (requires admin authorization)
                <br />• <strong>Fan:</strong> Join community discussions and updates
              </div>

              <div className="text-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-galacticos-gold text-galacticos-gold hover:bg-galacticos-gold/10 bg-transparent"
                >
                  <Link href="/">← Back to Website</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
