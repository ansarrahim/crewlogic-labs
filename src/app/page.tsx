import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import LeadershipSection from "@/components/LeadershipSection";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import CLITerminal from "@/components/CLITerminal";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import NexusChatWidget from "@/components/NexusChatWidget";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-slate-950 font-sans">
      <Navbar />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <HowItWorks />
        <LeadershipSection />
        <CaseStudies track="automation" />
        <Testimonials />
        <CLITerminal />
        <ContactSection />
      </main>
      <Footer />
      <NexusChatWidget />
    </div>
  );
}
