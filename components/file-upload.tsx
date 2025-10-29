"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"

interface FileUploadProps {
  category: string
  year: string
  onFileUploaded: (file: any) => void
  acceptedTypes?: string
  maxSize?: number
}

export function FileUpload({
  category,
  year,
  onFileUploaded,
  acceptedTypes = "*/*",
  maxSize = 10 * 1024 * 1024, // 10MB default
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    // Validate file size
    if (file.size > maxSize) {
      setUploadStatus({
        type: "error",
        message: `File size exceeds ${Math.round(maxSize / (1024 * 1024))}MB limit`,
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setUploadStatus({ type: null, message: "" })

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("category", category)
      formData.append("year", year)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (response.ok) {
        const result = await response.json()
        setUploadStatus({
          type: "success",
          message: "File uploaded successfully!",
        })

        // Notify parent component
        onFileUploaded({
          name: file.name,
          path: result.path,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
        })

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      } else {
        const error = await response.json()
        setUploadStatus({
          type: "error",
          message: error.error || "Upload failed",
        })
      }
    } catch (error) {
      console.error("Upload error:", error)
      setUploadStatus({
        type: "error",
        message: "Upload failed. Please try again.",
      })
    } finally {
      setIsUploading(false)
      setTimeout(() => {
        setUploadProgress(0)
        setUploadStatus({ type: null, message: "" })
      }, 3000)
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</p>
        <p className="text-sm text-gray-500 mb-4">
          Category: {category} | Year: {year}
        </p>
        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
          Select Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes}
          onChange={handleFileSelect}
          disabled={isUploading}
        />
        <p className="text-xs text-gray-400 mt-2">Max file size: {Math.round(maxSize / (1024 * 1024))}MB</p>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}

      {uploadStatus.type && (
        <div
          className={`flex items-center space-x-2 p-3 rounded-lg ${
            uploadStatus.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          }`}
        >
          {uploadStatus.type === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span className="text-sm">{uploadStatus.message}</span>
        </div>
      )}
    </div>
  )
}
