"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Apply", href: "/apply" },
        { name: "Events & Gallery", href: "/events" },
        { name: "Donate", href: "/donate" },
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        //{ name: "Admin", href: "/admin/uploads" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="MYM_logo.png"
                            alt="Mariwenyi Youth Mentorship Logo"
                            width={40}
                            height={40}
                            className="h-10 w-10"
                        />
                        <span className="hidden font-bold sm:inline-block">
                            Mariwenyi Youth Mentorship
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        target="_blank"
                        href="https://forms.gle/Q6npEm2N1iPYahWq5"
                    >
                        <Button className="hidden bg-orange-500 hover:bg-orange-600 md:inline-flex">
                            Apply for Sponsorship →
                        </Button>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "block rounded-md px-3 py-2 text-base font-medium",
                                    pathname === item.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            target="_blank"
                            href="https://forms.gle/Q6npEm2N1iPYahWq5"
                            onClick={() => setIsMenuOpen(false)}
                            className="mt-4 block"
                        >
                            <Button className="w-full bg-orange-500 hover:bg-orange-600">
                                Apply for Scholarship
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
