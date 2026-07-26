import Hero from "@/pages/Hero";
import NavBar from "@/components/NavBar";
import ProjectsInfo from "@/components/ProjectsInfo";
import SkillsSection from "@/components/SkillsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center">
        <NavBar />
      </div>
      <Hero />
      <section id="section-2" className="w-full md:min-h-screen relative flex items-start 
      min-h-[160vh] md:items-center">
        <ProjectsInfo />
      </section>
      <section id="section-3" className="w-full relative z-10 bg-background">
        <SkillsSection />
      </section>
      <section id="section-4" className="w-full relative z-10 bg-background">
        <TestimonialsSection />
      </section>
      <div className="relative z-10 bg-background">
        <Footer />
      </div>
    </>
  );
}

