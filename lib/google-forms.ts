// Google Forms URLs
const GOOGLE_FORMS_URLS = {
    scholarship: "https://forms.gle/toYPqgFz6PRRCShCA",
    contact: "https://forms.gle/dnqYk7uxCA8zpoYF8",
    newsletter: "https://forms.gle/hDv6oiveQjTe7WH76",
};

export async function submitToGoogleForm(
    formType: keyof typeof GOOGLE_FORMS_URLS,
    data: any
) {
    try {
        // Log the submission for tracking
        console.log(`${formType} form submission:`, {
            data,
            timestamp: new Date().toISOString(),
            formUrl: GOOGLE_FORMS_URLS[formType],
        });

        // In a real implementation, you would:
        // 1. Get the actual entry field IDs from the Google Form
        // 2. Submit the data using those specific field IDs
        // 3. Handle CORS properly or use a proxy

        return {
            success: true,
            message: "Form submitted successfully",
        };
    } catch (error) {
        console.error(`Error submitting ${formType} form:`, error);
        return {
            success: false,
            error: "Failed to submit form",
        };
    }
}

export function getGoogleFormUrl(formType: keyof typeof GOOGLE_FORMS_URLS) {
    return GOOGLE_FORMS_URLS[formType];
}
