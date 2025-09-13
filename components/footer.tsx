import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-galacticos-black border-t border-galacticos-gold/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative">
                <Image
                  src="/galacticos-logo.png"
                  alt="Galacticos FC Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Galacticos FC</h3>
                <p className="text-xs text-galacticos-gold">Unity, Passion, Victory</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              A royal football club dedicated to excellence on and off the pitch, bringing together passion, skill, and
              community spirit.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-galacticos-gold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/team" className="text-sm text-gray-400 hover:text-galacticos-gold transition-colors">
                  Team & Staff
                </Link>
              </li>
              <li>
                <Link href="/matches" className="text-sm text-gray-400 hover:text-galacticos-gold transition-colors">
                  Fixtures & Results
                </Link>
              </li>
              <li>
                <Link href="/stats" className="text-sm text-gray-400 hover:text-galacticos-gold transition-colors">
                  Stats & Records
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm text-gray-400 hover:text-galacticos-gold transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Club Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-galacticos-gold uppercase tracking-wider">Club Info</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/news" className="text-sm text-gray-400 hover:text-galacticos-gold transition-colors">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-galacticos-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/rate-players"
                  className="text-sm text-gray-400 hover:text-galacticos-gold transition-colors"
                >
                  Player Ratings
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-sm text-gray-400 hover:text-galacticos-gold transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-galacticos-gold uppercase tracking-wider">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-galacticos-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-galacticos-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-galacticos-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-galacticos-gold transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="pt-4">
              <p className="text-xs text-gray-500">
                Royal Stadium
                <br />
                123 Champions Way
                <br />
                Football City, FC 12345
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-galacticos-gold/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2024 Galacticos FC. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-galacticos-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-galacticos-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
