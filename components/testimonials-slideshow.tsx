"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: number
  name: string
  role: string
  year: string
  quote: string
  image: string
  rating: number
}

interface TestimonialsSlideShowProps {
  testimonials?: Testimonial[]
  interval?: number
  showControls?: boolean
}

export default function TestimonialsSlideshow({
  testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "University Student",
      quote:
        "The mentorship program completely transformed my academic journey. My mentor helped me develop study strategies that improved my grades dramatically.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
      year: "Class of 2023",
    },
  ],
  interval = 8000,
  showControls = true,
}: TestimonialsSlideShowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(0)

  // Ensure we have valid testimonials
  const validTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : [
          {
            id: 1,
            name: "Sample Student",
            role: "Program Graduate",
            quote: "This program changed my life and gave me the tools to succeed.",
            rating: 5,
            image: "/placeholder.svg?height=80&width=80",
            year: "Class of 2023",
          },
        ]

  useEffect(() => {
    if (!isPlaying || validTestimonials.length <= 1 || isHovered) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validTestimonials.length)
      setProgress(0)
    }, interval)

    return () => clearInterval(timer)
  }, [currentIndex, validTestimonials.length, interval, isPlaying, isHovered])

  useEffect(() => {
    if (!isPlaying || isHovered) return

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 100 / (interval / 100)
      })
    }, 100)

    return () => clearInterval(progressTimer)
  }, [interval, isPlaying, isHovered, currentIndex])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + validTestimonials.length) % validTestimonials.length)
    setProgress(0)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % validTestimonials.length)
    setProgress(0)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      setProgress(0)
    }
  }

  if (validTestimonials.length === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-200 rounded-3xl p-12">
        <p className="text-gray-500">No testimonials available</p>
      </div>
    )
  }

  const currentTestimonial = validTestimonials[currentIndex]

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-orange-100 min-h-[300px] relative">
        {/* Play/Pause Control */}
        {showControls && validTestimonials.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            onClick={togglePlayPause}
            title={isPlaying ? "Pause testimonials" : "Resume testimonials"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
        )}

        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
              <Image
                src={currentTestimonial.image || "/placeholder.svg?height=80&width=80"}
                alt={currentTestimonial.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=80&width=80"
                }}
              />
            </div>
          </div>
          <div className="flex-1">
            <blockquote className="text-2xl text-gray-700 italic leading-relaxed mb-6">
              "{currentTestimonial.quote}"
            </blockquote>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900 text-lg">{currentTestimonial.name}</p>
                <p className="text-orange-600 font-semibold">
                  {currentTestimonial.role} • {currentTestimonial.year}
                </p>
              </div>
              <div className="flex gap-1">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-orange-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Auto-play status indicator */}
        {showControls && validTestimonials.length > 1 && (
          <div
            className={`absolute bottom-4 left-4 text-xs text-gray-500 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            {isPlaying ? "Auto-playing" : "Paused"} • {validTestimonials.length} testimonials
          </div>
        )}
      </div>

      {/* Navigation arrows */}
      {validTestimonials.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute left-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-lg transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-70"
            }`}
            onClick={goToPrevious}
            title="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`absolute right-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-lg transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-70"
            }`}
            onClick={goToNext}
            title="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Indicators with progress */}
      {validTestimonials.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {validTestimonials.map((_, index) => (
            <button
              key={index}
              className={`relative h-3 rounded-full transition-all overflow-hidden ${
                index === currentIndex ? "bg-orange-500 w-8" : "bg-gray-300 w-3 hover:bg-gray-400"
              }`}
              onClick={() => {
                setCurrentIndex(index)
                setProgress(0)
              }}
              title={`Go to testimonial ${index + 1}`}
            >
              {index === currentIndex && isPlaying && !isHovered && (
                <div
                  className="absolute top-0 left-0 h-full bg-orange-600 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
