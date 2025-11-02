import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Star,
  Target,
  BookOpen,
  Users,
  Heart,
  Globe,
  Calendar,
  MessageSquare,
  Mail,
  ArrowRight,
  Play,
  CheckCircle,
  Award,
  TrendingUp,
  Shield,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Slideshow from "@/components/slideshow"
import TestimonialsSlideshow from "@/components/testimonials-slideshow"
import MediaSlideshow from "@/components/media-slideshow"
import PartnersSlideshow from "@/components/partners-slideshow"
import NewsletterForm from "@/components/newsletter-form"

export default function HomePage() {
  // Define slideshow images
  const slideshowImages = [
    "/imgs/slideshow1.jpg",
    "/imgs/slideshow2.jpg",
    "/imgs/slideshow3.jpg",
    "/imgs/slideshow4.jpg",
    "/imgs/slideshow5.jpg",
    "/imgs/slideshow6.jpg",
  ]

// Define testimonials data
const testimonials = [
  {
    id: 3,
    name: "Said Hiribai Julius",
    role: "Current Student",
    year: "Form 3",
    quote:
      "Being part of this program has opened doors I never imagined. The support goes beyond financial - they truly care about our holistic development and future success.",
    image: "/imgs/student 2.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Florence Mghoi",
    role: "Alumni",
    year: "Class of 2024",
    quote:
      "I'm Florence Mghoi, one of the Mariwenyi mentees and I'd like to share how this mentorship helped me. The  mentorship helped me gain clarity in setting SMART goals, strengthened my discipline, and reminded me to prioritize God’s purpose for my life. I learned to use my time wisely, make healthy choices, and protect my vision from negative influences. Overall, it encouraged me to stay focused, trust God’s timing, and work consistently toward success as I pursue my nursing career.",
    image: "/imgs/student 1.jpg",
    rating: 5,
  },
]

  // Define media items for the program showcase
  const mediaItems = [
    {
      id: 1,
      type: "image" as const,
      src: "/imgs/student 1.jpg",
      title: "Alumni Success",
      description: "A Successful mentee of MYM",
    },
    {
      id: 2,
      type: "video" as const,
      src: "/imgs/student 1 video.mp4",
      title: "Program Overview",
      description: "Watch our students share their experiences",
    },
    {
      id: 3,
      type: "image" as const,
      src: "/imgs/student 2.jpg",
      title: "Community Engagement",
      description: "Students participating in community activities",
    },
    {
      id: 4,
      type: "image" as const,
      src: "/imgs/imgs6.jpg",
      title: "Leading by example",
      description: "Celebrating academic achievements",
    },
    {
      id: 5,
      type: "video" as const,
      src: "/imgs/imgs3.jpg",
      title: "MYM 2025 Sessions",
      description: "Hear from our mentors",
    },
       {
      id: 6,
      type: "image" as const,
      src: "/imgs/imgs14.jpg",
  title: "Youth conference",
      description: "Brainstorming sessions",
    },
       {
      id: 7,
      type: "image" as const,
      src: "/imgs/imgs15.jpg",
   title: "Youth conference",
      description: "Brainstorming sessions",
    },
       {
      id: 8,
      type: "image" as const,
      src: "/imgs/imgs16.jpg",
      title: "Youth conference",
      description: "Brainstorming sessions",
    },
  ]

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
      {/* Hero Section - Enhanced with Modern Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Slideshow images={slideshowImages} height="100vh" />
        </div>

        {/* Enhanced Overlay */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-6xl mx-auto">
            {/* Trust Badge */}
            <p className="mb-2 text-lg font-medium">High school busaries for Mariwenyi Village</p>
            <h1 className="mb-8 text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
              Building a Legacy of{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Godliness and Excellence
              </span>{" "}
            </h1>

            <p className="mb-12 max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed text-gray-200 font-light">
              Through Christian mentorship and educational excellence, we're transforming lives in Mariwenyi Village and
              building a legacy of godliness and academic achievement.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/apply">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-6 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20"
                >
                  Apply for Scholarship
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-10 py-6 text-xl font-semibold rounded-full"
              >
                <Play className="mr-3 h-6 w-6" />
                Watch Our Story
              </Button>
            </div>

            {/* Enhanced Stats with Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Users, number: "5", label: "Current Students", color: "text-orange-400" },
                { icon: Award, number: "3", label: "Graduates", color: "text-blue-400" },
                { icon: TrendingUp, number: "6", label: "Years Active", color: "text-green-400" },
                { icon: Heart, number: "200K+", label: "KES Raised", color: "text-purple-400" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="mb-3 flex justify-center">
                    <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                  <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                  <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Modern Card Layout */}
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 rounded-full bg-orange-100 px-8 py-4 mb-8">
                <Globe className="h-6 w-6 text-orange-600" />
                <span className="text-orange-800 font-bold text-lg">Our Foundation</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Building a Legacy of{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Excellence
                </span>
              </h2>

              <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-light">
                At Mariwenyi Youth Mentorship, we firmly believe that providing qualified training and mentorship for
                our youth is essential for fostering effective community transformation and spiritual growth. Our
                mission is to offer comprehensive, biblically-rooted, practical, and impactful mentorship that equips
                young people to realize their full potential.
              </p>
              <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-light">
                However, we recognize that the journey begins with supporting underprivileged yet promising students
                through their high school years. In Mariwenyi village, like many other villages countrywide, many
                talented young individuals face significant barriers to completing their education. Through Dr. Fred's
                vision, rooted in his own experiences growing up in this village, we are committed to offering these
                students a real chance to achieve their dreams, empowering them not just with financial support, but
                with a sense of purpose and direction grounded in faith.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                {[
                  {
                    icon: Star,
                    title: "Our Vision",
                    description:
                      "To leave a legacy of godliness and excellence by being the premier youth mentorship program, empowering young people in our community for transformational leadership.",
                    gradient: "from-red-500 to-red-600",
                    bgGradient: "from-red-50 to-red-100",
                  },
                  {
                    icon: Target,
                    title: "Our Mission",
                    description:
                      "To offer Christian and life mentorship that equips youth biblically, practically, and personally for effective reaching of their full potential.",
                    gradient: "from-orange-500 to-orange-600",
                    bgGradient: "from-orange-50 to-orange-100",
                  },
                ].map((item, index) => (
                  <div key={index} className="group">
                    <div
                      className={`p-10 rounded-3xl bg-gradient-to-br ${item.bgGradient} border-2 border-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105`}
                    >
                      <div className="flex items-start gap-8">
                        <div
                          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <item.icon className="h-10 w-10 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-3xl font-bold text-gray-900 mb-6">{item.title}</h3>
                          <p className="text-gray-700 leading-relaxed text-lg">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative">
                  <MediaSlideshow mediaItems={mediaItems} height="600px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section - Enhanced Grid Layout */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-20">
              <div className="inline-flex items-center gap-3 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 px-8 py-4 mb-10">
                <Target className="h-6 w-6 text-orange-400" />
                <span className="text-orange-300 font-bold text-lg">Our Program</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-tight">
                Comprehensive{" "}
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Development
                </span>
              </h2>

              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                Our holistic approach ensures every student receives the support they need to excel academically,
                spiritually, and personally.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Academic Excellence",
                  description: "Comprehensive scholarship support with personalized tutoring and study resources.",
                  features: ["School fees coverage", "Study materials", "Academic monitoring"],
                  color: "from-blue-500 to-blue-600",
                  bgColor: "bg-blue-500/10",
                  borderColor: "border-blue-500/20",
                },
                {
                  icon: Users,
                  title: "Character Development",
                  description: "Mentorship focused on building godly character and essential life skills.",
                  features: ["Personal mentoring", "Leadership training", "Life skills workshops"],
                  color: "from-green-500 to-green-600",
                  bgColor: "bg-green-500/10",
                  borderColor: "border-green-500/20",
                },
                {
                  icon: Heart,
                  title: "Spiritual Growth",
                  description: "Christian values integration with personal faith development programs.",
                  features: ["Bible study groups", "Prayer sessions", "Spiritual counseling"],
                  color: "from-purple-500 to-purple-600",
                  bgColor: "bg-purple-500/10",
                  borderColor: "border-purple-500/20",
                },
                {
                  icon: Globe,
                  title: "Community Impact",
                  description: "Preparing students to become positive change agents in their communities.",
                  features: ["Community service", "Leadership roles", "Social impact projects"],
                  color: "from-orange-500 to-red-500",
                  bgColor: "bg-orange-500/10",
                  borderColor: "border-orange-500/20",
                },
              ].map((item, index) => (
                <div key={index} className="group">
                  <div
                    className={`p-8 rounded-3xl ${item.bgColor} backdrop-blur-sm border ${item.borderColor} hover:bg-white/10 transition-all duration-500 h-full hover:scale-105`}
                  >
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed mb-6 text-lg">{item.description}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-400">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories - Enhanced with Modern Design */}
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-10 leading-tight">
                Transforming Lives,{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Creating Futures
                </span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-light">
                Hear from our students and graduates about their transformative journey with our mentorship program
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative">
                <TestimonialsSlideshow testimonials={testimonials} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Updates Section - Modern Card Design */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-tight">
                Stay{" "}
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Connected
                </span>
              </h2>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light">
                Keep up with the latest news, events, and updates from our youth mentorship program
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10 mb-20">
              {/* Newsletter Signup - Enhanced */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">Newsletter</CardTitle>
                      <CardDescription className="text-gray-300 text-lg">Monthly updates</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <NewsletterForm />
                </CardContent>
              </Card>

              {/* Recent Announcements - Enhanced */}
              <Card className="lg:col-span-2 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <MessageSquare className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">Latest Announcements</CardTitle>
                      <CardDescription className="text-gray-300 text-lg">Recent updates</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {[
                    {
                      badge: "New",
                      badgeColor: "bg-orange-500",
                      date: "January 15, 2025",
                      title: "2026 Scholarship Applications Now Open",
                      description:
                        "We're accepting applications for our 2026 scholarship program. Apply before December 31st this year.",
                    },
                    {
                      badge: "Event",
                      badgeColor: "bg-blue-500",
                      date: "April, 2026",
                      title: "Annual Youth Mentorship Event 2026",
                      description:
                        "We will have our annual Youth Mentorship Event in April 2026. Contributions welcomed.",
                    },
                    {
                      badge: "Success",
                      badgeColor: "bg-green-500",
                      date: "Since inception",
                      title: "Five Students Graduate Successfully",
                      description: "We're proud to announce successful completion of high school education.",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className={`${item.badgeColor} text-white border-0 px-4 py-2 text-sm font-semibold`}>
                          {item.badge}
                        </Badge>
                        <span className="text-sm text-gray-400 font-medium">{item.date}</span>
                      </div>
                      <h4 className="font-bold text-xl mb-3">{item.title}</h4>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Info Cards - Enhanced */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Calendar,
                  title: "Upcoming Events",
                  subtitle: "Annual Youth Event 2026",
                  detail: "April 2025",
                  color: "from-blue-500 to-blue-600",
                  href: "#latest-announcements",
                },
                {
                  icon: BookOpen,
                  title: "Resources",
                  subtitle: "Study materials & guides",
                  detail: "Available for students",
                  color: "from-green-500 to-green-600",
                  href: "#",
                },
                {
                  icon: Users,
                  title: "Community",
                  subtitle: "Join our mentorship network",
                  detail: "Connect with peers",
                  color: "from-purple-500 to-purple-600",
                  href: "/about",
                },
                {
                  icon: Heart,
                  title: "Support",
                  subtitle: "Get help when you need it",
                  detail: "24/7 assistance",
                  color: "from-orange-500 to-red-500",
                  href: "/contact",
                },
              ].map((item, index) => (
                <Link key={index} href={item.href}>
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                    <CardContent className="pt-10 pb-8">
                      <div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}
                      >
                        <item.icon className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                      <p className="text-gray-300 mb-2 text-lg">{item.subtitle}</p>
                      <p className="text-gray-400 text-sm">{item.detail}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
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

      {/* FAQ Section - White Background */}
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold mb-10 text-gray-900 leading-tight">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-light">
                Find answers to commonly asked questions about our youth mentorship program
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left Column */}
              <div>
                <Accordion type="single" collapsible className="space-y-6">
                  {[
                    {
                      question: "Who Is Our Youth Mentorship Program Designed For?",
                      answer:
                        "Our program is designed for bright and needy high school students who demonstrate academic potential (KCPE score of 300+ marks) and come from families with limited financial resources.",
                    },
                    {
                      question: "What Areas Are Covered In Our Mentorship Program?",
                      answer:
                        "Our comprehensive program covers academic support, character development, spiritual growth through Christian values, life skills training, leadership development, and career guidance.",
                    },
                    {
                      question: "How Long Is The Mentorship Program?",
                      answer:
                        "The mentorship program runs throughout the student's high school years (typically 4 years). We provide continuous support from Form 1 through Form 4.",
                    },
                    {
                      question: "Is The Program Available Throughout The Year?",
                      answer:
                        "Yes, our mentorship and support services are available year-round. While our annual youth event is held in April, students receive continuous support throughout their academic year.",
                    },
                    {
                      question: "Can Students Receive Recognition Upon Program Completion?",
                      answer:
                        "Yes, students who successfully complete our program receive recognition certificates and gain valuable life skills, character development, and academic achievement.",
                    },
                  ].map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index + 1}`}
                      className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border-2 border-orange-100 px-8 hover:shadow-lg transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left hover:no-underline font-bold text-gray-900 text-lg py-6">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed text-lg pb-6">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Right Column */}
              <div>
                <Accordion type="single" collapsible className="space-y-6">
                  {[
                    {
                      question: "How Can I Get Involved As A Volunteer Or Mentor?",
                      answer:
                        "We welcome volunteers and mentors who share our vision. You can get involved by contacting us through our website, participating in our annual events, or joining our fundraising efforts.",
                    },
                    {
                      question: "Is Financial Assistance Available For The Program?",
                      answer:
                        "Yes, financial assistance is the core of our program. We provide school fee support, educational materials, and other necessary resources. Our goal is to raise over KES 200,000 annually.",
                    },
                    {
                      question: "Can Students Participate While Attending Different Schools?",
                      answer:
                        "Our program supports students regardless of which high school they attend. We work with students across different schools in the region, providing mentorship and financial support.",
                    },
                    {
                      question: "Are There Opportunities For Networking And Community Building?",
                      answer:
                        "Yes! Our annual youth events provide excellent networking opportunities. Students connect with peers, mentors, and community leaders, creating a supportive community network.",
                    },
                    {
                      question: "How Can I Stay Updated On Programs And Events?",
                      answer:
                        "Stay connected by subscribing to our newsletter, following our social media channels, and visiting our website regularly for monthly updates about program developments.",
                    },
                  ].map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index + 6}`}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-100 px-8 hover:shadow-lg transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left hover:no-underline font-bold text-gray-900 text-lg py-6">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed text-lg pb-6">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with Gradient Background */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600"></div>
        <div className="absolute inset-0 opacity-20">
          <Image src="/placeholder.svg?height=800&width=1200" alt="Background Pattern" fill className="object-cover" />
        </div>

        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-10 leading-tight">
              Help Us Make a{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Difference
              </span>
            </h2>

            <p className="text-2xl md:text-3xl mb-16 leading-relaxed text-orange-100 font-light">
              We need your support to help more bright and needy students achieve their dreams through education and
              mentorship. Every contribution creates lasting impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link href="/donate">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-6 text-2xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Donate Now
                  <Heart className="ml-3 h-7 w-7" />
                </Button>
              </Link>

              <Link href="/apply">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-3 border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-12 py-6 text-2xl font-bold rounded-full"
                >
                  Apply for Scholarship
                  <ArrowRight className="ml-3 h-7 w-7" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
