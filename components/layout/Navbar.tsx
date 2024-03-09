"use client"; import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbarMenu";
import { cn } from "@/util/cn";

interface NavbarProps {
    className?: string;
}

export function Navbar() {
    const [showNavbar, setShowNavbar] = useState(false);

    // Handle scroll event to toggle the visibility of the navbar
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setShowNavbar(scrollPosition > screen.height );
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);



    return (
        <div className="relative w-full flex items-center  justify-center">
            {showNavbar && <NavbarDemo className="top-0 " />}
        </div>
    );
}

export function NavbarDemo({ className }: NavbarProps) {
    const [active, setActive] = useState<string | null>(null);

    return (
        <div className={cn("fixed inset-x-0  max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Services">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/web-dev">Web Development</HoveredLink>
                        <HoveredLink href="/interface-design">Interface Design</HoveredLink>
                        <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                        <HoveredLink href="/branding">Branding</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Products">
                    <div className="  text-sm grid grid-cols-auto gap-10 p-4">
                       
                         <ProductItem
                            title="command-line tool using TypeScript"
                            href="https://codecshivam.hashnode.dev/command-line-tool-using-typescript"
                            src="/images/TSDiffTool.jpg"
                            description="File Differences with TypeScript and Dynamic Programming"
                        />
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Pricing">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/hobby">Hobby</HoveredLink>
                        <HoveredLink href="/individual">Individual</HoveredLink>
                        <HoveredLink href="/team">Team</HoveredLink>
                        <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}