import { Project, SkillCategory, Certificate, EducationItem, AchievementItem, TrainingItem, PresentationSlide } from '../types';
import profilePhoto from '../assets/images/tanuj_profile_exact_1788089149242.jpg';

export const personalInfo = {
  name: "Nakka Tanuj Sekhar",
  photo: profilePhoto,
  title: "B.Tech CSE (AIML) • Lovely Professional University",
  shortBio: "B.Tech Computer Science and Engineering (AIML) student at Lovely Professional University. Passionate about Python programming, web development, IoT-embedded systems, and applied AI problem-solving.",
  email: "tanujsekhar18@gmail.com",
  phone: "+91-9784668230",
  whatsapp: "+919784668230",
  location: "Phagwara, Punjab / Visakhapatnam, India",
  linkedin: "https://www.linkedin.com/in/tanuj-sekhar-nakka-61608037a",
  github: "https://github.com/tanujsekhar1830",
  cgpa: "7.47",
  highestSchoolScore: "97.3%",
  status: "B.Tech CSE (AIML) • LPU",
  certificatesDriveUrl: "https://drive.google.com/drive/u/0/my-drive",
};

export const projectsData: Project[] = [
  {
    id: "python-cdp-teaching",
    title: "Python Programming Teaching – Community Development Project (CDP)",
    subtitle: "Interactive Pedagogy, Hands-on Mentorship & Fundamental Problem Solving",
    category: "Education & Community",
    date: "July 2026",
    featured: true,
    tagline: "Taught fundamental Python programming and problem-solving through interactive exercises and coding demonstrations.",
    overview: "Led a Community Development Project (CDP) at Lovely Professional University focused on teaching fundamental Python programming to students. Delivered structured hands-on coding demonstrations covering variables, data types, operators, conditional statements, loops, and basic programming logic to build foundational problem-solving skills.",
    highlights: [
      "Taught fundamental Python concepts including variables, data types, operators, conditional statements, loops, and basic programming logic.",
      "Delivered practical coding demonstrations and hands-on exercises to help students understand programming concepts effectively.",
      "Developed students' foundational programming and problem-solving skills through interactive learning activities."
    ],
    techStack: [
      { name: "Python", category: "Programming Language" },
      { name: "VS Code", category: "Development Tool" }
    ],
    problemStatement: "Beginner learners often encounter steep learning curves when learning programming logic and core syntax without structured hands-on guidance.",
    solutionArchitecture: "Structured interactive learning curriculum: Conceptual Introduction -> Live Practical Demonstration -> Guided Hands-on Exercises -> Foundational Problem-Solving Drills.",
    classTalkingPoints: [
      "Pedagogy of breaking down core computational logic (loops, conditionals, data structures) for beginners.",
      "How delivering hands-on coding exercises accelerated students' understanding.",
      "How teaching deepened my personal mastery of Python programming fundamentals and debugging."
    ],
    keyChallenges: [
      "Designing interactive coding exercises suitable for students with varying background knowledge.",
      "Ensuring active student engagement and conceptual clarity across loops and conditional structures."
    ],
    metrics: [
      { label: "Core Modules", value: "Loops & Data Types" },
      { label: "Interactive Labs", value: "Practical Exercises" },
      { label: "Pedagogy Impact", value: "Foundational Logic" }
    ],
    demoType: "python-teaching",
    links: {
      github: "https://github.com/tanujsekhar1830",
    }
  },
  {
    id: "agri-platform",
    title: "Agri Platform Website",
    subtitle: "Web-Based Agricultural Information & Resource Platform",
    category: "Web Development",
    date: "Feb 2026",
    featured: true,
    tagline: "Centralized web platform providing accessible agricultural information and digital resources.",
    overview: "Developed a responsive web-based agricultural platform designed to provide users with agriculture-related information and digital resources through a centralized interface. Designed and implemented a user-friendly website interface to organize agricultural content, improve accessibility, and provide engaging user experience.",
    highlights: [
      "Developed a web-based agricultural platform designed to provide users with agriculture-related information and digital resources through a centralized interface.",
      "Designed and implemented a user-friendly website interface to organize agricultural content and improve accessibility for users.",
      "Implemented responsive web pages and interactive components to provide a smooth and engaging user experience.",
      "Applied web development concepts to structure, style, and enhance the functionality of the platform."
    ],
    techStack: [
      { name: "HTML", category: "Markup Structure" },
      { name: "CSS", category: "Styling & Layout" },
      { name: "JavaScript", category: "Frontend Logic" }
    ],
    problemStatement: "Farmers and agricultural users often face fragmented access to critical crop cultivation advisories, market rates, and digital resources.",
    solutionArchitecture: "Modular client-side architecture with responsive pages, dynamic resource categorization, interactive crop advisory tools, and accessible UI.",
    classTalkingPoints: [
      "Design principles for accessibility and responsive layouts across mobile and desktop devices.",
      "Structuring semantic HTML and CSS for fast, reliable page loading.",
      "Vanilla JavaScript DOM interactions for interactive agricultural resource discovery."
    ],
    keyChallenges: [
      "Designing a clean, intuitive layout to organize rich agricultural resources without overwhelming users.",
      "Ensuring responsive rendering across diverse screen sizes."
    ],
    metrics: [
      { label: "Tech Stack", value: "HTML, CSS, JS" },
      { label: "Design", value: "User-Friendly UI" },
      { label: "Responsiveness", value: "Multi-Device" }
    ],
    demoType: "agri-platform",
    links: {
      github: "https://github.com/tanujsekhar1830",
    }
  },
  {
    id: "smart-helmet",
    title: "Smart Helmet with Accident Detection and Emergency Alert System",
    subtitle: "IoT Safety Helmet with Crash Sensing & Location Notification",
    category: "IoT & Hardware",
    date: "April 2026",
    featured: true,
    tagline: "IoT-enabled smart safety helmet with automated impact detection and emergency location alerts.",
    overview: "Developed a smart safety helmet system for accident and crash detection using sensors and an IoT-enabled microcontroller. Integrated vibration and IR sensors to detect potential accident conditions, trigger emergency buzzer warnings, and broadcast location-based emergency notifications to concerned contacts.",
    highlights: [
      "Developed a smart safety helmet system for accident and crash detection using sensors and an IoT-enabled microcontroller.",
      "Integrated vibration and IR sensors to detect potential accident conditions and trigger an emergency alert mechanism.",
      "Implemented buzzer-based warning and emergency interaction features to improve rider safety during critical situations.",
      "Enabled location-based emergency notification functionality for sharing the accident location with the concerned person."
    ],
    techStack: [
      { name: "ESP8266", category: "Microcontroller" },
      { name: "IR Sensor", category: "Proximity Sensor" },
      { name: "Vibration Sensor", category: "Impact Sensor" },
      { name: "Buzzer", category: "Warning Actuator" },
      { name: "IoT", category: "Telemetry & Alert" }
    ],
    problemStatement: "Motorcycle accident victims often experience delayed medical attention because accidents in isolated areas go unnoticed.",
    solutionArchitecture: "Vibration Sensor (Impact detection) + IR Sensor (Helmet wear verification) -> ESP8266 microcontroller -> Buzzer warning -> Location-based emergency alert notification.",
    classTalkingPoints: [
      "Dual sensor integration (IR + Vibration) to verify authentic accident events vs. false alarms.",
      "Microcontroller interrupt-driven alert triggers on ESP8266.",
      "Emergency notification workflow transmitting location coordinates to emergency contacts."
    ],
    keyChallenges: [
      "Calibrating vibration thresholds to prevent false alarms during normal rides.",
      "Coordinating buzzer warnings with automated location dispatch."
    ],
    metrics: [
      { label: "Sensors", value: "IR + Vibration" },
      { label: "Microcontroller", value: "ESP8266" },
      { label: "Alert Feature", value: "Location SOS" }
    ],
    demoType: "iot-helmet",
    links: {
      github: "https://github.com/tanujsekhar1830",
    }
  }
];

