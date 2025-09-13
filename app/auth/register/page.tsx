"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState("fan")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/success`,
          data: {
            full_name: fullName,
            role: role,
          },
        },
      })
      if (error) throw error
      router.push("/auth/success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-galacticos-black via-galacticos-black/90 to-galacticos-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="bg-white/95 backdrop-blur-sm border-galacticos-gold/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-galacticos-black">Join Galacticos FC</CardTitle>
            <CardDescription className="text-galacticos-black/70">Create your account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-galacticos-black">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Smith"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border-galacticos-gold/30 focus:border-galacticos-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-galacticos-black">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-galacticos-gold/30 focus:border-galacticos-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-galacticos-black">
                  Role
                </Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="border-galacticos-gold/30 focus:border-galacticos-gold">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fan">Fan</SelectItem>
                    <SelectItem value="player">Player</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-galacticos-black">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-galacticos-gold/30 focus:border-galacticos-gold"
                />
              </div>
              {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}
              <Button
                type="submit"
                className="w-full bg-galacticos-gold hover:bg-galacticos-dark-gold text-galacticos-black"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-galacticos-black/70">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-galacticos-gold hover:text-galacticos-dark-gold underline"
              >
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
