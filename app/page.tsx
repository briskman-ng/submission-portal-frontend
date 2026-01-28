import Navbar from "@/components/LandingPage/Navbar";
import HeroSection from "@/components/LandingPage/HeroSection";
import WhatYouCanSubmit from "@/components/LandingPage/WhatYouCanSubmit";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import SubmissionForm from "@/components/LandingPage/SubmissionForm";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <HeroSection />
      <WhatYouCanSubmit />
      <HowItWorks />
      <div className="my-20 ">
        <SubmissionForm />
      </div>
    </div>
  );
}
