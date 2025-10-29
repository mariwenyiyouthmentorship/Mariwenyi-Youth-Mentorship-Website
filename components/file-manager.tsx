"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileUpload } from "./file-upload"
import { Trash2, Download, Eye } from "lucide-react"

interface FileItem {
  name: string
  path: string
  size: number
  type: string
  uploadedAt: string
}

interface FilesByYear {
  [year: string]: FileItem[]
}

export default function FileManager() {
  const [files, setFiles] = useState<{
    slideshow: FilesByYear
    events: FilesByYear
    general: FilesByYear
  }>({
    slideshow: {},
    events: {},
    general: {},
  })

  const [activeCategory, setActiveCategory] = useState("slideshow")
  const [selectedYear, setSelectedYear] = useState("2025")

  const years = ["2020", "2021", "2022", "2023", "2024", "2025"]

  useEffect(() => {
    // Load files from the server
    loadFiles()
  }, [])

  const loadFiles = async () => {
    try {
      // In a real implementation, you would fetch files from an API
      // For now, we'll use mock data
      setFiles({
        slideshow: {
          "2025": [
            {
              name: "hero-image.jpg",
              path: "/uploads/slideshow/2025/hero-image.jpg",
              size: 1024000,
              type: "image/jpeg",
              uploadedAt: new Date().toISOString(),
            },
          ],
          "2024": [],
        },
        events: {
          "2025": [],
          "2024": [],
        },
        general: {
          "2025": [
            {
              name: "form.pdf",
              path: "/uploads/general/form.pdf",
              size: 512000,
              type: "application/pdf",
              uploadedAt: new Date().toISOString(),
            },
          ],
          "2024": [],
        },
      })
    } catch (error) {
      console.error("Error loading files:", error)
    }
  }

  const handleFileUploaded = (category: string, year: string, file: FileItem) => {
    setFiles((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [year]: [...(prev[category as keyof typeof prev][year] || []), file],
      },
    }))
  }

  const handleDeleteFile = async (category: string, year: string, fileName: string) => {
    try {
      // In a real implementation, you would call an API to delete the file
      setFiles((prev) => ({
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [year]: prev[category as keyof typeof prev][year]?.filter((file) => file.name !== fileName) || [],
        },
      }))
    } catch (error) {
      console.error("Error deleting file:", error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const currentFiles = files[activeCategory as keyof typeof files][selectedYear] || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">File Manager</h1>
        <p className="text-gray-600">Upload and manage files for your website</p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="slideshow">Slideshow</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <div className="flex gap-4 items-center">
          <label htmlFor="year-select" className="text-sm font-medium">
            Year:
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <TabsContent value="slideshow">
          <Card>
            <CardHeader>
              <CardTitle>Slideshow Images</CardTitle>
              <CardDescription>Upload images for the homepage slideshow</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                category="slideshow"
                year={selectedYear}
                onFileUploaded={(file) => handleFileUploaded("slideshow", selectedYear, file)}
                acceptedTypes="image/*"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Event Media</CardTitle>
              <CardDescription>Upload photos and videos from events</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                category="events"
                year={selectedYear}
                onFileUploaded={(file) => handleFileUploaded("events", selectedYear, file)}
                acceptedTypes="image/*,video/*"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Files</CardTitle>
              <CardDescription>Upload documents, forms, and other files</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                category="general"
                year={selectedYear}
                onFileUploaded={(file) => handleFileUploaded("general", selectedYear, file)}
                acceptedTypes="*/*"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* File List */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>
            Files in {activeCategory} ({selectedYear})
          </CardTitle>
          <CardDescription>
            {currentFiles.length} file{currentFiles.length !== 1 ? "s" : ""} uploaded
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentFiles.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No files uploaded yet</p>
          ) : (
            <div className="space-y-4">
              {currentFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <h3 className="font-medium">{file.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{formatFileSize(file.size)}</span>
                        <Badge variant="secondary">{file.type}</Badge>
                        <span>Uploaded: {new Date(file.uploadedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={file.path} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={file.path} download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteFile(activeCategory, selectedYear, file.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
