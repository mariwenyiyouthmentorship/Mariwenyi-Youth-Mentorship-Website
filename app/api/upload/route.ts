import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const category = formData.get("category") as string
    const year = formData.get("year") as string

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 })
    }

    if (!category || !year) {
      return NextResponse.json({ error: "Category and year are required" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create the directory path: public/uploads/{category}/{year}
    const uploadDir = path.join(process.cwd(), "public", "uploads", category, year)

    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      console.log("Directory already exists or error creating:", error)
    }

    // Create the file path
    const filePath = path.join(uploadDir, file.name)

    // Write the file
    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      path: `/uploads/${category}/${year}/${file.name}`,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
