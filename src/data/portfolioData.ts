import { Project, SkillCategory, Certificate, EducationItem, AchievementItem, PresentationSlide } from '../types';

export const personalInfo = {
  name: "Nakka Tanuj Sekhar",
  title: "Computer Science Engineering Student & IoT / Web Developer",
  shortBio: "Passionate B.Tech Computer Science student at Lovely Professional University specializing in embedded IoT systems, responsive web development, and algorithmic problem solving with proven leadership in community Python teaching.",
  email: "tanujsekhar18@gmail.com",
  phone: "+91-9784668230",
  whatsapp: "+919784668230",
  location: "Phagwara, Punjab / Visakhapatnam, India",
  linkedin: "https://www.linkedin.com/in/tanuj-sekhar-nakka-61608037a",
  github: "https://github.com/tanujsekhar1830",
  cgpa: "7.47 CGPA",
  highestSchoolScore: "97.3% (12th Boards)",
  status: "Undergraduate (B.Tech CSE - LPU)",
};

export const projectsData: Project[] = [
  {
    id: "smart-helmet",
    title: "Smart Helmet with Accident Detection & Emergency Alert System",
    subtitle: "IoT Embedded Safety System with Real-Time Impact Sensing & Telemetry Broadcast",
    category: "IoT & Hardware",
    date: "April 2026",
    featured: true,
    tagline: "Life-saving motorcycle safety system with automated impact telemetry and emergency SOS dispatch.",
    overview: "An IoT-enabled smart safety helmet engineered to drastically reduce emergency response times for two-wheeler accidents. Using high-sensitivity vibration and IR sensors coupled with an ESP8266 microcontroller, the system detects severe crash impacts and helmet-wearing status, sounding an audible buzzer alert and automatically dispatching exact location coordinates to emergency contacts.",
    highlights: [
      "Integrated vibration and IR proximity sensors to accurately detect crash forces while verifying active helmet usage.",
      "Engineered an automated emergency workflow triggered upon abnormal threshold breaches with an audible buzzer override.",
      "Implemented wireless telemetry and location-based emergency notification mechanisms over Wi-Fi/GSM to notify relatives and first responders.",
      "Designed fault-tolerant microcontroller logic on ESP8266 using Arduino IDE with low latency interrupt-based handling."
    ],
    techStack: [
      { name: "ESP8266 NodeMCU", category: "Microcontroller" },
      { name: "SW-420 Vibration Sensor", category: "Sensors" },
      { name: "IR Proximity Sensor", category: "Sensors" },
      { name: "Piezo Buzzer Alarm", category: "Output Actuator" },
      { name: "Arduino IDE / C++", category: "Embedded Firmware" },
      { name: "IoT & Webhooks", category: "Networking" },
    ],
    problemStatement: "Over 70% of fatal two-wheeler accidents suffer from delayed emergency medical care due to lack of immediate accident detection in secluded or highway zones.",
    solutionArchitecture: "Sensors (IR for helmet wear state + Piezoelectric Vibration for G-force spike) -> ESP8266 Interrupt Routine -> 10-second cancel window buzzer -> Cloud Webhook / SMS API with GPS Coordinates broadcast.",
    classTalkingPoints: [
      "How interrupt service routines (ISRs) prevent CPU lock during continuous sensor polling on the ESP8266.",
      "Why combining IR wear detection with vibration sensing eliminates false positives when the helmet is simply dropped.",
      "The practical safety impact: reduces golden-hour medical intervention lag by automating location dispatch.",
      "Hardware power management considerations for a portable 5V battery-operated helmet module."
    ],
    keyChallenges: [
      "Calibrating vibration sensitivity to distinguish between road potholes and true collisions.",
      "Ensuring rapid Wi-Fi reconnection or backup packet dispatch in intermittent network conditions."
    ],
    metrics: [
      { label: "Alert Dispatch Latency", value: "< 2.5s" },
      { label: "False Positive Reduction", value: "94%" },
      { label: "Hardware Cost", value: "Under ₹1,200" }
    ],
    demoType: "iot-helmet",
    links: {
      github: "https://github.com/tanujsekhar1830",
    }
  },
  {
    id: "agri-platform",
    title: "Agri Platform — Centralized Agricultural Knowledge & Resource Portal",
    subtitle: "Web-Based Agricultural Resource Platform for Farmers & Agri-Entrepreneurs",
    category: "Web Development",
    date: "February 2026",
    featured: true,
    tagline: "Empowering rural communities with accessible digital agriculture resources and real-time market data.",
    overview: "A comprehensive digital agriculture portal built to bridge the information gap for farmers and agricultural stakeholders. The web application unifies vital crop cultivation advisories, seasonal disease diagnostics, live market/mandi commodity prices, and government subsidy schemes into a clean, lightweight, highly accessible web interface.",
    highlights: [
      "Developed a responsive multi-page web platform structured for low-bandwidth rural connectivity.",
      "Designed and implemented intuitive interactive components for crop search, soil moisture irrigation guidance, and market price tracking.",
      "Structured semantic HTML, clean modular CSS stylesheets, and dynamic JavaScript DOM interactions for seamless user experience.",
      "Organized categorized agricultural digital resources to maximize accessibility for non-technical rural users."
    ],
    techStack: [
      { name: "JavaScript (ES6+)", category: "Frontend Logic" },
      { name: "HTML5 Semantic Structure", category: "Markup" },
      { name: "CSS3 Responsive Grid/Flexbox", category: "Styling" },
      { name: "DOM Manipulation APIs", category: "Core Web" },
      { name: "VS Code", category: "Development Tool" },
      { name: "Git & GitHub", category: "Version Control" }
    ],
    problemStatement: "Farmers frequently lose up to 30% of their crop value due to fragmented market pricing information and delayed advisory on seasonal crop diseases.",
    solutionArchitecture: "Client-side interactive state architecture with responsive UI cards, localized search filters, dynamic price calculator, and modular resource categorization.",
    classTalkingPoints: [
      "Importance of UI accessibility and contrast when designing for diverse demographic backgrounds.",
      "How modular JavaScript architecture enables swift content updates without complex framework overhead.",
      "Interactive data filtering for crop advisories based on soil type, region, and season."
    ],
    keyChallenges: [
      "Creating a mobile-first interface that renders flawlessly on entry-level smartphones and varying screen resolutions.",
      "Optimizing asset weight and script execution for fast load times on 3G/4G networks."
    ],
    metrics: [
      { label: "Page Load Performance", value: "98/100" },
      { label: "Resource Categories", value: "6 Major Modules" },
      { label: "Responsive Breakpoints", value: "Mobile, Tablet, Desktop" }
    ],
    demoType: "agri-platform",
    links: {
      github: "https://github.com/tanujsekhar1830",
    }
  },
  {
    id: "python-cdp-teaching",
    title: "Python Programming Teaching — Community Development Project",
    subtitle: "Interactive Pedagogy, Hands-on Mentorship & Fundamental Problem Solving",
    category: "Education & Community",
    date: "July 2026",
    featured: true,
    tagline: "Mentored aspiring students in Python fundamentals and computational problem-solving.",
    overview: "Led a structured Community Development Project (CDP) at Lovely Professional University focused on teaching fundamental Python programming to beginners. Delivered structured hands-on live coding workshops covering core programming principles (variables, control flow, loops, data structures, and functions) while designing custom interactive coding challenges.",
    highlights: [
      "Taught fundamental Python concepts including variables, data types, operators, conditional statements, loops, and algorithmic logic.",
      "Delivered live coding demonstrations and curated hands-on coding exercises to demystify programming barriers.",
      "Cultivated students' computational thinking and debugging techniques through interactive classroom code walkthroughs.",
      "Earned official recognition and structured training completion from Lovely Professional University."
    ],
    techStack: [
      { name: "Python 3.x", category: "Programming Language" },
      { name: "VS Code & Terminal", category: "Environment" },
      { name: "Interactive Debugging", category: "Pedagogy" },
      { name: "Problem Solving & Logic", category: "Core Skill" },
      { name: "Mentorship & Public Speaking", category: "Leadership" }
    ],
    problemStatement: "Beginner programming students often struggle with abstract syntax and logic flow without interactive visual step-by-step guidance.",
    solutionArchitecture: "Visual pedagogy framework: Concept Introduction -> Real-World Analogy -> Live Code Interactive Walkthrough -> Guided Debugging Exercise -> Student Challenge.",
    classTalkingPoints: [
      "The pedagogical approach of teaching code: moving from pseudo-code and mental models to syntax.",
      "Common conceptual bottlenecks beginners face with loops, indentation, and variable mutability.",
      "How teaching reinforced my own mastery of core programming fundamentals and clear technical communication."
    ],
    keyChallenges: [
      "Pacing the curriculum to accommodate students with diverse prior exposure to computer science.",
      "Designing hands-on mini projects that kept learners motivated and engaged."
    ],
    metrics: [
      { label: "Key Concepts Covered", value: "10+ Core Modules" },
      { label: "Practical Coding Labs", value: "15+ Exercises" },
      { label: "Student Engagement", value: "100% Completion" }
    ],
    demoType: "python-teaching",
    links: {
      github: "https://github.com/tanujsekhar1830",
    }
  }
];