export const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    iconName: "Code2",
    skills: [
      { name: "Python", level: 92, experience: "Core programming language for problem solving, automation, and teaching", appliedIn: "Python CDP, Infosys Springboard" },
      { name: "JavaScript", level: 85, experience: "Web interactivity, DOM manipulation, responsive components", appliedIn: "Agri Platform Website" },
      { name: "C", level: 85, experience: "Core foundational programming, memory principles, algorithmic logic", appliedIn: "Neo Colab Coursework" },
      { name: "C++", level: 86, experience: "Object-oriented programming, data structures, and embedded firmware", appliedIn: "Coursework & Embedded Systems" },
      { name: "SQL", level: 82, experience: "Relational database querying, schema design, and data manipulation", appliedIn: "DBMS Coursework & MySQL" }
    ]
  },
  {
    category: "Technologies",
    iconName: "Layers",
    skills: [
      { name: "HTML", level: 90, experience: "Semantic webpage structure, document layout, accessible markup", appliedIn: "Agri Platform Website" },
      { name: "CSS", level: 88, experience: "Responsive styling, Flexbox, Grid layouts, and user interface styling", appliedIn: "Agri Platform Website" },
      { name: "Object-Oriented Programming", level: 86, experience: "Encapsulation, inheritance, polymorphism, modular software design", appliedIn: "Python, C++, System Design" },
      { name: "DBMS", level: 84, experience: "Database management concepts, relational models, transactions, and indexing", appliedIn: "MySQL & Academic Coursework" }
    ]
  },
  {
    category: "Databases & Tools",
    iconName: "Cpu",
    skills: [
      { name: "MySQL", level: 84, experience: "Relational database management, querying, tables, and views", appliedIn: "DBMS Labs & Projects" },
      { name: "Arduino IDE", level: 86, experience: "Flashing firmware, library integration, and hardware prototyping", appliedIn: "ESP8266 Smart Helmet Project" },
      { name: "Git", level: 88, experience: "Version control, branching, commits, and collaborative workflows", appliedIn: "Project Repository Management" },
      { name: "GitHub", level: 88, experience: "Remote repository hosting, documentation, and version control", appliedIn: "github.com/tanujsekhar1830" },
      { name: "VS Code", level: 92, experience: "Primary development IDE for Python, Web, and C++ code", appliedIn: "Python CDP & Web Projects" },
      { name: "Microsoft Office", level: 88, experience: "Documentation, presentation creation, and data organization", appliedIn: "Academic & Project Reporting" }
    ]
  },
  {
    category: "Soft Skills",
    iconName: "Users",
    skills: [
      { name: "Problem Solving", level: 94, experience: "Analytical thinking, debugging logic, and structured problem resolution", appliedIn: "Hackathons, Python Pedagogy" },
      { name: "Team Collaboration", level: 90, experience: "Coordinating with peers and working collaboratively on technical projects", appliedIn: "ECE249 Project, CDP Teaching" },
      { name: "Time Management", level: 88, experience: "Balancing academic coursework, project deliverables, and certifications", appliedIn: "Academic & Project Timelines" },
      { name: "Adaptability", level: 92, experience: "Quickly learning new technologies, IoT microcontrollers, and frameworks", appliedIn: "Hackathons & Technical Projects" },
      { name: "Communication", level: 92, experience: "Explaining complex technical concepts clearly to students and peers", appliedIn: "Python CDP Workshop Delivery" }
    ]
  }
];

