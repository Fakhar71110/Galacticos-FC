"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Trophy, Users, Calendar, BarChart3, Camera, Info, Phone, User, Star } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Trophy },
  { name: "Team & Staff", href: "/team", icon: Users },
  { name: "Matches", href: "/matches", icon: Calendar },
  { name: "Stats & Records", href: "/stats", icon: BarChart3 },
  { name: "Gallery", href: "/gallery", icon: Camera },
  { name: "Club Info", href: "/club", icon: Info },
  { name: "News", href: "/news", icon: Info },
  { name: "Contact", href: "/contact", icon: Phone },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-galacticos-gold/20 bg-galacticos-black/95 backdrop-blur supports-[backdrop-filter]:bg-galacticos-black/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 relative">
              <Image
                src="/galacticos-logo.png"
                alt="Galacticos FC Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">Galacticos FC</h1>
              <p className="text-xs text-galacticos-gold">Unity, Passion, Victory</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-galacticos-gold hover:bg-galacticos-gold/10 rounded-md transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Admin Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-galacticos-gold text-galacticos-gold hover:bg-galacticos-gold/10 bg-transparent"
            >
              <Link href="/rate-players">
                <Star className="w-4 h-4 mr-2" />
                Player Login
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-galacticos-gold text-galacticos-gold hover:bg-galacticos-gold/10 bg-transparent"
            >
              <Link href="/auth/login">
                <User className="w-4 h-4 mr-2" />
                Admin Login
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="text-white">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-galacticos-black border-galacticos-gold">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-galacticos-gold hover:bg-galacticos-gold/10 rounded-md transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
                <div className="pt-4 border-t border-galacticos-gold space-y-2">
                  <Button
                    asChild
                    className="w-full bg-galacticos-gold hover:bg-galacticos-dark-gold text-galacticos-black"
                  >
                    <Link href="/rate-players" onClick={() => setIsOpen(false)}>
                      <Star className="w-4 h-4 mr-2" />
                      Player Login
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-galacticos-gold hover:bg-galacticos-dark-gold text-galacticos-black"
                  >
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      Admin Login
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
