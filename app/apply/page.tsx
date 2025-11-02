"use client";

import type React from "react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Download,
    Mail,
    FormInput,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { submitScholarshipApplication } from "@/app/actions/scholarship";

// Define a new type for the choice between online/download
type ApplicationMethod = "online" | "download" | null;

export default function ApplyPage() {
    const [activeTab, setActiveTab] = useState("details");
    const [applicationMethod, setApplicationMethod] =
        useState<ApplicationMethod>(null); // State to manage the user's choice
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<{
        success: boolean;
        message?: string;
        error?: string;
        referenceNumber?: string;
    } | null>(null);
    const [formData, setFormData] = useState({
        studentName: "",
        schoolLevel: "",
        school: "",
        currentlyInSchool: "",
        kcpeResults: "",
        parentName: "",
        parentOccupation: "",
        parentIncome: "",
        siblings: "",
        previousSponsor: "",
        lastTermFees: "",
        presentTermFees: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (formData: FormData) => {
        startTransition(() => {
            (async () => {
                const result = await submitScholarshipApplication(formData);
                setResult(result);

                if (result.success) {
                    // Reset form
                    setFormData({
                        studentName: "",
                        schoolLevel: "",
                        school: "",
                        currentlyInSchool: "",
                        kcpeResults: "",
                        parentName: "",
                        parentOccupation: "",
                        parentIncome: "",
                        siblings: "",
                        previousSponsor: "",
                        lastTermFees: "",
                        presentTermFees: "",
                    });
                    // Scroll to top to show success message
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            })();
        });
    };

    // --- Components for Application Choices ---

    const ApplicationChoices = () => (
        <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-center text-gray-700">
                Choose Your Application Method
            </h3>
            <p className="text-center text-gray-500 mb-8">
                Select the option that works best for you. Both methods are
                equally considered.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Option 1: Online Form */}
                <Card
                    className="cursor-pointer hover:shadow-lg transition duration-300 border-blue-500/50"
                    onClick={() => setApplicationMethod("online")}
                >
                    <CardHeader className="text-center">
                        <FormInput className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                        <CardTitle>Option 1: Fill Online Form</CardTitle>
                        <CardDescription>
                            Complete the application directly via Google Forms.
                            Requires an active internet connection.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Button
                            type="button"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                            Start Online Application
                        </Button>
                    </CardContent>
                </Card>

                {/* Option 2: Download & Email */}
                <Card
                    className="cursor-pointer hover:shadow-lg transition duration-300 border-green-500/50"
                    onClick={() => setApplicationMethod("download")}
                >
                    <CardHeader className="text-center">
                        <Download className="h-10 w-10 text-green-600 mx-auto mb-2" />
                        <CardTitle>Option 2: Download & Submit</CardTitle>
                        <CardDescription>
                            Download the PDF, fill it out offline, and email the
                            scanned copy to us.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-green-600 text-green-600 hover:bg-green-50"
                        >
                            View Download Instructions
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    const OnlineForm = () => (
        <Card>
            <CardHeader>
                <CardTitle>Online Scholarship Application</CardTitle>
                <CardDescription>
                    Fill out the Google Form below to apply for a scholarship.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLScAVp2FvTrmJ4VTLR9txEG6vllV3vsCSYEAlhTz9WURdlAOGg/viewform?embedded=true"
                    width="100%"
                    height="1975"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    title="Scholarship Application Form"
                >
                    Loading…
                </iframe>
                <Button
                    onClick={() => setApplicationMethod(null)}
                    variant="link"
                    className="mt-4"
                >
                    &larr; Back to Application Options
                </Button>
            </CardContent>
        </Card>
    );

    const DownloadFormInstructions = () => (
        <Card>
            <CardHeader>
                <CardTitle>Download & Email Application</CardTitle>
                <CardDescription>
                    Follow the steps below to complete your application offline.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-3">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                        <Download className="h-5 w-5 text-blue-600" /> Step 1:
                        Download the Form
                    </h4>
                    <p>
                        Click the button below to download the official PDF
                        application form.
                    </p>
                    <a href="/uploads/general/form.pdf" download>
                        <Button
                            type="button"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                        >
                            <Download className="h-4 w-4" /> Download Application
                            Form (PDF)
                        </Button>
                    </a>
                </div>

                <div className="space-y-3">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                        <FormInput className="h-5 w-5 text-blue-600" /> Step 2:
                        Fill Out and Scan
                    </h4>
                    <p>
                        Print the downloaded PDF form, fill it out completely,
                        and ensure all required documents are attached. Then,
                        scan the completed form and documents into a single PDF
                        file.
                    </p>
                </div>

                <div className="space-y-3">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                        <Mail className="h-5 w-5 text-blue-600" /> Step 3: Email
                        Submission
                    </h4>
                    <p>
                        Email the final scanned PDF document to our application
                        submission address:
                    </p>
                    <a
                        href="mailto:applications@mym.org"
                        className="font-mono text-blue-600 hover:underline"
                    >
                        applications@mym.org
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                        **Subject Line:** [Student Name] - Scholarship Application
                    </p>
                </div>

                <Button
                    onClick={() => setApplicationMethod(null)}
                    variant="link"
                >
                    &larr; Back to Application Options
                </Button>
            </CardContent>
        </Card>
    );

    // --- Main Render Function ---

    const renderApplicationContent = () => {
        switch (applicationMethod) {
            case "online":
                return <OnlineForm />;
            case "download":
                return <DownloadFormInstructions />;
            case null:
            default:
                return <ApplicationChoices />;
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="mb-6 text-4xl font-bold md:text-5xl">
                        Apply for Sponsorship
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-lg">
                        We offer scholarships to bright and needy high school
                        students to help them achieve their academic potential.
                    </p>
                </div>
            </section>

            {/* Success/Error Message */}
            {result && (
                <section className="py-8">
                    <div className="container mx-auto px-4">
                        <div
                            className={`max-w-4xl mx-auto p-6 rounded-lg border-2 ${
                                result.success
                                    ? "bg-green-50 border-green-200 text-green-800"
                                    : "bg-red-50 border-red-200 text-red-800"
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                {result.success ? (
                                    <CheckCircle className="h-8 w-8 flex-shrink-0" />
                                ) : (
                                    <AlertCircle className="h-8 w-8 flex-shrink-0" />
                                )}
                                <div>
                                    <h3 className="text-xl font-bold mb-2">
                                        {result.success
                                            ? "Application Submitted Successfully!"
                                            : "Application Error"}
                                    </h3>
                                    <p className="text-lg">
                                        {result.success
                                            ? result.message
                                            : result.error}
                                    </p>
                                    {result.referenceNumber && (
                                        <p className="mt-2 text-sm font-mono bg-white/50 px-3 py-1 rounded">
                                            Reference: {result.referenceNumber}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Application Information */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="mx-auto max-w-4xl"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="details">
                                Program Details
                            </TabsTrigger>
                            <TabsTrigger value="application">
                                Application Form
                            </TabsTrigger>
                        </TabsList>

                        {/* Program Details Tab (Unchanged) */}
                        <TabsContent value="details">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Bursary Program Details
                                    </CardTitle>
                                    <CardDescription>
                                        Information about our scholarship
                                        program
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">
                                            Application Timeline
                                        </h3>
                                        <p>
                                            Forms are usually picked in April of
                                            every year, but they can be picked
                                            any time in the year. Forms are
                                            filled and returned and they undergo
                                            assessment. The students who fit the
                                            criteria are put in a waiting list,
                                            as search of sponsors starts.
                                            Sponsorship is based on availability
                                            of sponsorship.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">
                                            Selection Process
                                        </h3>
                                        <p>
                                            We use a thorough screening process
                                            to identify these students and keep
                                            all the records for anyone who
                                            wishes to audit the programme. So
                                            far, 3 have finished successfully
                                            and one even attained C+ which is
                                            enough for university entry, but is
                                            pursuing their dream to do nursing.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">
                                            What We Provide
                                        </h3>
                                        <ul className="list-inside list-disc space-y-1">
                                            <li>
                                                Financial support for school
                                                fees
                                            </li>
                                            <li>Mentorship and guidance</li>
                                            <li>
                                                Academic support and monitoring
                                            </li>
                                            <li>
                                                Connection to a community of
                                                like-minded students
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button
                                            onClick={() =>
                                                setActiveTab("application")
                                            }
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            Apply Now
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Application Form Tab (Modified) */}
                        <TabsContent value="application">
                            {renderApplicationContent()}
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </>
    );
}
