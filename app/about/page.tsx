import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import PartnersSlideshow from "@/components/partners-slideshow"

export default function AboutPage() {
    // Define partners data
  const partners = [
    {
      id: 1,
      name: "YONEP Youth Networking Program",
      logo: "/YONEP_vector_logo.png",
      description: "Supporting youth development initiatives",
    },
    {
      id: 2,
      name: "Grace Church Mbambarenyi",
      logo: "/imgs/grace_church.png",
      description: "Grace Church Mbambarenyi",
    },
    {
      id: 3,
      name: "ACK St. Titus Mariwenyi",
      logo: "/imgs/ack-st.titus.png",
      description: "ACK St. Titus Mariwenyi",
    },
    {
      id: 4,
      name: "PEFA Mariwenyi",
      logo: "/imgs/pefa_mariwenyi.png",
      description: "PEFA Mariwenyi Church",
    },
  ]
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">About Us</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Learn about our mission, vision, and the impact we're making in the lives of bright but needy students.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center">
<div>
  <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
  <p className="mb-4" style={{ textAlign: 'justify' }}>
    The Mariwenyi Youth Mentorship programme began in 2020 with the aim of imparting godly values and soft
    skills to young people in Mariwenyi village in Taita Taveta County, Kenya. It began as a one-off event
    which was held on December 26, 2020, with the theme, “Finishing Strong.” The first event was held in
    partnership with the local churches: PEFA Mariwenyi, ACK St. Titus Mariwenyi, and Grace Ministries
    Mbambarenyi. Since 2023, the event has been held every April and has expanded to include other
    surrounding villages.
  </p>
 <p className="mb-4" style={{ textAlign: 'justify' }}>
    From 2023, a great need to support the youth being mentored came to light: a good number needed
    financial support to stay in school, which was important for their future. A group of friends who were
    part of the 2023 mentorship team came together to fundraise to keep bright and needy students in school.
  </p>
  <p className="mb-4" style={{ textAlign: 'justify' }}>
    Every year, the programme raises over KES 200,000 for the financial support and about KES 150,000 for
    the Youth Event. New partners and well-wishers are welcome to partner in the initiative.
  </p>
  <p className="mb-4">Fredrick Mwazighe</p>
</div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/imgs/Our team.png"
                alt="Founder with students"
                width={600}
                height={400}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-6 text-3xl font-bold">Our Foundation</h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Our vision and mission guide everything we do in mentoring and supporting young people in their journey
                toward excellence and godly character.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-8 shadow-md">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500">
                    <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-red-600">Our Vision</h2>
                </div>
                <p className="text-lg">To leave a legacy of godliness and excellence</p>
                <div className="mt-6 h-1 w-20 bg-red-600"></div>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-md">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-400">
                    <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3" />
                      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-orange-600">Our Mission</h2>
                </div>
                <p className="text-lg">
                  To offer Christian and life mentorship to empower youth to reach their full potential
                </p>
                <div className="mt-6 h-1 w-20 bg-orange-600"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Impact</h2>
          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-6 text-center">
              <div className="text-4xl font-bold text-blue-600">5</div>
              <p className="mt-2">Current Students</p>
            </div>
            <div className="rounded-lg bg-green-50 p-6 text-center">
              <div className="text-4xl font-bold text-green-600">3</div>
              <p className="mt-2">Successful Graduates</p>
            </div>
            <div className="rounded-lg bg-orange-50 p-6 text-center">
              <div className="text-4xl font-bold text-orange-600">6</div>
              <p className="mt-2">Years of Service</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-6 text-center">
              <div className="text-4xl font-bold text-purple-600">2+</div>
              <p className="mt-2">New Scholarships Needed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Team</h2>
          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md text-center">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src="/imgs/Dr Fred.jpg"
                  alt="Dr. F.M.K"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Dr. Fredrik M. Mwazighe</h3>
              <p className="text-gray-600">Founder & Director</p>
              <p className="mt-4">
                Passionate about education and mentorship, Dr. F.M.M brings his personal experience and vision to lead
                the organization.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md text-center">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src="/imgs/Ana.jpg"
                  alt="Team Member"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Anastasia Kang'ongole</h3>
              <p className="text-gray-600">Program Director</p>
              <p className="mt-4">
                Dedicated to ensuring the smooth operation of our scholarship program and mentorship activities.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md text-center">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src="/imgs/Erica.jpg"
                  alt="Team Member"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Erica Nyange</h3>
              <p className="text-gray-600">Outreach Director</p>
              <p className="mt-4">
                Promotes the organization’s mission through outreach and identifies opportunities for collaboration,
                mentorship, and evangelism.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md text-center">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src="/imgs/Pam.jpg"
                  alt="Team Member"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Mushi Pamela</h3>
              <p className="text-gray-600">Mentorship Director</p>
              <p className="mt-4">
                Oversees the mentorship program, ensuring students receive the guidance they need to succeed.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md text-center">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src="/imgs/Czar.jpg"
                  alt="Team Member"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Caesar Mvoyi</h3>
              <p className="text-gray-600">Communications & Media</p>
              <p className="mt-4">
                Manages social media, website content, and public messaging, ensuring clear communication with the
                public and stakeholders.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md text-center">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src="/imgs/Jim.png"
                  alt="Team Member"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">James Wafula</h3>
              <p className="text-gray-600">Digital Ministry & Tech Support</p>
              <p className="mt-4">
                Supports the organization’s mission through technology by equipping the team with tech tools to serve
                and inspire youth effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners - Enhanced with Modern Design */}
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-10 leading-tight">
              Our{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Partners
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto mb-20 font-light">
              We work with amazing organizations that share our vision of empowering youth through education and
              mentorship
            </p>

            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl blur-3xl"></div>
              <div className="relative">
                <PartnersSlideshow partners={partners} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Join Our Mission</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Help us continue to provide education and mentorship to bright but needy students. Your support makes a
            difference.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-600">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
