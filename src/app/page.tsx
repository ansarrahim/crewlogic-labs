import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LeadershipSection from "@/components/LeadershipSection";
import AgentGrid from "@/components/AgentGrid";
import CaseStudies from "@/components/CaseStudies";
import CLITerminal from "@/components/CLITerminal";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import NexusChatWidget from "@/components/NexusChatWidget";
import AgentToolsHost from "@/components/tools/AgentToolsHost";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-slate-950 font-sans">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <LeadershipSection />
        <AgentGrid />
        <CaseStudies />
        <CLITerminal />
        <ContactSection />
      </main>
      <Footer />
      <NexusChatWidget />
      <AgentToolsHost />
    </div>
  );
}
