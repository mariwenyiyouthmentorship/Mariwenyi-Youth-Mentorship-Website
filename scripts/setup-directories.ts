import { createYearDirectories } from "../app/api/upload/route"

async function setupDirectories() {
  try {
    console.log("Creating year-based upload directories...")
    await createYearDirectories()
    console.log("Directories created successfully!")
  } catch (error) {
    console.error("Error creating directories:", error)
  }
}

setupDirectories()