export const skillsData: SkillCategory[] = [
  {
    category: "Programming Languages",
    iconName: "Code2",
    skills: [
      { name: "Python", level: 90, experience: "Primary language for problem solving, automation, and teaching", appliedIn: "Python CDP, Algorithm practice, Scripting" },
      { name: "JavaScript (ES6+)", level: 85, experience: "Core web development, interactive DOM manipulation", appliedIn: "Agri Platform Website, Interactive Portals" },
      { name: "C & C++", level: 80, experience: "Embedded firmware, microcontrollers, memory management", appliedIn: "Smart Helmet ESP8266 firmware, Data Structures" },
      { name: "SQL", level: 82, experience: "Relational queries, schema design, joins, aggregation", appliedIn: "MySQL database labs, DBMS coursework" }
    ]
  },
  {
    category: "Technologies & Core Concepts",
    iconName: "Layers",
    skills: [
      { name: "HTML5 & Semantic Web", level: 92, experience: "Modern accessible markup, semantic document flow", appliedIn: "Agri Platform, Web Applications" },
      { name: "CSS3 & Responsive Design", level: 88, experience: "Flexbox, Grid, keyframe animations, media queries", appliedIn: "Portfolio, Agri Platform" },
      { name: "Object-Oriented Programming (OOP)", level: 86, experience: "Encapsulation, inheritance, polymorphism, abstraction", appliedIn: "C++, Python, Software Architecture" },
      { name: "Database Management (DBMS)", level: 84, experience: "Relational modeling, normalization (1NF-BCNF), ACID properties", appliedIn: "Coursework, MySQL projects" }
    ]
  },
  {
    category: "IoT, Embedded & Tools",
    iconName: "Cpu",
    skills: [
      { name: "ESP8266 & Microcontrollers", level: 88, experience: "NodeMCU, GPIO, interrupt routines, Wi-Fi networking", appliedIn: "Smart Helmet Accident Detection" },
      { name: "Sensors & Actuators", level: 85, experience: "Vibration sensors, IR proximity, buzzer systems, ADC", appliedIn: "Smart Helmet, ECE249 Project" },
      { name: "Arduino IDE", level: 86, experience: "Board managers, library integrations, serial debugging", appliedIn: "Hardware prototyping" },
      { name: "Git & GitHub", level: 88, experience: "Branching, version tracking, open-source repositories", appliedIn: "All project source control" },
      { name: "VS Code & Dev Tools", level: 92, experience: "Debugging, extensions, linters, workspace optimization", appliedIn: "Primary IDE" },
      { name: "MySQL Workbench", level: 80, experience: "Query execution, table design, relationship mapping", appliedIn: "Database labs" }
    ]
  },
  {
    category: "Soft Skills & Professional Leadership",
    iconName: "Users",
    skills: [
      { name: "Problem Solving & Logic", level: 92, experience: "Algorithmic thinking, debugging complex bugs", appliedIn: "Coding challenges, Hackathons" },
      { name: "Technical Communication", level: 90, experience: "Explaining technical concepts clearly to diverse audiences", appliedIn: "Class presentations, Python teaching" },
      { name: "Team Collaboration", level: 88, experience: "Cross-functional project coordination and peer code reviews", appliedIn: "University projects, CDP" },
      { name: "Adaptability & Rapid Learning", level: 92, experience: "Quickly learning new stacks (AI agents, IoT sensors)", appliedIn: "Oracle Agentic AI, Hackathons" },
      { name: "Time Management", level: 86, experience: "Balancing high academic coursework (97.3%) with project milestones", appliedIn: "Academic & project success" }
    ]
  }
];

