"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    CheckCircle,
    AlertCircle,
    Loader2,
} from "lucide-react";
// Assuming submitContactForm is correctly imported and defined elsewhere
// import { submitContactForm } from "@/app/actions/contact"; 

// Placeholder for the action function since it's defined externally
const submitContactForm = async (formData: FormData) => {
    // Replace with actual implementation
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    const name = formData.get("name") as string;
    if (name && name.toLowerCase().includes("error")) {
        return { success: false, error: "Simulated submission error. Try a different name." };
    }
    return { success: true, message: "Thank you! Your message has been sent successfully." };
};


export default function ContactPage() {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<{
        success: boolean;
        message?: string;
        error?: string;
    } | null>(null);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        startTransition(() => {
            submitContactForm(formData).then((res) => {
                setResult(res);
                if (res.success) {
                    (event.target as HTMLFormElement).reset();
                }
            });
        });
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="mb-6 text-4xl font-bold md:text-5xl">
                        Contact Us
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-lg">
                        We'd love to hear from you. Reach out with any questions
                        about our mentorship program or how you can get
                        involved.
                    </p>
                </div>
            </section>

            {/* Contact Information and Form */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
                        {/* Contact Information */}
                        <div className="rounded-lg bg-gray-50 p-8 shadow-md">
                            <h2 className="mb-6 text-2xl font-bold">
                                Get in Touch
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Email
                                        </h3>
                                        <a
                                            href="mailto:mariwenyiyouthmentorship@gmail.com"
                                            className="text-blue-600 hover:underline"
                                        >
                                            mariwenyiyouthmentorship@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Phone
                                        </h3>
                                        <a
                                            href="tel:+254729563362"
                                            className="text-blue-600 hover:underline"
                                        >
                                            +254 729 563 362
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Address
                                        </h3>
                                        <address className="not-italic">
                                            Mariwenyi Village, <br />
                                            Voi, Kenya
                                        </address>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="mb-4 text-lg font-semibold">
                                    Follow Us
                                </h3>
                                <div className="flex gap-4">
                                    <a
                                        href="#"
                                        className="rounded-full bg-gray-200 p-3 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                                        aria-label="Facebook"
                                    >
                                        <Facebook className="h-5 w-5" />
                                    </a>
                                    <a
                                        href="#"
                                        className="rounded-full bg-gray-200 p-3 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                                        aria-label="Twitter"
                                    >
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                    <a
                                        href="#"
                                        className="rounded-full bg-gray-200 p-3 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                                        aria-label="Instagram"
                                    >
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="rounded-lg bg-white p-8 shadow-md">
                            <h2 className="mb-6 text-2xl font-bold">
                                Send Us a Message
                            </h2>

                            {result && (
                                <div
                                    className={`mb-6 flex items-center gap-3 p-4 rounded-lg ${
                                        result.success
                                            ? "bg-green-50 text-green-800 border border-green-200"
                                            : "bg-red-50 text-red-800 border border-red-200"
                                    }`}
                                >
                                    {result.success ? (
                                        <CheckCircle className="h-5 w-5 flex-shrink-0" />
                                    ) : (
                                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    )}
                                    <p className="text-sm font-medium">
                                        {result.success
                                            ? result.message
                                            : result.error}
                                    </p>
                                </div>
                            )}

                            <form
                                id="contact-form"
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Your Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Your Name"
                                            required
                                            disabled={isPending}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            Your Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="your-email@example.com"
                                            required
                                            disabled={isPending}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        placeholder="How can we help you?"
                                        required
                                        disabled={isPending}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Your message here..."
                                        rows={5}
                                        required
                                        disabled={isPending}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-orange-500 hover:bg-orange-600"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                            Sending Message...
                                        </>
                                    ) : (
                                        "Send Message"
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- */}

            {/* Map Section (Location: Mariwenyi, Kenya) */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-center text-3xl font-bold">
                        🗺️ Our Location
                    </h2>
                    <div className="mx-auto max-w-6xl overflow-hidden rounded-lg bg-white shadow-md">
                        <div className="aspect-video w-full bg-gray-300">
                            <iframe
                                // PERMANENT GOOGLE MAPS EMBED URL FOR MARIWENYI, KENYA
                                src="http://googleusercontent.com/maps.google.com/6"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- */}

            {/* CTA Section */}
            <section className="bg-orange-500 py-16 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-3xl font-bold">
                        Join Our Mission
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg">
                        Whether you want to donate, volunteer, or learn more
                        about our program, we're here to help. Get in touch
                        today!
                    </p>
                </div>
            </section>
        </>
    );
}