export const trainingData: TrainingItem[] = [
  {
    id: "lpu-cdp-training",
    institution: "Lovely Professional University",
    program: "Community Development Project (Python Teaching)",
    duration: "July 2026",
    highlights: [
      "Completed structured training in Python programming fundamentals and problem-solving.",
      "Developed understanding of Python syntax, data types, operators, conditional statements, loops, functions, and basic programming concepts.",
      "Applied Python concepts through practical coding exercises and programming problems."
    ]
  }
];

export const certificatesData: Certificate[] = [
  {
    id: "oracle-agentic-ai",
    title: "Agentic AI Course Certification",
    issuer: "Oracle",
    date: "Aug 2026",
    certificateId: "330695306AAI26OFA",
    duration: "Oracle Certified Foundations Associate",
    type: "AI / Emerging Tech",
    badgeColor: "from-amber-500 to-red-500",
    skillsCovered: ["Agentic AI Architecture", "Autonomous AI Agents", "Workflow Orchestration", "Prompt Engineering"],
  },
  {
    id: "infosys-python-cert",
    title: "Python Programming Certification",
    issuer: "Infosys Springboard",
    date: "July 2026",
    credentialUrl: "https://verify.onwingspan.com",
    type: "Programming",
    badgeColor: "from-blue-600 to-cyan-500",
    skillsCovered: ["Python Fundamentals", "Control Flow & Loops", "Data Structures", "Problem Solving"],
  },
  {
    id: "neocolab-programming",
    title: "Computer Programming Certification",
    issuer: "Neo Colab",
    date: "May 2026",
    certificateId: "12CG2CH2Cl2Ce2Df3Bg1",
    duration: "Rigorous Computer Programming Training",
    type: "Programming",
    badgeColor: "from-teal-600 to-emerald-500",
    skillsCovered: ["Computer Programming", "Data Structures & Logic", "Algorithms", "Debugging"],
  },
  {
    id: "ai-prompt-hackathon",
    title: "AI Prompt Builder Hackathon — 6-Hour Hackathon",
    issuer: "Certificate of Participation",
    date: "Feb 2026",
    certificateId: "IX-202600PB070",
    duration: "6-Hour AI Hackathon",
    type: "Hackathon",
    badgeColor: "from-pink-600 to-rose-500",
    skillsCovered: ["AI Prompting", "Generative AI", "Problem-Solving", "Rapid Prototyping"],
  },
  {
    id: "edutech-leadership",
    title: "Leadership Attributes Certification",
    issuer: "EduTech Hub",
    date: "Oct 2025",
    certificateId: "EDU/10/25/LF-A525",
    type: "Leadership",
    badgeColor: "from-indigo-600 to-violet-500",
    skillsCovered: ["Leadership Attributes", "Team Collaboration", "Communication", "Decision Making"],
  }
];