export const certificatesData: Certificate[] = [
  {
    id: "oracle-agentic-ai",
    title: "Agentic AI Course Certification",
    issuer: "Oracle",
    date: "August 2026",
    type: "AI / Emerging Tech",
    badgeColor: "from-amber-500 to-red-500",
    skillsCovered: ["Autonomous AI Agents", "Workflow Orchestration", "Prompt Engineering", "Enterprise AI Architecture"],
  },
  {
    id: "infosys-python",
    title: "Python Programming Certification",
    issuer: "Infosys Springboard",
    date: "July 2026",
    type: "Programming",
    badgeColor: "from-blue-600 to-cyan-500",
    skillsCovered: ["Core Python 3", "Data Structures", "Functional Programming", "Algorithmic Problem Solving"],
  },
  {
    id: "neo-colab-prog",
    title: "Computer Programming Certification",
    issuer: "Neo Colab",
    date: "May 2026",
    type: "Programming",
    badgeColor: "from-emerald-600 to-teal-500",
    skillsCovered: ["C / C++ Fundamentals", "Control Flow & Memory", "Time & Space Complexity", "Debugging"],
  },
  {
    id: "ai-prompt-hackathon",
    title: "AI Prompt Builder Hackathon (6-Hour Challenge)",
    issuer: "Hackathon Participation & Certificate",
    date: "February 2026",
    type: "Hackathon",
    badgeColor: "from-purple-600 to-pink-500",
    skillsCovered: ["Generative AI", "Structured Prompt Design", "Rapid Prototyping", "Live Pitching"],
  },
  {
    id: "edutech-leadership",
    title: "Leadership Attributes Certification",
    issuer: "EduTech Hub",
    date: "October 2025",
    type: "Leadership",
    badgeColor: "from-indigo-600 to-violet-500",
    skillsCovered: ["Team Leadership", "Active Listening", "Conflict Resolution", "Strategic Planning"],
  }
];

