"use server";

import { z } from "zod";

// --- 1. Define the validation schema ---
const newsletterSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

// --- 2. Configuration for Google Forms (Populated from your HTML) ---

// The full Google Form submission URL
const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLScVcwym7hyQxy5W-qiKoIE0Ev-J72-iClN3sFnQriTvftjqIQ/formResponse";

// The 'entry.XXXXXX' ID for your form's email field
const ENTRY_IDS = {
    email: "entry.1354416320",
};

// --- 3. Server Action Function ---
export async function subscribeToNewsletter(formData: FormData) {
    try {
        const data = {
            email: (formData.get("email") as string) || "",
        };

        // Validate input using Zod
        const validatedData = newsletterSchema.parse(data);

        // Construct the payload for Google Forms
        const payload = new URLSearchParams({
            [ENTRY_IDS.email]: validatedData.email,
        });

        // Server-side POST request to Google Forms, bypassing client-side CORS
        const response = await fetch(GOOGLE_FORM_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: payload.toString(),
            redirect: "follow",
        });

        // Check if the submission was successful
        if (response.ok || response.status === 302) {
            console.log(
                "Successfully submitted newsletter subscription to Google Forms."
            );
            return {
                success: true,
                message: "Thank you for subscribing to our newsletter!",
            };
        } else {
            console.error(
                "Google Forms submission failed with status:",
                response.status,
                response.statusText
            );
            return {
                success: false,
                error: `Submission failed. The form may be misconfigured.`,
            };
        }
    } catch (error) {
        console.error("Newsletter subscription error:", error);

        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: error.errors[0].message,
            };
        }

        return {
            success: false,
            error: "An unexpected error occurred. Please try again.",
        };
    }
}
