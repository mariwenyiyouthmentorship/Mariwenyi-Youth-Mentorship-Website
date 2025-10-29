"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Partner {
  id: number
  name: string
  logo: string
  description?: string
  website?: string
}

interface PartnersSlideShowProps {
  partners?: Partner[]
  interval?: number
  itemsPerView?: number
  showControls?: boolean
}

export default function PartnersSlideshow({
  partners = [
    {
      id: 1,
      name: "Sample Partner",
      logo: "/placeholder.svg?height=100&width=200",
      description: "Sample partner description",
    },
  ],
  interval = 5000,
  itemsPerView = 3,
  showControls = true,
}: PartnersSlideShowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(0)

  // Ensure we have valid partners
  const validPartners =
    partners && partners.length > 0
      ? partners
      : [
          {
            id: 1,
            name: "Sample Partner",
            logo: "/placeholder.svg?height=100&width=200",
            description: "Sample partner description",
          },
        ]

  const maxIndex = Math.max(0, validPartners.length - itemsPerView)

  useEffect(() => {
    if (!isPlaying || validPartners.length <= itemsPerView || isHovered) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (maxIndex + 1))
      setProgress(0)
    }, interval)

    return () => clearInterval(timer)
  }, [currentIndex, maxIndex, interval, isPlaying, validPartners.length, itemsPerView, isHovered])

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
    setCurrentIndex((prevIndex) => (prevIndex - 1 + maxIndex + 1) % (maxIndex + 1))
    setProgress(0)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (maxIndex + 1))
    setProgress(0)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      setProgress(0)
    }
  }

  if (validPartners.length === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-200 rounded-2xl p-12">
        <p className="text-gray-500">No partners available</p>
      </div>
    )
  }

  const visiblePartners = validPartners.slice(currentIndex, currentIndex + itemsPerView)

  // Fill remaining slots if needed
  while (visiblePartners.length < itemsPerView && validPartners.length > 0) {
    const remainingIndex = (currentIndex + visiblePartners.length) % validPartners.length
    visiblePartners.push(validPartners[remainingIndex])
  }

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Play/Pause Control */}
      {showControls && validPartners.length > itemsPerView && (
        <div
          className={`flex justify-center mb-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            variant="outline"
            size="sm"
            className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Resume
              </>
            )}
          </Button>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {visiblePartners.map((partner, index) => (
          <div key={`${partner.id}-${index}`} className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:scale-105 h-full flex flex-col items-center justify-center">
              <div className="mb-6 h-20 flex items-center justify-center">
                <Image
                  src={partner.logo || "/placeholder.svg?height=80&width=200"}
                  alt={partner.name}
                  width={200}
                  height={80}
                  className="max-h-20 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=80&width=200"
                  }}
                />
              </div>
              <h3 className="font-semibold text-gray-900 text-center mb-2">{partner.name}</h3>
              {partner.description && <p className="text-sm text-gray-600 text-center">{partner.description}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {validPartners.length > itemsPerView && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute left-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-70"
            }`}
            onClick={goToPrevious}
            title="Previous partners"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`absolute right-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-70"
            }`}
            onClick={goToNext}
            title="Next partners"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Indicators with progress */}
      {validPartners.length > itemsPerView && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`relative h-3 rounded-full transition-all overflow-hidden ${
                index === currentIndex ? "bg-orange-500 w-8" : "bg-gray-300 w-3 hover:bg-gray-400"
              }`}
              onClick={() => {
                setCurrentIndex(index)
                setProgress(0)
              }}
              title={`Go to partners group ${index + 1}`}
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

      {/* Status indicator */}
      {showControls && validPartners.length > itemsPerView && (
        <div
          className={`text-center mt-4 text-xs text-gray-500 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {isPlaying ? "Auto-rotating" : "Paused"} • Showing {Math.min(itemsPerView, validPartners.length)} of{" "}
          {validPartners.length} partners
        </div>
      )}
    </div>
  )
}
