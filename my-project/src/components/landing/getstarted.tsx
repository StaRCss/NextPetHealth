import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";
// This component is used to render a "Get Started" button that links to the signup page
export default function GetStarted() {
return (
	<div>
		  <Link
             href="/signup"
             className="btn-donate inline-flex items-center justify-center gap-3"
            aria-label="Get started with tracking your pet's health">
            <span>Get Started</span>
            <ChevronRight className="w-5 h-5" />
            </Link>
	</div>
)

}