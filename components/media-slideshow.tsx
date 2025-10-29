"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MediaItem {
  id: number
  type: "image" | "video"
  src: string
  alt?: string
  title?: string
  description?: string
}

interface MediaSlideshowProps {
  mediaItems?: MediaItem[]
  height?: string
  interval?: number
  showControls?: boolean
}

export default function MediaSlideshow({
  mediaItems = [
    {
      id: 1,
      type: "image" as const,
      src: "/placeholder.svg?height=500&width=800",
      title: "Sample Image",
      description: "Sample description",
    },
  ],
  height = "500px",
  interval = 6000,
  showControls = true,
}: MediaSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Ensure we have valid media items
  const validMediaItems =
    mediaItems && mediaItems.length > 0
      ? mediaItems
      : [
          {
            id: 1,
            type: "image" as const,
            src: "/placeholder.svg?height=500&width=800",
            title: "Sample Media",
            description: "Sample media description",
          },
        ]

  useEffect(() => {
    if (!isPlaying || validMediaItems.length <= 1 || isHovered) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validMediaItems.length)
      setProgress(0)
    }, interval)

    return () => clearInterval(timer)
  }, [currentIndex, validMediaItems.length, interval, isPlaying, isHovered])

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

  useEffect(() => {
    // Reset video state when slide changes
    setIsVideoPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [currentIndex])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + validMediaItems.length) % validMediaItems.length)
    setProgress(0)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % validMediaItems.length)
    setProgress(0)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      setProgress(0)
    }
  }

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  if (validMediaItems.length === 0) {
    return (
      <div className="relative flex items-center justify-center bg-gray-200 rounded-2xl" style={{ height }}>
        <p className="text-gray-500">No media available</p>
      </div>
    )
  }

  const currentItem = validMediaItems[currentIndex]

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl"
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {validMediaItems.map((item, index) => (
        <div
          key={item.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        >
          {item.type === "image" ? (
            <Image
              src={item.src || "/placeholder.svg?height=500&width=800"}
              alt={item.alt || `Media ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=500&width=800"
              }}
            />
          ) : (
            <video
              ref={index === currentIndex ? videoRef : null}
              src={item.src}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
            />
          )}
        </div>
      ))}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

      {/* Slideshow Play/Pause Control */}
      {showControls && validMediaItems.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 left-4 z-20 h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={togglePlayPause}
          title={isPlaying ? "Pause slideshow" : "Resume slideshow"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
      )}

      {/* Media info */}
      <div className="absolute bottom-6 left-6 text-white z-20">
        {currentItem.title && <p className="text-lg font-semibold mb-1">{currentItem.title}</p>}
        {currentItem.description && <p className="text-sm opacity-90">{currentItem.description}</p>}

        {/* Auto-play status */}
        {showControls && validMediaItems.length > 1 && (
          <p
            className={`text-xs opacity-70 mt-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            {isPlaying ? "Auto-playing" : "Paused"} • {currentIndex + 1} of {validMediaItems.length}
          </p>
        )}
      </div>

      {/* Video controls */}
      {currentItem.type === "video" && (
        <div className="absolute bottom-6 right-6 flex gap-2 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={toggleVideoPlay}
            title={isVideoPlaying ? "Pause video" : "Play video"}
          >
            {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={toggleMute}
            title={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>
      )}

      {/* Navigation arrows */}
      {validMediaItems.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute left-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-70"
            }`}
            onClick={goToPrevious}
            title="Previous media"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`absolute right-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-70"
            }`}
            onClick={goToNext}
            title="Next media"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Indicators with progress */}
      {validMediaItems.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center space-x-2">
          {validMediaItems.map((item, index) => (
            <button
              key={item.id}
              className={`relative h-2 rounded-full transition-all overflow-hidden ${
                index === currentIndex ? "bg-white w-8" : "bg-white/50 w-2 hover:bg-white/70"
              }`}
              onClick={() => {
                setCurrentIndex(index)
                setProgress(0)
              }}
              title={`Go to ${item.title || `media ${index + 1}`}`}
            >
              {index === currentIndex && isPlaying && !isHovered && (
                <div
                  className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Media type indicator */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
          {currentItem.type === "video" ? "VIDEO" : "PHOTO"}
        </div>
      </div>
    </div>
  )
}
