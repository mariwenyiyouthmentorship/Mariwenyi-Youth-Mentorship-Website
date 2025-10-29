import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-r from-orange-100 to-red-100"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 text-gray-800">
        <div className="grid gap-12 md:grid-cols-3">
          {/* About Us Summary */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/MYM_logo.png"
                alt="Mariwenyi Youth Mentorship Logo"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <h3 className="text-2xl font-bold text-gray-900">About Us</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Mariwenyi Youth Mentorship was started in 2020 as a vision by Dr. Fredrick M. Mwazighe from Mariwenyi,
              being a needy student himself, sought to give back and help needy students from his village.
            </p>
          </div>

          {/* Easy Navigation */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Navigation</h3>
            <ul className="space-y-4 text-gray-700">
              <li>
                <Link href="/" className="hover:text-orange-600 transition-colors duration-300 text-lg font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="hover:text-orange-600 transition-colors duration-300 text-lg font-medium"
                >
                  The Bursary Programme
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="hover:text-orange-600 transition-colors duration-300 text-lg font-medium"
                >
                  Donate
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-orange-600 transition-colors duration-300 text-lg font-medium"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Contact Us</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-orange-600" />
                </div>
                <a
                  href="mailto:mariwenyiyouthmentorship@gmail.com"
                  className="hover:text-orange-600 transition-colors duration-300 text-lg"
                >
                  mariwenyiyouthmentorship@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-orange-600" />
                </div>
                <a href="tel:+254729563362" className="hover:text-orange-600 transition-colors duration-300 text-lg">
                  +254 729 563 362
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-lg">Mariwenyi Village, Voi, Kenya</span>
              </li>
            </ul>
            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-300 pt-8 text-center text-gray-600">
          <p className="text-lg">&copy; {new Date().getFullYear()} Mariwenyi Youth Mentorship. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
