"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SlideshowProps {
  images?: string[]
  interval?: number
  height?: string
  showControls?: boolean
}

export default function Slideshow({
  images = [
    "/imgs/slideshow1.jpg",
    "/imgs/slideshow2.jpg",
    "/imgs/slideshow3.jpg",
    "/imgs/slideshow4.jpg",
    "/imgs/slideshow5.jpg",
    "/imgs/slideshow6.jpg",
  ],
  interval = 5000,
  height = "100vh",
  showControls = true,
}: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(0)

  // Ensure we have valid images array
  const validImages = images && images.length > 0 ? images : ["/placeholder.svg?height=1080&width=1920"]

  // Optimized progress update with requestAnimationFrame
  const updateProgress = useCallback(() => {
    if (!isPlaying || isHovered || validImages.length <= 1) return

    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const newProgress = (elapsed / interval) * 100

      if (newProgress >= 100) {
        setProgress(0)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length)
      } else {
        setProgress(newProgress)
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isPlaying, isHovered, validImages.length, interval])

  useEffect(() => {
    if (!isPlaying || validImages.length <= 1 || isHovered) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length)
      setProgress(0)
    }, interval)

    return () => clearInterval(timer)
  }, [currentIndex, validImages.length, interval, isPlaying, isHovered])

  useEffect(() => {
    if (!isPlaying || isHovered || validImages.length <= 1) return

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return Math.min(prev + 100 / (interval / 50), 100)
      })
    }, 50) // Smoother 50ms updates

    return () => clearInterval(progressTimer)
  }, [interval, isPlaying, isHovered, currentIndex, validImages.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + validImages.length) % validImages.length)
    setProgress(0)
  }, [validImages.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length)
    setProgress(0)
  }, [validImages.length])

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      setProgress(0)
    }
  }, [isPlaying])

  return (
    <div
      className="relative overflow-hidden"
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {validImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        >
          <Image
            src={image || "/placeholder.svg?height=1080&width=1920"}
            alt={`Slideshow image ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=1080&width=1920"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        </div>
      ))}

      {/* Play/Pause Control */}
      {showControls && validImages.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 right-4 z-20 h-12 w-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-300 ${
            isHovered ? "opacity-100 scale-110" : "opacity-0"
          }`}
          onClick={togglePlayPause}
          title={isPlaying ? "Pause slideshow" : "Resume slideshow"}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
      )}

      {/* Navigation arrows - only show if more than 1 image */}
      {validImages.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute left-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-300 ${
              isHovered ? "opacity-100 scale-110" : "opacity-70"
            }`}
            onClick={goToPrevious}
            title="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`absolute right-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-300 ${
              isHovered ? "opacity-100 scale-110" : "opacity-70"
            }`}
            onClick={goToNext}
            title="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Indicators - only show if more than 1 image */}
      {validImages.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center space-x-2">
          {validImages.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => {
                setCurrentIndex(index)
                setProgress(0)
              }}
              title={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Enhanced Progress bar with smooth animation */}
      {showControls && isPlaying && validImages.length > 1 && !isHovered && (
        <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-white/20">
          <div
            className="h-full transition-all duration-75 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}
