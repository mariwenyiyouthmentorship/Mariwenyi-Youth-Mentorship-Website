"use server";

import { z } from "zod";

// --- 1. Configuration for Google Forms (New Scholarship Form) ---

// The new submission URL extracted from the <form action="..."> attribute
const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLScAVp2FvTrmJ4VTLR9txEG6vllV3vsCSYEAlhTz9WURdlAOGg/formResponse";

/*
 * IMPORTANT: These 'entry.XXXXXX' IDs were extracted from your Scholarship
 * Application Form HTML source. These map the internal Google Form question
 * ID to the field names used in your front-end form.
 *
 * NOTE: The "Upload documents" field (entry.439643430) is included as a
 * placeholder (set to "") in the payload to prevent Google Forms from
 * rejecting the request due to a missing expected form field. You cannot
 * upload actual files this way.
 */
const ENTRY_IDS = {
    studentName: "entry.2093380368", // Name of student
    schoolLevel: "entry.2045171223", // Level in school
    school: "entry.1534349814", // School
    currentlyInSchool: "entry.1890443298", // Are you currently in school? (Radio)
    kcpeResults: "entry.1804912664", // KCPE results
    parentName: "entry.383150587", // Name of parent(s) and contacts
    parentOccupation: "entry.592097548", // Parent(s) occupation
    parentIncome: "entry.882942381", // How much do(es) the parent(s) make per month?
    siblings: "entry.310887041", // Does the student have other siblings? (Now text/optional)
    previousSponsor: "entry.686291305", // CORRECTED ID for 'Who Has Been Paying Fees...'
    lastTermFees: "entry.991624010", // Fee balance last term
    presentTermFees: "entry.1283684166", // Fee balance present term
    uploadDocuments: "entry.439643430", // ADDED: Upload documents (MUST BE OPTIONAL IN FORM)
};

// --- 2. Define the validation schema ---
const scholarshipSchema = z.object({
    studentName: z
        .string()
        .min(2, "Student name must be at least 2 characters"),
    schoolLevel: z
        .string()
        .min(1, "Please provide the student's level in school"),
    school: z.string().min(2, "School name must be at least 2 characters"),
    // Radio buttons submit the string value (e.g., "yes" or "No")
    currentlyInSchool: z.enum(["yes", "No"], {
        errorMap: () => ({
            message: "Please indicate if the student is currently in school",
        }),
    }),
    kcpeResults: z.string().min(1, "KCPE results are required"),
    parentName: z
        .string()
        .min(2, "Parent/Guardian name and contacts are required"),
    parentOccupation: z
        .string()
        .min(2, "Parent/Guardian occupation is required"),
    parentIncome: z
        .string()
        .min(1, "Please provide parent/Guardian income information"),
    // Updated to optional string to allow for sibling names, or left blank
    siblings: z.string().optional(),
    // REDUCED MINIMUM LENGTH to 5
    previousSponsor: z.string().min(3, "Must be at least 3 characters."),
    lastTermFees: z.string().optional(),
    presentTermFees: z.string().optional(),
});

// --- 3. Utility Function ---
function generateReferenceNumber(studentName: string): string {
    const timestamp = Date.now();
    const nameCode = studentName.replace(/\s+/g, "").toUpperCase().slice(0, 3);
    return `APP-${timestamp}-${nameCode}`;
}

// --- 4. Server Action Function ---
export async function submitScholarshipApplication(formData: FormData) {
    try {
        // Extract data from FormData
        const data = {
            studentName: (formData.get("studentName") as string) || "",
            schoolLevel: (formData.get("schoolLevel") as string) || "",
            school: (formData.get("school") as string) || "",
            currentlyInSchool:
                (formData.get("currentlyInSchool") as string) || "",
            kcpeResults: (formData.get("kcpeResults") as string) || "",
            parentName: (formData.get("parentName") as string) || "",
            parentOccupation:
                (formData.get("parentOccupation") as string) || "",
            parentIncome: (formData.get("parentIncome") as string) || "",
            siblings: (formData.get("siblings") as string) || undefined, // Changed from hasSiblings
            previousSponsor: (formData.get("previousSponsor") as string) || "",
            lastTermFees: (formData.get("lastTermFees") as string) || undefined,
            presentTermFees:
                (formData.get("presentTermFees") as string) || undefined,
        };

        // Validate input
        const validatedData = scholarshipSchema.parse(data);

        // Generate reference number
        const referenceNumber = generateReferenceNumber(
            validatedData.studentName
        );

        // Construct the payload for Google Forms
        const payload = new URLSearchParams({
            [ENTRY_IDS.studentName]: validatedData.studentName,
            [ENTRY_IDS.schoolLevel]: validatedData.schoolLevel,
            [ENTRY_IDS.school]: validatedData.school,
            [ENTRY_IDS.currentlyInSchool]: validatedData.currentlyInSchool,
            [ENTRY_IDS.kcpeResults]: validatedData.kcpeResults,
            [ENTRY_IDS.parentName]: validatedData.parentName,
            [ENTRY_IDS.parentOccupation]: validatedData.parentOccupation,
            [ENTRY_IDS.parentIncome]: validatedData.parentIncome,
            [ENTRY_IDS.siblings]: validatedData.siblings || "",
            [ENTRY_IDS.previousSponsor]: validatedData.previousSponsor,
            [ENTRY_IDS.lastTermFees]: validatedData.lastTermFees || "",
            [ENTRY_IDS.presentTermFees]: validatedData.presentTermFees || "",
            [ENTRY_IDS.uploadDocuments]: "", // <-- WORKAROUND: Explicitly sending an empty value for the file field
        });

        // --- Server-side POST request to Google Forms ---
        const response = await fetch(GOOGLE_FORM_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                // Adding headers to mimic a browser for better reliability with Google Forms
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                Referer: GOOGLE_FORM_URL.replace("formResponse", "viewform"), // Use the viewform URL as the referer
            },
            body: payload.toString(),
            redirect: "follow",
        });

        if (response.ok || response.status === 302) {
            console.log(
                "Successfully submitted scholarship application to Google Forms."
            );
            return {
                success: true,
                referenceNumber: referenceNumber,
                message:
                    "Application submitted successfully! Your reference number is " +
                    referenceNumber,
            };
        } else {
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
        console.error("Scholarship form processing error:", error);

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
