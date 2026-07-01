import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-12">
      <div className="space-y-6 max-w-md">
        <div className="text-8xl animate-bounce">🍽️❓</div>
        <h1 className="text-4xl text-primary font-extrabold">Page Not Found!</h1>
        <p className="text-muted-foreground font-medium">
          Chongo must have shrunk this page so small that it disappeared! Let's head back to Cherry's restaurant to find Bailey and the team.
        </p>
        <Link href="/">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-5 rounded-2xl btn-squish">
            Back to Home Base
          </Button>
        </Link>
      </div>
    </div>
  );
}
