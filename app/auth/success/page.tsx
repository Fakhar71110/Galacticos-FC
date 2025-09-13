import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-galacticos-black via-galacticos-black/90 to-galacticos-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="bg-white/95 backdrop-blur-sm border-galacticos-gold/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-galacticos-gold/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-galacticos-gold" />
            </div>
            <CardTitle className="text-2xl font-bold text-galacticos-black">Welcome to Galacticos FC!</CardTitle>
            <CardDescription className="text-galacticos-black/70">
              Please check your email to verify your account
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-galacticos-black/70">
              We've sent you a verification email. Please click the link in the email to activate your account.
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full bg-galacticos-gold hover:bg-galacticos-dark-gold text-galacticos-black">
                <Link href="/">Return to Home</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-galacticos-gold text-galacticos-gold hover:bg-galacticos-gold/10 bg-transparent"
              >
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
