"use client";
import { useCurrentTheme } from "@/hooks/use-current-theme";
import { PricingTable } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import React from "react";

const PricingPage = () => {
  const currentTheme = useCurrentTheme();

  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 pt-[14vh] 2xl:pt-32">
        <div className="flex flex-col items-center">
          <Image
            src={`/logo.svg`}
            alt="vibe"
            width={50}
            height={50}
            className="hidden md:block"
          />
        </div>
        <h1 className="text-xl md:text-3xl font-bold text-center">Pricing</h1>
        <p className="text-muted-foreground text-center text-sm md:text-base">
          Choose the plan that fits your needs
        </p>
        <PricingTable
          appearance={{
            baseTheme: currentTheme === "dark" ? dark : undefined,
            elements: {
              pricingTableCard: "border! shadow-none! rounded-lg! ",
            },
          }}
        />
      </section>
    </div>
  );
};

export default PricingPage;