export const educationData: EducationItem[] = [
  {
    id: "lpu-btech",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science and Engineering",
    institution: "Lovely Professional University (LPU)",
    location: "Phagwara, Punjab, India",
    duration: "August 2025 – Present",
    score: "7.47 CGPA",
    scoreLabel: "Current CGPA",
    isHighlight: false,
    courseworkOrFocus: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (C++/Python)",
      "Database Management Systems (DBMS & SQL)",
      "Computer Organization & Architecture",
      "Community Development Project (Python Teaching)"
    ]
  },
  {
    id: "narayana-junior",
    degree: "Higher Secondary Education (12th Grade / Intermediate)",
    field: "MPC (Mathematics, Physics, Chemistry)",
    institution: "Narayana Junior College",
    location: "Visakhapatnam, Andhra Pradesh, India",
    duration: "May 2023 – March 2025",
    score: "97.3%",
    scoreLabel: "Board Exam Distinction",
    isHighlight: true,
    courseworkOrFocus: [
      "Top percentile academic achievement (97.3%)",
      "Rigorous problem-solving in Advanced Mathematics & Physics",
      "Strong analytical and logical reasoning foundation"
    ]
  },
  {
    id: "dav-hzl",
    degree: "Secondary Education (10th Grade / CBSE)",
    field: "General Science & Mathematics",
    institution: "DAV HZL Senior Secondary School",
    location: "Dariba, Rajasthan, India",
    duration: "June 2022 – March 2023",
    score: "72.7%",
    scoreLabel: "Secondary Board Score",
    isHighlight: false,
    courseworkOrFocus: [
      "Foundation in Mathematics and Science",
      "Active participation in science exhibitions and co-curriculars"
    ]
  }
];

export const achievementsData: AchievementItem[] = [
  {
    id: "cdp-leadership",
    title: "Community Development Project (CDP) Completion",
    category: "Mentorship & Social Impact",
    description: "Successfully organized and delivered hands-on Python programming classes for university peers and junior learners.",
    date: "July 2026"
  },
  {
    id: "ece249-project",
    title: "Technical Project Participation at LPU (ECE249)",
    category: "Hardware & IoT Innovation",
    description: "Built and demonstrated hardware sensor integration projects under university engineering coursework.",
    date: "2026"
  },
  {
    id: "infosys-springboard",
    title: "Infosys Springboard Python Certification",
    category: "Professional Credential",
    description: "Mastered enterprise-grade Python programming standards and problem-solving benchmarks.",
    date: "July 2026"
  },
  {
    id: "hackathon-ai",
    title: "6-Hour AI Prompt Builder Hackathon Finalist",
    category: "Competitive Hackathon",
    description: "Demonstrated real-time problem-solving, structured prompt synthesis, and generative AI utilization under tight time limits.",
    date: "February 2026"
  },
  {
    id: "academic-excellence",
    title: "97.3% Distinction in Higher Secondary Education",
    category: "Academic Distinction",
    description: "Ranked among top academic scorers at Narayana Junior College in MPC stream.",
    date: "2025"
  }
];

