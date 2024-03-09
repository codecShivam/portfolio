"use client"; import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbarMenu";
import { cn } from "@/util/cn";
import { socialLinks } from "@/constants/socialLinks";

interface NavbarProps {
    className?: string;
}

export function Navbar() {
    const [showNavbar, setShowNavbar] = useState(false);

    // Handle scroll event to toggle the visibility of the navbar
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setShowNavbar(scrollPosition > screen.height / 2);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);



    return (
        <div className="relative w-full flex items-center  justify-center">
            {/*Show navbar when showNavbar becomes true*/}
            {showNavbar && <NavbarDemo className="top-0 " />}
        </div>
    );
}

export function NavbarDemo({ className }: NavbarProps) {
    const [active, setActive] = useState<string | null>(null);

    return (
        <div className={cn("fixed inset-x-0  max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Sections">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/web-dev">About</HoveredLink>
                        <HoveredLink href="/interface-design">Projects</HoveredLink>
                        <HoveredLink href="/seo">Open Source Contributions</HoveredLink>
                        <HoveredLink href="/branding">Contact</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Blogs">
                    <div className="  text-sm grid grid-cols-auto gap-10 p-4">
                        <ProductItem
                            title="command-line tool using TypeScript"
                            href="https://codecshivam.hashnode.dev/command-line-tool-using-typescript"
                            src="/images/TSDiffTool.jpg"
                            description="File Differences with TypeScript and Dynamic Programming"
                        />
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Social">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href={socialLinks.twitter}>Twitter</HoveredLink>
                        <HoveredLink href={socialLinks.linkedin}>LinkedIn</HoveredLink>
                        <HoveredLink href={socialLinks.github}>Github</HoveredLink>
                        <HoveredLink href={socialLinks.hashnode}>Hashnode</HoveredLink>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}