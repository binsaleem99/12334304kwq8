import React from "react";
import Hero from "../../components/landing/Hero.tsx";
import PromptHub from "../../components/landing/PromptHub.tsx";
import Features from "../../components/landing/Features.tsx";
import Pricing from "../../components/landing/Pricing.tsx";
import SocialProof from "../../components/landing/SocialProof.tsx";
import FinalCTA from "../../components/landing/FinalCTA.tsx";

export default function LandingPage() {
  const handleNoOp = () => {};
  
  return (
    <>
      <Hero />
      <PromptHub onNavigate={handleNoOp} />
      <Features />
      <Pricing />
      <SocialProof />
      <FinalCTA onNavigate={handleNoOp} />
    </>
  );
}