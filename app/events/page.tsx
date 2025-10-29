import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function EventsPage() {
  const events = [
    {
      year: "2025",
      theme: "You Were Bought at a Price",
      details: "Annual youth mentorship event at Mariwenyi Village in Voi, Kenya",
      images: [
        { src: "/imgs/2025-theme.jpg", width: 400, height: 300 },
        { src: "/imgs/imgs2.jpg", width: 300, height: 200 },
        { src: "/imgs/imgs3.jpg", width: 350, height: 250 },
        { src: "/imgs/imgs4.jpg", width: 400, height: 300 },
        { src: "/imgs/imgs6.jpg", width: 450, height: 350 },
        { src: "/imgs/imgs20.jpg", width: 400, height: 300 },
        { src: "/imgs/imgs26.jpg", width: 300, height: 200 },
        { src: "/imgs/imgs24.jpg", width: 350, height: 250 },
        { src: "/imgs/imgs30.jpg", width: 400, height: 300 },
        { src: "/imgs/imgs31.jpg", width: 450, height: 350 },
        { src: "/imgs/imgs32.jpg", width: 400, height: 300 },
        { src: "/imgs/imgs33.jpg", width: 300, height: 200 },
   
      ],
    },
    {
      year: "2024",
      theme: "Hold Your Horses",
      details: "Annual youth mentorship event at Mariwenyi Village in Voi, Kenya",
      images: [
        "/imgs/2024-theme.jpg",
        "/imgs/imgs-2024-1.jpg",
        "/imgs/imgs-2024-2.jpg",
        "/imgs/imgs-2024-3.jpg",
        "/imgs/imgs-2024-4.jpg",
        "/imgs/imgs-2024-5.jpg",
        "/imgs/imgs-2024-6.jpg",
      ],
    },
    {
      year: "2023",
      theme: "Seize the Day!",
      details: "Annual youth mentorship event at Mariwenyi Village in Voi, Kenya",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
    },
    {
      year: "2020",
      theme: "Finishing Strong",
      details: "First annual youth mentorship event at Mariwenyi Village in Voi, Kenya",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-10 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Our Events</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            We conduct annual mentorship events at Mariwenyi Village in Voi (Kenya) since 2020. These events are designed to
            empower and inspire the youth in our community. Each year, we focus on a different theme that addresses the
            unique challenges and opportunities faced by young people today. Our events feature workshops, guest speakers,
            and interactive sessions that encourage personal growth, skill development, and community engagement.
          </p>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="2025" className="mx-auto max-w-6xl">
            <TabsList className="mb-8 grid w-full grid-cols-4 md:grid-cols-4">
              {events.map((event) => (
                <TabsTrigger key={event.year} value={event.year}>
                  {event.year}
                </TabsTrigger>
              ))}
            </TabsList>

            {events.map((event) => (
              <TabsContent key={event.year} value={event.year}>
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-8 text-center">
                      <h2 className="mb-2 text-3xl font-bold">Youth Mentorship Event {event.year}</h2>
                      <div className="mx-auto mb-4 h-1 w-20 bg-purple-600"></div>
                      <p className="text-xl font-medium text-purple-600">Theme: {event.theme}</p>
                    </div>

                    <div className="mb-8">
                      <h3 className="mb-4 text-xl font-semibold">Event Details</h3>
                      <p className="mb-4">{event.details}</p>
                      <p>
                        During this event, we provided mentorship, guidance, and inspiration to youth from the local
                        community. The event featured workshops, motivational speakers, and networking opportunities for
                        participants.
                      </p>
                    </div>

                    <div className="mb-8">
                      <h3 className="mb-4 text-xl font-semibold">Event Photos</h3>
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {event.images.map((image, index) => {
                          // Support both string and object image formats
                          const imgSrc = typeof image === "string" ? image : image.src
                          const imgWidth = typeof image === "string" ? 400 : image.width
                          const imgHeight = typeof image === "string" ? 300 : image.height
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-center bg-white p-2 rounded-lg"
                              style={{ minHeight: 200, minWidth: 100 }}
                            >
                              <Image
                                src={imgSrc}
                                alt={`Event ${event.year} photo ${index + 1}`}
                                width={imgWidth}
                                height={imgHeight}
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  maxHeight: "320px",
                                  objectFit: "contain",
                                  //background: "#f3f4f6",
                                  borderRadius: "0.5rem",
                                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                                }}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="mb-4 text-xl font-semibold">Event Video</h3>
                      <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
                        <div className="flex h-full items-center justify-center">
                          <p className="text-gray-500">Video will be displayed here</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="mb-4 text-xl font-semibold">Highlights</h3>
                      <ul className="list-inside list-disc space-y-2">
                        <li>Mentorship sessions with experienced professionals</li>
                        <li>Career guidance workshops</li>
                        <li>Spiritual development activities</li>
                        <li>Team building exercises</li>
                        <li>Scholarship awards ceremony</li>
                      </ul>
                    </div>

                    <div className="text-center">
                      <Link href="/contact">
                        <Button className="bg-purple-600 hover:bg-purple-700">Contact Us About Future Events</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Upcoming Events</h2>
          <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
            <h3 className="mb-4 text-2xl font-bold">Youth Mentorship Event 2026</h3>
            <p className="mb-6">
              Planning is already underway for our next annual mentorship event. Stay tuned for more details about the
              theme, speakers, and activities.
            </p>
            <div className="text-center">
              <Link href="/contact"><Button className="bg-purple-600 hover:bg-purple-700">Pre-Register</Button></Link>&nbsp;&nbsp;&nbsp;
              <Link href="/contact"><Button className="bg-purple-600 hover:bg-purple-700">Get Notified</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Get Involved</h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg">
            There are many ways you can participate in our events and support our mission.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-6">
              <h3 className="mb-3 text-xl font-bold">Attend</h3>
              <p className="mb-4">Join us at our next event to experience the mentorship program firsthand.</p>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="rounded-lg bg-green-50 p-6">
              <h3 className="mb-3 text-xl font-bold">Volunteer</h3>
              <p className="mb-4">Share your skills and time to help organize and run our events.</p>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
            <div className="rounded-lg bg-orange-50 p-6">
              <h3 className="mb-3 text-xl font-bold">Sponsor</h3>
              <p className="mb-4">Provide financial support to help us reach more youth with our programs.</p>
              <Link href="/donate">
                <Button
                  variant="outline"
                  className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
                >
                  Donate
                </Button>
              </Link>
            </div>
            <div className="rounded-lg bg-purple-50 p-6">
              <h3 className="mb-3 text-xl font-bold">Speak</h3>
              <p className="mb-4">Share your expertise and inspire the next generation as a guest speaker.</p>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
