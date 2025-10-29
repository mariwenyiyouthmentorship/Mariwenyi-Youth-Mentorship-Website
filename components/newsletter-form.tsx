"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export default function NewsletterForm() {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<{
        success: boolean;
        message?: string;
        error?: string;
    } | null>(null);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        // 1. Prevent the browser's default form submission behavior
        event.preventDefault();

        // 2. Get the form data
        const formData = new FormData(event.currentTarget);

        // 3. Use startTransition to keep the UI interactive
        startTransition(() => {
            // 4. Call the server action and handle the result
            subscribeToNewsletter(formData).then((res) => {
                setResult(res);
                if (res.success) {
                    (event.target as HTMLFormElement).reset();
                }
            });
        });
    };

    return (
        <div className="space-y-4">
            <form
                id="newsletter-form"
                onSubmit={handleSubmit}
                className="space-y-3"
            >
                <Input
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-lg rounded-xl"
                    disabled={isPending}
                />
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 h-12 text-lg font-semibold rounded-xl"
                >
                    {isPending ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Subscribing...
                        </>
                    ) : (
                        <>
                            <Mail className="h-5 w-5 mr-2" />
                            Subscribe Now
                        </>
                    )}
                </Button>
            </form>

            {result && (
                <div
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                        result.success
                            ? "bg-green-500/20 text-green-300 border border-green-500/30"
                            : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }`}
                >
                    {result.success ? (
                        <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    ) : (
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    )}
                    <p className="text-sm">
                        {result.success ? result.message : result.error}
                    </p>
                </div>
            )}

            <p className="text-sm text-gray-400 leading-relaxed">
                Join 200+ subscribers receiving monthly updates with program
                news and success stories.
            </p>
        </div>
    );
}
