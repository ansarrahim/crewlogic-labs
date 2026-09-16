import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import AutomationShowcase from "@/components/AutomationShowcase";
import ByDepartment from "@/components/ByDepartment";
import CaseStudies from "@/components/CaseStudies";
import OurStack from "@/components/OurStack";
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
        <ByDepartment />
        <CaseStudies track="automation" />
        <OurStack />
        <FreeAuditSection />
        <ContactSection />
      </main>
      <Footer />
      <NexusChatWidget />
    </div>
  );
}
