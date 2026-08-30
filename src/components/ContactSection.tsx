import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Linkedin, 
  Github, 
  Send, 
  Check, 
  Copy, 
  MapPin, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copied, setCopied] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Compose mailto fallback
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.open(mailtoUrl, '_blank');
    setIsSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-xs font-semibold text-cyan-400">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Open for technical discussions, engineering projects, internships, and university collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between group hover:border-cyan-500/40 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</div>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-bold text-white hover:text-cyan-300 font-mono">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <button
                id="copy-email-btn"
                onClick={() => handleCopy(personalInfo.email, 'email')}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
                title="Copy Email"
              >
                {copied === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between group hover:border-emerald-500/40 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mobile & WhatsApp</div>
                  <a href={`tel:${personalInfo.phone}`} className="text-sm font-bold text-white hover:text-emerald-300 font-mono">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <a
                  href={`https://wa.me/${personalInfo.whatsapp}?text=Hi%20Tanuj,%20I%20saw%20your%20portfolio!`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold rounded-lg hover:bg-emerald-900 transition flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </a>
                <button
                  id="copy-phone-btn"
                  onClick={() => handleCopy(personalInfo.phone, 'phone')}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
                  title="Copy Phone"
                >
                  {copied === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* LinkedIn & GitHub Grid */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 flex flex-col justify-between space-y-2 group transition"
              >
                <div className="flex items-center justify-between">
                  <Linkedin className="w-5 h-5 text-[#0077b5]" />
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">LinkedIn</div>
                  <div className="text-[10px] text-slate-400">Connect Professionally</div>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 flex flex-col justify-between space-y-2 group transition"
              >
                <div className="flex items-center justify-between">
                  <Github className="w-5 h-5 text-slate-200" />
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">GitHub</div>
                  <div className="text-[10px] text-slate-400">@tanujsekhar1830</div>
                </div>
              </a>
            </div>

            {/* Location */}
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Lovely Professional University, Phagwara, Punjab • Visakhapatnam, India</span>
            </div>
          </div>

          {/* Right Column: Interactive Quick Note Form */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-1">
              Send a Quick Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill in the fields below to trigger an immediate email draft or send project inquiries.
            </p>

            {isSubmitted ? (
              <div className="p-6 bg-emerald-950/40 border border-emerald-800/60 rounded-2xl text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Message Prepared & Dispatched!</h4>
                <p className="text-xs text-slate-300">
                  Thank you for reaching out to Nakka Tanuj Sekhar. I will respond to your message promptly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      placeholder="Prof. Sharma / Recruiter"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1.5">Your Email *</label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1.5">Subject / Topic</label>
                  <input
                    type="text"
                    id="contact-subject"
                    placeholder="Project Inquiry / Class Feedback / Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1.5">Your Message *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Write your note, feedback, or question for Tanuj here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="submit-contact-btn"
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message via Email</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
