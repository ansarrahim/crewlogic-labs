import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import AutomationShowcase from "@/components/AutomationShowcase";
import CaseStudies from "@/components/CaseStudies";
import FreeAuditSection from "@/components/FreeAuditSection";
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
        <AutomationShowcase />
        <CaseStudies track="automation" />
        <FreeAuditSection />
        <ContactSection />
      </main>
      <Footer />
      <NexusChatWidget />
    </div>
  );
}
