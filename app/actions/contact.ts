"use server";

import { z } from "zod";

// --- 1. Define the validation schema ---
const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
});

// --- 2. Configuration for Google Forms (User MUST replace these) ---

// Replace this with the full Google Form submission URL (ends in /formResponse)action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdrFig-p4X1QGeNwW0CanTcCrWMy0n3QnyDQ_UqQA_-d7-_kg/formResponse"
const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdrFig-p4X1QGeNwW0CanTcCrWMy0n3QnyDQ_UqQA_-d7-_kg/formResponse";

/*
 * IMPORTANT: You must replace the placeholder IDs below with the actual
 * 'entry.XXXXXX' IDs from your Google Form fields.
 * To find them:
 * 1. Open your Google Form in the browser.
 * 2. Right-click on each input field (Name, Email, etc.) and select 'Inspect'.
 * 3. Look for the 'name' attribute of the <input> or <textarea> element.
 * It will be in the format 'entry.123456789'.
 */
const ENTRY_IDS = {
    name: "entry.653405809", // Extracted ID for Name field
    email: "entry.1950783867", // Extracted ID for Email field
    subject: "entry.177223975", // Extracted ID for Subject field
    message: "entry.1559673945", // Extracted ID for Message field
};

// --- 3. Server Action Function ---
export async function submitContactForm(formData: FormData) {
    try {
        // Extract data from FormData
        const data = {
            name: (formData.get("name") as string) || "",
            email: (formData.get("email") as string) || "",
            subject: (formData.get("subject") as string) || "",
            message: (formData.get("message") as string) || "",
        };

        // Validate input using Zod
        const validatedData = contactSchema.parse(data);

        // Construct the payload for Google Forms
        // Google Forms expects application/x-www-form-urlencoded data mapping entry IDs to values
        const payload = new URLSearchParams({
            [ENTRY_IDS.name]: validatedData.name,
            [ENTRY_IDS.email]: validatedData.email,
            [ENTRY_IDS.subject]: validatedData.subject,
            [ENTRY_IDS.message]: validatedData.message,
        });

        // --- Server-side POST request to Google Forms ---
        // This runs on the server, safely bypassing client-side CORS restrictions.
        const response = await fetch(GOOGLE_FORM_URL, {
            method: "POST",
            // Important: Google Forms submission requires this Content-Type
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: payload.toString(),
            // We set redirect to 'follow' but typically Google Forms sends a 302,
            // and we just need to ensure the request completed successfully.
            redirect: "follow",
        });

        // Google Forms usually returns a redirect (status 302) or a 200 OK after submission.
        if (response.ok || response.status === 302) {
            console.log("Successfully submitted form data to Google Forms.");
            return {
                success: true,
                message:
                    "Thank you for your message! It has been successfully submitted.",
            };
        } else {
            // Log any unexpected non-success status codes from Google Forms
            console.error(
                "Google Forms submission failed with status:",
                response.status,
                response.statusText
            );
            return {
                success: false,
                error: `Submission failed. Google Forms returned status ${response.status}.`,
            };
        }
    } catch (error) {
        console.error("Contact form processing error:", error);

        if (error instanceof z.ZodError) {
            // Return the first validation error message
            return {
                success: false,
                error: error.errors[0].message,
            };
        }

        return {
            success: false,
            error: "An unexpected error occurred during submission. Please check the form configuration and network settings.",
        };
    }
}
