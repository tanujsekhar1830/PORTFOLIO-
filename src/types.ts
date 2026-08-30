export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'IoT & Hardware' | 'Web Development' | 'Education & Community';
  date: string;
  featured: boolean;
  tagline: string;
  overview: string;
  highlights: string[];
  techStack: { name: string; category: string }[];
  problemStatement: string;
  solutionArchitecture: string;
  classTalkingPoints: string[];
  keyChallenges: string[];
  metrics: { label: string; value: string }[];
  demoType: 'iot-helmet' | 'agri-platform' | 'python-teaching';
  links?: {
    github?: string;
    demo?: string;
  };
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 1 to 100
    experience: string;
    appliedIn: string;
  }[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string;
  credentialUrl?: string;
  certificateId?: string;
  duration?: string;
  signatory?: string;
  skillsCovered: string[];
  type: 'AI / Emerging Tech' | 'Programming' | 'Hackathon' | 'Leadership' | 'Security & AI';
  badgeColor: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  duration: string;
  score: string;
  scoreLabel: string;
  isHighlight?: boolean;
  courseworkOrFocus?: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  category: string;
  description: string;
  date?: string;
}

export interface PresentationSlide {
  id: string;
  title: string;
  subtitle: string;
  section: string;
  speakerNotes: string;
  bulletPoints: string[];
  actionLabel?: string;
  actionTarget?: string;
}
