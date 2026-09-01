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
  GraduationCap
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
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
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              id="close-resume-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div id="printable-resume-body" className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 text-slate-200 text-xs bg-slate-900 leading-relaxed font-sans print:bg-white print:text-black print:p-0">
          
          {/* Header Block */}
          <div className="border-b-2 border-slate-700 pb-5 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {photoUrl && (
                  <div className="w-16 h-20 sm:w-18 sm:h-22 rounded-xl overflow-hidden border-2 border-cyan-500/40 shrink-0 shadow-md bg-slate-950">
                    <img
                      src={photoUrl}
                      alt={personalInfo.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                    NAKKA TANUJ SEKHAR
                  </h1>
                </div>
              </div>
            </div>

            {/* Links & Contact Info in 2 columns like the resume */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white">LinkedIn:</span>
                  <a 
                    href={personalInfo.linkedin} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-cyan-400 hover:underline"
                  >
                    linkedin.com/in/tanuj-sekhar-nakka-61608037a
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white">GitHub:</span>
                  <a 
                    href={personalInfo.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-cyan-400 hover:underline"
                  >
                    https://github.com/tanujsekhar1830
                  </a>
                </div>
              </div>

              <div className="space-y-1 sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <span className="font-bold text-white">Email:</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-cyan-400 hover:underline">
                    {personalInfo.email}
                  </a>
                  <button
                    onClick={() => copyToClipboard(personalInfo.email, 'email')}
                    title="Copy Email"
                    className="text-slate-400 hover:text-white cursor-pointer ml-1"
                  >
                    {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <span className="font-bold text-white">Mobile:</span>
                  <span className="text-slate-200">{personalInfo.phone}</span>
                  <button
                    onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                    title="Copy Mobile"
                    className="text-slate-400 hover:text-white cursor-pointer ml-1"
                  >
                    {copiedField === 'phone' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section: SKILLS */}
          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              SKILLS
            </h2>
            <div className="space-y-1.5 pl-2 text-xs">
              <div>
                <strong className="text-white">• Languages:</strong> <span className="text-slate-300">Python, JavaScript, C, C ++, SQL</span>
              </div>
              <div>
                <strong className="text-white">• Technologies:</strong> <span className="text-slate-300">HTML, CSS, Object-Oriented Programming, DBMS</span>
              </div>
              <div>
                <strong className="text-white">• Databases/Tools:</strong> <span className="text-slate-300">MySQL, Arduino IDE, Git, GitHub, VS Code, Microsoft Office</span>
              </div>
              <div>
                <strong className="text-white">• Soft Skills:</strong> <span className="text-slate-300">Problem solving, Team collaboration, Time management, Adaptability, Communication</span>
              </div>
            </div>
          </div>

          {/* Section: PROJECTS */}
          <div className="space-y-4">
            <h2 className="text-sm font-extrabold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              PROJECTS
            </h2>

            {/* Project 1 */}
            <div className="space-y-1 pl-2">
              <div className="flex flex-wrap justify-between items-baseline font-bold text-white text-xs sm:text-sm">
                <span>Python Programming Teaching – Community Development Project (CDP)</span>
                <span className="text-slate-400 font-medium text-xs">JULY 2026</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-slate-300 text-xs">
                <li>Taught fundamental Python concepts including variables, data types, operators, conditional statements, loops, and basic programming logic.</li>
                <li>Delivered practical coding demonstrations and hands-on exercises to help students understand programming concepts effectively.</li>
                <li>Developed students' foundational programming and problem-solving skills through interactive learning activities.</li>
                <li><span className="text-slate-400 font-medium">Tech Stack: Python, VS Code.</span></li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="space-y-1 pl-2">
              <div className="flex flex-wrap justify-between items-baseline font-bold text-white text-xs sm:text-sm">
                <span>Agri Platform Website</span>
                <span className="text-slate-400 font-medium text-xs">Feb 2026</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-slate-300 text-xs">
                <li>Developed a web-based agricultural platform designed to provide users with agriculture-related information and digital resources through a centralized interface.</li>
                <li>Designed and implemented a user-friendly website interface to organize agricultural content and improve accessibility for users.</li>
                <li>Implemented responsive web pages and interactive components to provide a smooth and engaging user experience.</li>
                <li>Applied web development concepts to structure, style, and enhance the functionality of the platform.</li>
                <li><span className="text-slate-400 font-medium">Tech Stack: HTML, CSS, JavaScript</span></li>
              </ul>
            </div>

            {/* Project 3 */}
            <div className="space-y-1 pl-2">
              <div className="flex flex-wrap justify-between items-baseline font-bold text-white text-xs sm:text-sm">
                <span>Smart Helmet with Accident Detection and Emergency Alert System</span>
                <span className="text-slate-400 font-medium text-xs">April 2026</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-slate-300 text-xs">
                <li>Developed a smart safety helmet system for accident and crash detection using sensors and an IoT-enabled microcontroller.</li>
                <li>Integrated vibration and IR sensors to detect potential accident conditions and trigger an emergency alert mechanism.</li>
                <li>Implemented buzzer-based warning and emergency interaction features to improve rider safety during critical situations.</li>
                <li>Enabled location-based emergency notification functionality for sharing the accident location with the concerned person.</li>
                <li><span className="text-slate-400 font-medium">Tech Stack: ESP8266, IR Sensor, Vibration Sensor, Buzzer, IoT</span></li>
              </ul>
            </div>
          </div>

          {/* Section: TRAINING */}
          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              TRAINING
            </h2>
            <div className="pl-2 space-y-1">
              <div className="flex flex-wrap justify-between items-baseline font-bold text-white text-xs sm:text-sm">
                <span>Lovely Professional University</span>
                <span className="text-slate-400 font-medium text-xs">July 2026</span>
              </div>
              <div className="font-semibold text-slate-200 text-xs">
                Community Development Project (Python Teaching)
              </div>
              <ul className="list-disc list-outside ml-4 text-slate-300 text-xs space-y-1">
                <li>Completed structured training in <strong className="text-white">Python programming fundamentals and problem-solving</strong>.</li>
                <li>Developed understanding of Python syntax, data types, operators, conditional statements, loops, functions, and basic programming concepts.</li>
                <li>Applied Python concepts through practical coding exercises and programming problems.</li>
              </ul>
            </div>
          </div>

          {/* Section: CERTIFICATES */}
          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              CERTIFICATES
            </h2>
            <div className="pl-2 space-y-1.5 text-slate-300 text-xs">
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <span>• Agentic AI Course Certification — <strong className="text-white">Oracle</strong></span>
                <span className="text-slate-400">Aug 2026</span>
              </div>
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <span>• Python Programming Certification — <strong className="text-white">Infosys Springboard</strong></span>
                <span className="text-slate-400">July 2026</span>
              </div>
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <span>• Computer Programming Certification — <strong className="text-white">Neo Colab</strong></span>
                <span className="text-slate-400">May 2026</span>
              </div>
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <span>• AI Prompt Builder Hackathon — 6-Hour Hackathon — <strong className="text-white">Certificate of Participation</strong></span>
                <span className="text-slate-400">Feb 2026</span>
              </div>
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <span>• Leadership Attributes Certification — <strong className="text-white">EduTech Hub</strong></span>
                <span className="text-slate-400">Oct 2025</span>
              </div>
            </div>
          </div>

          {/* Section: ACHIEVEMENTS */}
          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              ACHIEVEMENTS
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-1 text-slate-300 text-xs">
              <li>Participated in a technical project at LPU in ECE249.</li>
              <li>Completed Infosys Springboard certification.</li>
              <li>Gained practical exposure to <strong className="text-white">AI prompting, generative AI, and problem-solving</strong> during the hackathon.</li>
            </ul>
          </div>

          {/* Section: EDUCATION */}
          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              EDUCATION
            </h2>
            <div className="pl-2 space-y-3 text-xs">
              {/* LPU */}
              <div className="space-y-0.5">
                <div className="flex flex-wrap justify-between items-baseline font-bold text-white">
                  <span>-Lovely Professional University</span>
                  <span className="text-slate-400 font-medium">Phagwara, Punjab</span>
                </div>
                <div className="flex flex-wrap justify-between text-slate-300">
                  <span className="italic">Bachelor of Technology - Computer Science and Engineering (AIML): <strong className="text-white not-italic">CGPA: 7.47</strong></span>
                  <span className="text-slate-400">Aug 2025 - Present</span>
                </div>
              </div>

              {/* Narayana */}
              <div className="space-y-0.5">
                <div className="flex flex-wrap justify-between items-baseline font-bold text-white">
                  <span>-Narayana Junior College</span>
                  <span className="text-slate-400 font-medium">Visakhapatnam, Andhra Pradesh</span>
                </div>
                <div className="flex flex-wrap justify-between text-slate-300">
                  <span className="italic">Higher Secondary Education; <strong className="text-white not-italic">Percentage: 97.3%</strong></span>
                  <span className="text-slate-400">May 2023 - Mar 2025</span>
                </div>
              </div>

              {/* DAV */}
              <div className="space-y-0.5">
                <div className="flex flex-wrap justify-between items-baseline font-bold text-white">
                  <span>-DAV HZL Senior Secondary School</span>
                  <span className="text-slate-400 font-medium">Dariba, Rajasthan</span>
                </div>
                <div className="flex flex-wrap justify-between text-slate-300">
                  <span className="italic">Secondary Education; <strong className="text-white not-italic">Percentage: 72.7%</strong></span>
                  <span className="text-slate-400">Jun 2022 - Mar 2023</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
