import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SimulatorsContainer } from './components/SimulatorsContainer';
import { SkillsSection } from './components/SkillsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ClassPresentationModal } from './components/ClassPresentationModal';
import { ResumeModal } from './components/ResumeModal';
import { ProfilePhotoProvider } from './context/ProfileContext';

export default function App() {
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [activeSimType, setActiveSimType] = useState<string>('iot-helmet');

  const handleJumpToSimulator = (type: string) => {
    setActiveSimType(type);
    const simSection = document.getElementById('simulators');
    if (simSection) {
      simSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ProfilePhotoProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-cyan-500/30 selection:text-cyan-200 antialiased overflow-x-hidden">
        {/* Top Sticky Navigation */}
        <Navbar
          onOpenPresentation={() => setIsPresentationOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Hero Introduction & Pitch */}
        <HeroSection
          onOpenPresentation={() => setIsPresentationOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onJumpToSimulator={handleJumpToSimulator}
        />

        {/* Flagship Projects Deep Dive */}
        <ProjectsSection
          onJumpToSimulator={handleJumpToSimulator}
        />

        {/* Interactive Classroom Simulator Suite */}
        <SimulatorsContainer
          activeSimType={activeSimType}
        />

        {/* Skills Matrix */}
        <SkillsSection />

        {/* Verified Certifications & Hackathons */}
        <CertificatesSection />

        {/* Academic Journey, Education & Achievements */}
        <EducationSection />

        {/* Direct Contact & Collaboration */}
        <ContactSection />

        {/* Footer */}
        <Footer
          onOpenPresentation={() => setIsPresentationOpen(true)}
        />

        {/* Full-Screen Interactive Class Presentation Slide Deck */}
        <ClassPresentationModal
          isOpen={isPresentationOpen}
          onClose={() => setIsPresentationOpen(false)}
          onJumpToSimulator={handleJumpToSimulator}
        />

        {/* Printable Recruiter-Ready Resume Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </ProfilePhotoProvider>
  );
}
