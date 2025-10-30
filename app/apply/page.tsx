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
import { Download, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { submitScholarshipApplication } from "@/app/actions/scholarship";

export default function ApplyPage() {
    const [activeTab, setActiveTab] = useState("details");
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

                        {/* Program Details Tab */}
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

                        {/* Application Form Tab */}
                        <TabsContent value="application">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Scholarship Application Form
                                    </CardTitle>
                                    <CardDescription>
                                        Fill out the form below to apply for a
                                        scholarship
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
                                    >
                                        Loading…
                                    </iframe>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </>
    );
}
