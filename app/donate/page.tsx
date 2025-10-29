import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"

export default function DonatePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Support Our Mission</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Your donation helps bright but needy students achieve their educational dreams and build a better future.
          </p>
        </div>
      </section>

      {/* Donation Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Donation Details</h2>
            <div className="rounded-lg bg-gray-50 p-8 shadow-md">
              <p className="mb-6 text-lg">
                Presently (2025), there are 5 students we are supporting through the programme and we are seeking to
                fundraise for 2 more. We have a need of at least KES 200,000 ($ 1500) per annum to keep the students in
                school.
              </p>

              <h3 className="mb-4 text-xl font-semibold">How Your Donation Helps</h3>
              <ul className="mb-6 list-inside list-disc space-y-2">
                <li>School fees and educational supplies</li>
                <li>Mentorship programs and resources</li>
                <li>Support for academic excellence</li>
                <li>Creating opportunities for bright but needy students</li>
              </ul>

              <div className="mb-8 rounded-lg bg-blue-50 p-6">
                <h3 className="mb-4 text-xl font-semibold text-blue-700">Donation Methods</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">M-PESA:</p>
                    <p>+254 729 563 362</p>
                  </div>
                  <div>
                    <p className="font-medium">Email for Bank Details:</p>
                    <a
                      href="mailto:fmwazighe@gmail.com"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <Mail className="h-4 w-4" /> fmwazighe@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="font-medium">For Inquiries:</p>
                    <a href="tel:+254729001122" className="flex items-center gap-2 text-blue-600 hover:underline">
                      <Phone className="h-4 w-4" /> +254 729 563 362
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="mb-4 text-lg font-medium">Ready to make a difference?</p>
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Contact Us to Donate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Your Impact in Action</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-3 text-xl font-bold">Education</h3>
              <p>
                Your donation helps cover school fees, books, and educational materials for bright students who would
                otherwise miss out on education.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-3 text-xl font-bold">Mentorship</h3>
              <p>
                We provide Christian and life mentorship to help students develop character, leadership skills, and a
                vision for their future.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-3 text-xl font-bold">Community</h3>
              <p>
                By supporting one student, you help transform a family and community as these students become agents of
                positive change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Join Us in Making a Difference</h2>
          <p className="mx-auto mb-8 max-w-2xl">
            Whether through financial support, volunteering, or spreading the word, your contribution matters. Together,
            we can help more students achieve their dreams.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-600">
                Contact Us
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-600">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