export const achievementsData: AchievementItem[] = [
  {
    id: "ece249-project",
    title: "Technical Project Participation at LPU",
    category: "Technical Project",
    description: "Participated in a technical project at LPU in ECE249.",
    date: "2026"
  },
  {
    id: "infosys-springboard-cert",
    title: "Infosys Springboard Certification",
    category: "Professional Certification",
    description: "Completed Infosys Springboard certification.",
    date: "July 2026"
  },
  {
    id: "hackathon-generative-ai",
    title: "AI Prompting & Generative AI Exposure",
    category: "Hackathon & Emerging AI",
    description: "Gained practical exposure to AI prompting, generative AI, and problem-solving during the hackathon.",
    date: "Feb 2026"
  }
];

export const educationData: EducationItem[] = [
  {
    id: "lpu-btech",
    degree: "Bachelor of Technology - Computer Science and Engineering (AIML)",
    field: "Specialization: Artificial Intelligence & Machine Learning",
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    duration: "Aug 2025 - Present",
    score: "CGPA: 7.47",
    scoreLabel: "Current CGPA",
    isHighlight: false,
    courseworkOrFocus: [
      "Computer Science and Engineering (AIML)",
      "Python Programming fundamentals and problem-solving",
      "Object-Oriented Programming and DBMS"
    ]
  },
  {
    id: "narayana-junior",
    degree: "Higher Secondary Education",
    field: "Intermediate / MPC",
    institution: "Narayana Junior College",
    location: "Visakhapatnam, Andhra Pradesh",
    duration: "May 2023 - Mar 2025",
    score: "Percentage: 97.3%",
    scoreLabel: "Board Distinction",
    isHighlight: true,
    courseworkOrFocus: [
      "Higher Secondary Education with 97.3% Percentage",
      "Strong analytical and mathematical reasoning foundation"
    ]
  },
  {
    id: "dav-hzl",
    degree: "Secondary Education",
    field: "CBSE Curriculum",
    institution: "DAV HZL Senior Secondary School",
    location: "Dariba, Rajasthan",
    duration: "Jun 2022 - Mar 2023",
    score: "Percentage: 72.7%",
    scoreLabel: "Board Exam",
    isHighlight: false,
    courseworkOrFocus: [
      "Secondary Education with 72.7% Percentage",
      "Core foundation in Science and Mathematics"
    ]
  }
];

