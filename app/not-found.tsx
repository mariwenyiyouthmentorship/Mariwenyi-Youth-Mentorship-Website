import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="mt-4 text-xl font-semibold">Page Not Found</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        We couldn't find the page you were looking for. It might have been moved or deleted.
      </p>
      <Link href="/" className="mt-8">
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}
