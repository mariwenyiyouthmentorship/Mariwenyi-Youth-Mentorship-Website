import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FileManager from "@/components/file-manager"

export default function UploadsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">File Manager</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>
            Upload images and videos for your website. Files will be organized by category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileManager />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Slideshow Images</h3>
            <p>Upload images for the homepage slideshow. Recommended size: 1920x1080px.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium">Event Media</h3>
            <p>Upload images and videos related to events. These will be available for use on the Events page.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium">General Files</h3>
            <p>Upload any other images or media files for use throughout the website.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