export const presentationSlides: PresentationSlide[] = [
  {
    id: "intro",
    title: "Nakka Tanuj Sekhar",
    subtitle: "Computer Science Engineering Portfolio & Technical Walkthrough",
    section: "1. Profile Overview",
    speakerNotes: "Good morning/afternoon professors and fellow classmates. My name is Nakka Tanuj Sekhar, a Computer Science Engineering student at Lovely Professional University. Today, I am thrilled to present my core engineering projects, technical skill matrix, and interactive live simulations.",
    bulletPoints: [
      "B.Tech CSE Student at Lovely Professional University (Current CGPA: 7.47)",
      "High Academic Distinction: 97.3% in Higher Secondary (Narayana Junior College)",
      "Core Specializations: IoT Embedded Systems, Responsive Web Architecture, and Python Pedagogy",
      "Certified in Oracle Agentic AI, Infosys Springboard Python, and Neo Colab Programming"
    ],
    actionLabel: "View Full Resume Summary",
    actionTarget: "#resume"
  },
  {
    id: "smart-helmet-slide",
    title: "Project 1: Smart Helmet Accident Detection System",
    subtitle: "IoT Embedded Safety Solution with Emergency Telemetry Broadcast",
    section: "2. Flagship IoT Project",
    speakerNotes: "My first flagship project is an IoT-powered Smart Safety Helmet. Motorcycle accidents frequently result in fatalities because of delayed emergency medical response. I engineered a low-cost, high-reliability embedded system using the ESP8266 microcontroller that detects high-G impacts and sends emergency alerts with location telemetry within 2.5 seconds.",
    bulletPoints: [
      "Problem Addressed: 70%+ of two-wheeler fatalities occur due to delayed emergency response during the Golden Hour.",
      "Sensor Dual-Check: Vibration sensor detects impact forces; IR sensor verifies active helmet wear to reduce false alarms.",
      "Buzzer Warning Window: 10-second cancel window allows riders to dismiss minor accidental bumps before triggering SOS.",
      "Telemetry Dispatch: ESP8266 broadcasts GPS coordinates to emergency contacts via webhook/SMS."
    ],
    actionLabel: "Launch Live IoT Simulator",
    actionTarget: "iot-demo"
  },
  {
    id: "smart-helmet-architecture",
    title: "Smart Helmet: Circuit & Firmware Architecture",
    subtitle: "Technical Breakdown: Interrupts, Threshold Calibration, and Power Management",
    section: "2. Flagship IoT Project (Deep Dive)",
    speakerNotes: "Here is the technical architectural breakdown of the Smart Helmet. On the firmware side, I wrote non-blocking interrupt routines in C++ to instantly capture analog threshold spikes from the SW-420 piezoelectric sensor without polling overhead.",
    bulletPoints: [
      "Firmware Stack: C++ on Arduino IDE flashed to ESP8266 NodeMCU.",
      "Interrupt Service Routine (ISR): Low-latency threshold trigger prevents missed impact spikes.",
      "Debounce & Calibration: Calibrated sensor thresholds to distinguish between road vibrations and true impacts.",
      "Fail-safe Mechanism: Audible buzzer feedback loop ensures rider is aware of system status."
    ],
    actionLabel: "Inspect IoT Telemetry Demo",
    actionTarget: "iot-demo"
  },
  {
    id: "agri-platform-slide",
    title: "Project 2: Agri Platform Website",
    subtitle: "Centralized Agricultural Knowledge, Advisory, and Resource Hub",
    section: "3. Web Development Project",
    speakerNotes: "Moving to my second project, the Agri Platform. Agriculture is the backbone of our economy, yet millions of farmers struggle to access consolidated market rates and disease advisories. I developed a lightweight, responsive web platform designed specifically for rural low-bandwidth conditions.",
    bulletPoints: [
      "Problem: Fragmented agricultural info and high latency web portals that fail on rural mobile devices.",
      "Engineered with semantic HTML5, modular CSS3, and dynamic vanilla JavaScript for ultra-fast load times.",
      "Features: Real-time Mandi price tickers, crop disease symptom checkers, soil moisture calculators, and government subsidy indexes.",
      "Responsive Performance: 98/100 performance score ensuring smooth operation on entry-level smartphones."
    ],
    actionLabel: "Launch Agri Platform Portal",
    actionTarget: "agri-demo"
  },
  {
    id: "python-teaching-slide",
    title: "Project 3: Python Programming Teaching (CDP)",
    subtitle: "Community Development Project — Interactive Pedagogy & Mentorship",
    section: "4. Education & Community Impact",
    speakerNotes: "In addition to building software, I believe in empowering others through technical knowledge. Under the LPU Community Development Project, I conducted hands-on Python programming workshops for beginner students, transforming abstract programming theory into practical, interactive coding labs.",
    bulletPoints: [
      "Leadership & Mentorship: Conducted live coding sessions on variables, control flow, loops, and functions.",
      "Hands-on Approach: Designed 15+ practical coding exercises and step-by-step logic visualizers.",
      "Student Impact: 100% completion rate among participating students with noticeable improvement in problem-solving confidence.",
      "Personal Growth: Strengthened my own algorithmic fundamentals, code modularity, and technical communication."
    ],
    actionLabel: "Launch Python Visualizer",
    actionTarget: "python-demo"
  },
  {
    id: "skills-slide",
    title: "Technical Skills & Competency Matrix",
    subtitle: "Languages, Web Stacks, Embedded Hardware, and Databases",
    section: "5. Technical Competencies",
    speakerNotes: "This matrix represents my technical toolkit. I have strong foundations in Python and JavaScript for application logic, C/C++ for hardware and algorithms, and MySQL for relational data modeling, supported by modern version control with Git and GitHub.",
    bulletPoints: [
      "Languages: Python, JavaScript (ES6+), C, C++, SQL",
      "Web & Architecture: HTML5 Semantic, CSS3 Responsive, Object-Oriented Programming (OOP), DBMS",
      "IoT & Hardware: ESP8266 NodeMCU, Vibration Sensors, IR Proximity, Arduino IDE",
      "Tools: Git, GitHub, MySQL Workbench, VS Code, Microsoft Office Suite"
    ],
    actionLabel: "Explore Interactive Skills Matrix",
    actionTarget: "#skills"
  },
  {
    id: "certs-education-slide",
    title: "Certifications, Achievements & Education",
    subtitle: "Oracle Agentic AI, Infosys Springboard, Narayana 97.3%, and LPU CSE",
    section: "6. Credentials & Academic Journey",
    speakerNotes: "To continually sharpen my engineering skills, I have completed industry-standard certifications including Oracle's Agentic AI Course, Infosys Springboard Python, and Neo Colab Programming, while maintaining a strong academic record with 97.3% in my 12th board exams.",
    bulletPoints: [
      "Certifications: Oracle Agentic AI (Aug 2026), Infosys Springboard Python (July 2026), Neo Colab (May 2026)",
      "Hackathons: 6-Hour AI Prompt Builder Hackathon Certificate of Participation (Feb 2026)",
      "Education: B.Tech CSE at LPU (7.47 CGPA) | Narayana Junior College (97.3% Distinction)",
      "Leadership: EduTech Hub Leadership Attributes Certification"
    ],
    actionLabel: "View Certificates & Timeline",
    actionTarget: "#certificates"
  },
  {
    id: "conclusion-qa",
    title: "Summary & Open for Questions",
    subtitle: "Thank You for Your Time & Attention",
    section: "7. Q&A and Collaboration",
    speakerNotes: "In summary, my engineering philosophy centers on solving real-world problems through practical technology—whether that is saving lives with IoT safety systems, assisting farmers through clean web portals, or teaching foundational code. I am now happy to take any questions or demonstrate the live project simulators!",
    bulletPoints: [
      "Available for internship, collaboration, and technical projects.",
      "Email: tanujsekhar18@gmail.com | Phone: +91-9784668230",
      "LinkedIn: linkedin.com/in/tanuj-sekhar-nakka-61608037a",
      "GitHub: github.com/tanujsekhar1830"
    ],
    actionLabel: "Back to Portfolio Dashboard",
    actionTarget: "exit"
  }
];
