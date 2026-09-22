import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PersonalProjectsPreview from "@/components/PersonalProjectsPreview";
import HowItWorks from "@/components/HowItWorks";
import AutomationShowcase from "@/components/AutomationShowcase";
import ByDepartment from "@/components/ByDepartment";
import CaseStudies from "@/components/CaseStudies";
import OurStack from "@/components/OurStack";
import FreeAuditSection from "@/components/FreeAuditSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import NexusChatWidget from "@/components/NexusChatWidget";
import { fetchGithubRepos } from "@/lib/github";

export const revalidate = 3600;

export default async function Home() {
  const { repos } = await fetchGithubRepos();

  return (
    <div className="flex flex-1 flex-col bg-slate-950 font-sans">
      <Navbar />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <PersonalProjectsPreview repos={repos} />
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
