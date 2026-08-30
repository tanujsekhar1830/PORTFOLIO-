import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  ExternalLink, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Download,
  GraduationCap
} from 'lucide-react';
import { personalInfo, projectsData, skillsData, certificatesData, educationData, achievementsData } from '../data/portfolioData';
import { useProfilePhoto } from '../context/ProfileContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { photoUrl } = useProfilePhoto();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto text-slate-100">
        {/* Header Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-sm text-white">Curriculum Vitae / Resume</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="print-resume-btn"
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              id="close-resume-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div id="printable-resume-body" className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 text-slate-200 text-xs bg-slate-900 leading-relaxed print:bg-white print:text-black print:p-0">
          {/* Header Block with Original Photo */}
          <div className="border-b border-slate-700 pb-5 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 sm:w-18 sm:h-24 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shrink-0 shadow-md bg-slate-950">
                  <img
                    src={photoUrl}
                    alt={personalInfo.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
                    {personalInfo.name}
                  </h1>
                  <p className="text-xs text-cyan-400 font-medium">
                    B.Tech Computer Science and Engineering • Lovely Professional University
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <div className="flex items-center sm:justify-end gap-2">
                  <span className="text-slate-400">Email:</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-cyan-400 hover:underline font-mono">
                    {personalInfo.email}
                  </a>
                  <button
                    onClick={() => copyToClipboard(personalInfo.email, 'email')}
                    title="Copy Email"
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="flex items-center sm:justify-end gap-2">
                  <span className="text-slate-400">Mobile:</span>
                  <span className="text-slate-200 font-mono">{personalInfo.phone}</span>
                  <button
                    onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                    title="Copy Mobile"
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400 text-cyan-400/90 underline">
                LinkedIn: tanuj-sekhar-nakka-61608037a
              </a>
              <span>•</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400 text-cyan-400/90 underline">
                GitHub: tanujsekhar1830
              </a>
            </div>
          </div>

          {/* Section: SKILLS */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              Skills
            </h2>
            <div className="grid grid-cols-1 gap-1.5 pl-2">
              <div><strong className="text-white">• Languages:</strong> Python, JavaScript, C, C++, SQL</div>
              <div><strong className="text-white">• Technologies:</strong> HTML, CSS, Object-Oriented Programming (OOP), DBMS</div>
              <div><strong className="text-white">• Databases/Tools:</strong> MySQL, Arduino IDE, Git, GitHub, VS Code, Microsoft Office</div>
              <div><strong className="text-white">• Soft Skills:</strong> Problem solving, Team collaboration, Time management, Adaptability, Communication</div>
            </div>
          </div>

          {/* Section: PROJECTS */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              Projects
            </h2>

            {/* Project 1 */}
            <div className="space-y-1.5 pl-2">
              <div className="flex justify-between items-baseline font-bold text-white text-xs sm:text-sm">
                <span>Python Programming Teaching – Community Development Project (CDP)</span>
                <span className="text-slate-400 font-normal font-mono text-[11px]">July 2026</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                <li>Community Development Project at Lovely Professional University.</li>
                <li>Taught fundamental Python concepts including variables, data types, operators, conditional statements, loops, and basic programming logic.</li>
                <li>Delivered practical coding demonstrations and hands-on exercises to help students understand programming concepts effectively.</li>
                <li>Developed students' foundational programming and problem-solving skills through interactive learning activities.</li>
                <li><span className="text-slate-400 font-mono">Tech Stack: Python, VS Code</span></li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="space-y-1.5 pl-2">
              <div className="flex justify-between items-baseline font-bold text-white text-xs sm:text-sm">
                <span>Agri Platform Website</span>
                <span className="text-slate-400 font-normal font-mono text-[11px]">Feb 2026</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                <li>Developed a web-based agricultural platform designed to provide users with agriculture-related information and digital resources through a centralized interface.</li>
                <li>Designed and implemented a user-friendly website interface to organize agricultural content and improve accessibility for users.</li>
                <li>Implemented responsive web pages and interactive components to provide a smooth and engaging user experience.</li>
                <li>Applied web development concepts to structure, style, and enhance the functionality of the platform.</li>
                <li><span className="text-slate-400 font-mono">Tech Stack: HTML, CSS, JavaScript</span></li>
              </ul>
            </div>

            {/* Project 3 */}
            <div className="space-y-1.5 pl-2">
              <div className="flex justify-between items-baseline font-bold text-white text-xs sm:text-sm">
                <span>Smart Helmet with Accident Detection and Emergency Alert System</span>
                <span className="text-slate-400 font-normal font-mono text-[11px]">April 2026</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                <li>Developed a smart safety helmet system for accident and crash detection using sensors and an IoT-enabled microcontroller.</li>
                <li>Integrated vibration and IR sensors to detect potential accident conditions and trigger an emergency alert mechanism.</li>
                <li>Implemented buzzer-based warning and emergency interaction features to improve rider safety during critical situations.</li>
                <li>Enabled location-based emergency notification functionality for sharing the accident location with the concerned person.</li>
                <li><span className="text-slate-400 font-mono">Tech Stack: ESP8266, IR Sensor, Vibration Sensor, Buzzer, IoT</span></li>
              </ul>
            </div>
          </div>

          {/* Section: TRAINING */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              Training & Experience
            </h2>
            <div className="pl-2 space-y-1">
              <div className="flex justify-between items-baseline font-bold text-white">
                <span>Lovely Professional University — Community Development Project (Python Teaching)</span>
                <span className="text-slate-400 font-normal font-mono text-[11px]">July 2026</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-0.5">
                <li>Completed structured training in Python programming fundamentals and problem-solving.</li>
                <li>Developed understanding of Python syntax, data types, operators, conditional statements, loops, functions, and basic programming concepts.</li>
                <li>Applied Python concepts through practical coding exercises and programming problems.</li>
              </ul>
            </div>
          </div>

          {/* Section: CERTIFICATES */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              Certificates
            </h2>
            <div className="pl-2 space-y-1 text-slate-300 text-[11px]">
              <div className="flex justify-between">
                <span>• Agentic AI Course Certification — <strong className="text-white">Oracle</strong></span>
                <span className="text-slate-400 font-mono">Aug 2026</span>
              </div>
              <div className="flex justify-between">
                <span>• Python Programming Certification — <strong className="text-white">Infosys Springboard</strong></span>
                <span className="text-slate-400 font-mono">July 2026</span>
              </div>
              <div className="flex justify-between">
                <span>• Computer Programming Certification — <strong className="text-white">Neo Colab</strong></span>
                <span className="text-slate-400 font-mono">May 2026</span>
              </div>
              <div className="flex justify-between">
                <span>• AI Prompt Builder Hackathon — 6-Hour Hackathon — <strong className="text-white">Certificate of Participation</strong></span>
                <span className="text-slate-400 font-mono">Feb 2026</span>
              </div>
              <div className="flex justify-between">
                <span>• Leadership Attributes Certification — <strong className="text-white">EduTech Hub</strong></span>
                <span className="text-slate-400 font-mono">Oct 2025</span>
              </div>
            </div>
          </div>

          {/* Section: ACHIEVEMENTS */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              Achievements
            </h2>
            <ul className="list-disc list-inside pl-2 space-y-1 text-slate-300 text-[11px]">
              <li>Successfully completed a Community Development Project involving Python teaching.</li>
              <li>Participated in a technical project at LPU in ECE249.</li>
              <li>Completed Infosys Springboard certification.</li>
              <li>Gained practical exposure to AI prompting, generative AI, and problem-solving during the hackathon.</li>
              <li>6-hour AI Prompt Builder Hackathon participation/certificate.</li>
            </ul>
          </div>

          {/* Section: EDUCATION */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              Education
            </h2>
            <div className="pl-2 space-y-2 text-[11px]">
              <div className="flex justify-between items-baseline font-bold text-white">
                <span>Lovely Professional University</span>
                <span className="text-slate-400 font-normal">Phagwara, Punjab</span>
              </div>
              <div className="flex justify-between text-slate-300 italic">
                <span>Bachelor of Technology - Computer Science and Engineering; <strong className="text-cyan-400 not-italic font-mono">CGPA: 7.47</strong></span>
                <span className="font-mono not-italic text-slate-400">Aug 2025 - Present</span>
              </div>

              <div className="flex justify-between items-baseline font-bold text-white pt-1">
                <span>Narayana Junior College</span>
                <span className="text-slate-400 font-normal">Visakhapatnam, Andhra Pradesh</span>
              </div>
              <div className="flex justify-between text-slate-300 italic">
                <span>Higher Secondary Education; <strong className="text-amber-400 not-italic font-mono">Percentage: 97.3%</strong></span>
                <span className="font-mono not-italic text-slate-400">May 2023 - Mar 2025</span>
              </div>

              <div className="flex justify-between items-baseline font-bold text-white pt-1">
                <span>DAV HZL Senior Secondary School</span>
                <span className="text-slate-400 font-normal">Dariba, Rajasthan</span>
              </div>
              <div className="flex justify-between text-slate-300 italic">
                <span>Secondary Education; <strong className="text-slate-200 not-italic font-mono">Percentage: 72.7%</strong></span>
                <span className="font-mono not-italic text-slate-400">Jun 2022 - Mar 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