export const presentationSlides: PresentationSlide[] = [
  {
    id: "intro",
    title: "NAKKA TANUJ SEKHAR",
    subtitle: "B.Tech Computer Science and Engineering (AIML) • Lovely Professional University",
    section: "1. Profile Overview",
    speakerNotes: "Good morning/afternoon professors and fellow classmates. My name is Nakka Tanuj Sekhar, studying Computer Science & Engineering (AIML) at Lovely Professional University. Today, I am pleased to present my technical skills, engineering projects, training, and certifications.",
    bulletPoints: [
      "Name: NAKKA TANUJ SEKHAR",
      "Degree: Bachelor of Technology - Computer Science and Engineering (AIML) at Lovely Professional University (CGPA: 7.47)",
      "Education Highlights: 97.3% in Higher Secondary Education (Narayana Junior College)",
      "Technical Core: Python, JavaScript, C, C++, SQL, HTML, CSS, OOP, DBMS",
      "Tools: MySQL, Arduino IDE, Git, GitHub, VS Code, Microsoft Office"
    ],
    actionLabel: "View Full Resume Summary",
    actionTarget: "#resume"
  },
  {
    id: "python-teaching-slide",
    title: "Project 1: Python Programming Teaching – CDP",
    subtitle: "Community Development Project • July 2026",
    section: "2. Teaching & Mentorship Project",
    speakerNotes: "My first project is Python Programming Teaching under the Community Development Project (CDP) in July 2026. I taught fundamental Python concepts including variables, data types, operators, conditional statements, loops, and basic programming logic to beginner students.",
    bulletPoints: [
      "Taught fundamental Python concepts including variables, data types, operators, conditional statements, loops, and basic programming logic.",
      "Delivered practical coding demonstrations and hands-on exercises to help students understand programming concepts effectively.",
      "Developed students' foundational programming and problem-solving skills through interactive learning activities.",
      "Tech Stack: Python, VS Code"
    ],
    actionLabel: "Launch Python Visualizer",
    actionTarget: "python-demo"
  },
  {
    id: "agri-platform-slide",
    title: "Project 2: Agri Platform Website",
    subtitle: "Web Development Project • Feb 2026",
    section: "3. Web Development Project",
    speakerNotes: "My second project is the Agri Platform Website developed in February 2026 using HTML, CSS, and JavaScript. It is a web-based agricultural platform designed to provide users with agriculture-related information and digital resources through a centralized interface.",
    bulletPoints: [
      "Developed a web-based agricultural platform designed to provide users with agriculture-related information and digital resources through a centralized interface.",
      "Designed and implemented a user-friendly website interface to organize agricultural content and improve accessibility for users.",
      "Implemented responsive web pages and interactive components to provide a smooth and engaging user experience.",
      "Tech Stack: HTML, CSS, JavaScript"
    ],
    actionLabel: "Launch Agri Platform Portal",
    actionTarget: "agri-demo"
  },
  {
    id: "smart-helmet-slide",
    title: "Project 3: Smart Helmet with Accident Detection & Emergency Alert",
    subtitle: "IoT & Embedded Safety System • April 2026",
    section: "4. IoT Safety Project",
    speakerNotes: "My third project is the Smart Helmet with Accident Detection and Emergency Alert System completed in April 2026. Using an ESP8266 microcontroller with vibration and IR sensors, it detects accident conditions, sounds an audible buzzer, and sends location-based emergency notifications.",
    bulletPoints: [
      "Developed a smart safety helmet system for accident and crash detection using sensors and an IoT-enabled microcontroller.",
      "Integrated vibration and IR sensors to detect potential accident conditions and trigger an emergency alert mechanism.",
      "Implemented buzzer-based warning and emergency interaction features to improve rider safety during critical situations.",
      "Enabled location-based emergency notification functionality for sharing the accident location with the concerned person.",
      "Tech Stack: ESP8266, IR Sensor, Vibration Sensor, Buzzer, IoT"
    ],
    actionLabel: "Launch Live IoT Simulator",
    actionTarget: "iot-demo"
  },
  {
    id: "training-slide",
    title: "Training: Community Development Project (Python Teaching)",
    subtitle: "Lovely Professional University • July 2026",
    section: "5. Structured Training",
    speakerNotes: "Under structured training at Lovely Professional University in July 2026, I completed comprehensive training in Python programming fundamentals and problem-solving.",
    bulletPoints: [
      "Completed structured training in Python programming fundamentals and problem-solving.",
      "Developed understanding of Python syntax, data types, operators, conditional statements, loops, functions, and basic programming concepts.",
      "Applied Python concepts through practical coding exercises and programming problems."
    ],
    actionLabel: "View Training Details",
    actionTarget: "#education"
  },
  {
    id: "skills-slide",
    title: "Skills & Technical Competencies",
    subtitle: "Languages, Technologies, Databases/Tools, and Soft Skills",
    section: "6. Skills Matrix",
    speakerNotes: "Here is my structured skills matrix spanning Languages, Technologies, Databases/Tools, and Soft Skills.",
    bulletPoints: [
      "Languages: Python, JavaScript, C, C++, SQL",
      "Technologies: HTML, CSS, Object-Oriented Programming, DBMS",
      "Databases/Tools: MySQL, Arduino IDE, Git, GitHub, VS Code, Microsoft Office",
      "Soft Skills: Problem solving, Team collaboration, Time management, Adaptability, Communication"
    ],
    actionLabel: "Explore Skills Section",
    actionTarget: "#skills"
  },
  {
    id: "certs-education-slide",
    title: "Certificates, Achievements & Education",
    subtitle: "Oracle, Infosys Springboard, Neo Colab, Hackathon, EduTech Hub",
    section: "7. Credentials & Academic Journey",
    speakerNotes: "Here are my verified certifications, achievements, and academic credentials.",
    bulletPoints: [
      "Certificates: Oracle Agentic AI, Infosys Springboard Python, Neo Colab Computer Programming, AI Prompt Builder Hackathon (6-Hour), EduTech Hub Leadership",
      "Achievements: Technical project at LPU in ECE249; Completed Infosys Springboard cert; Practical exposure to AI prompting & generative AI",
      "Education: Lovely Professional University (B.Tech CSE AIML, CGPA: 7.47) | Narayana Junior College (97.3%) | DAV HZL (72.7%)"
    ],
    actionLabel: "View Full Resume",
    actionTarget: "#resume"
  },
  {
    id: "conclusion-qa",
    title: "Summary & Open for Questions",
    subtitle: "Thank You for Your Time & Consideration",
    section: "8. Q&A and Contact",
    speakerNotes: "Thank you for your time. I am open to answering any questions regarding my projects, training, and technical background.",
    bulletPoints: [
      "Name: NAKKA TANUJ SEKHAR",
      "Email: tanujsekhar18@gmail.com | Mobile: +91-9784668230",
      "LinkedIn: linkedin.com/in/tanuj-sekhar-nakka-61608037a",
      "GitHub: https://github.com/tanujsekhar1830"
    ],
    actionLabel: "Back to Portfolio Dashboard",
    actionTarget: "exit"
  }
];
