import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  Code2, 
  Award,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Lesson {
  id: string;
  title: string;
  topic: string;
  level: string;
  description: string;
  defaultCode: string;
  inputParams?: { label: string; key: string; defaultValue: number | string }[];
  explanation: string;
  sampleOutput: (params: Record<string, any>) => string[];
  challenge: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const LESSONS: Lesson[] = [
  {
    id: "loops",
    title: "Lesson 1: For Loops & Pattern Generation",
    topic: "Control Flow & Nested Iteration",
    level: "Core Fundamentals",
    description: "Taught students how computers automate repetitive tasks using loop counters and nested ranges to construct visual structures.",
    defaultCode: `# Python Pattern Generation - CDP Lab Exercise
rows = {rows}

print(f"Generating triangle pattern for {rows} levels:")
for i in range(1, rows + 1):
    spaces = " " * (rows - i)
    stars = "*" * (2 * i - 1)
    print(spaces + stars)

print("Pattern generation complete!")`,
    inputParams: [
      { label: "Number of Pattern Rows (1 - 8):", key: "rows", defaultValue: 5 }
    ],
    explanation: "Nested logic where each iteration calculates string padding and star count mathematically using `(2 * i - 1)`.",
    sampleOutput: (params) => {
      const rows = Math.min(8, Math.max(1, Number(params.rows) || 5));
      const lines = [`Generating triangle pattern for ${rows} levels:`];
      for (let i = 1; i <= rows; i++) {
        const spaces = " ".repeat(rows - i);
        const stars = "*".repeat(2 * i - 1);
        lines.push(spaces + stars);
      }
      lines.push("Pattern generation complete!");
      return lines;
    },
    challenge: {
      question: "What will `range(1, 6)` produce in a Python 3 for-loop?",
      options: [
        "[1, 2, 3, 4, 5, 6]",
        "[1, 2, 3, 4, 5]",
        "[0, 1, 2, 3, 4, 5]",
        "[2, 3, 4, 5, 6]"
      ],
      correctIndex: 1,
      explanation: "In Python, the stop value in `range(start, stop)` is exclusive, so `range(1, 6)` yields numbers 1 through 5."
    }
  },
  {
    id: "conditionals",
    title: "Lesson 2: Conditionals & Decision Branching",
    topic: "Logical Operators & if-elif-else",
    level: "Core Fundamentals",
    description: "Taught students how algorithms make branching decisions using comparison operators and boolean expressions.",
    defaultCode: `# Student Grade Evaluator
score = {score}

if score >= 90:
    grade = "A+ (Distinction)"
    feedback = "Exceptional performance!"
elif score >= 75:
    grade = "A (First Class)"
    feedback = "Great grasp of concepts."
elif score >= 50:
    grade = "B (Pass)"
    feedback = "Satisfactory, keep practicing."
else:
    grade = "Needs Improvement"
    feedback = "Re-attend mentoring labs."

print(f"Evaluated Score: {score}/100")
print(f"Assigned Grade: {grade}")
print(f"Mentor Feedback: {feedback}")`,
    inputParams: [
      { label: "Enter Student Score (0 - 100):", key: "score", defaultValue: 92 }
    ],
    explanation: "Demonstrates sequential branching where the first truthy condition executes and ignores lower conditional blocks.",
    sampleOutput: (params) => {
      const score = Math.min(100, Math.max(0, Number(params.score) || 92));
      let grade = "Needs Improvement";
      let feedback = "Re-attend mentoring labs.";
      if (score >= 90) {
        grade = "A+ (Distinction)";
        feedback = "Exceptional performance!";
      } else if (score >= 75) {
        grade = "A (First Class)";
        feedback = "Great grasp of concepts.";
      } else if (score >= 50) {
        grade = "B (Pass)";
        feedback = "Satisfactory, keep practicing.";
      }
      return [
        `Evaluated Score: ${score}/100`,
        `Assigned Grade: ${grade}`,
        `Mentor Feedback: ${feedback}`
      ];
    },
    challenge: {
      question: "Which keyword is used in Python for 'else if' conditions?",
      options: ["else if", "elseif", "elif", "case if"],
      correctIndex: 2,
      explanation: "Python uses `elif` as the standard syntax for intermediate conditional branching."
    }
  },
  {
    id: "functions",
    title: "Lesson 3: Functions & Problem Solving",
    topic: "Modular Code & Prime Number Verification",
    level: "Intermediate Problem Solving",
    description: "Taught students how to structure code into reusable, testable functions with parameter passing and return values.",
    defaultCode: `# Prime Number Checker Function
def is_prime(num):
    if num <= 1:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True

test_val = {num}
result = is_prime(test_val)

print(f"Analyzing Number: {test_val}")
if result:
    print(f"SUCCESS: {test_val} is a PRIME number!")
else:
    print(f"RESULT: {test_val} is a COMPOSITE number.")`,
    inputParams: [
      { label: "Enter Number to Test:", key: "num", defaultValue: 29 }
    ],
    explanation: "Demonstrates time-complexity optimization by checking divisors only up to the square root (`num ** 0.5`).",
    sampleOutput: (params) => {
      const num = Math.max(1, Number(params.num) || 29);
      let isPrime = num > 1;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          isPrime = false;
          break;
        }
      }
      return [
        `Analyzing Number: ${num}`,
        isPrime ? `SUCCESS: ${num} is a PRIME number!` : `RESULT: ${num} is a COMPOSITE number.`
      ];
    },
    challenge: {
      question: "Why check divisors up to √N instead of N?",
      options: [
        "Python syntax requires square root",
        "Reduces time complexity from O(N) to O(√N)",
        "Prime numbers cannot have factors greater than 10",
        "It avoids floating point inaccuracies"
      ],
      correctIndex: 1,
      explanation: "If a number N has a factor greater than √N, it must have a matching factor smaller than √N, making further checks redundant."
    }
  }
];

export const PythonPlaygroundSimulator: React.FC = () => {
  const [activeLesson, setActiveLesson] = useState<Lesson>(LESSONS[0]);
  const [params, setParams] = useState<Record<string, any>>({ rows: 5, score: 92, num: 29 });
  const [outputLines, setOutputLines] = useState<string[]>(LESSONS[0].sampleOutput({ rows: 5 }));
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'pedagogy'>('visualizer');

  const handleParamChange = (key: string, value: any) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutputLines(activeLesson.sampleOutput(params));
      setIsRunning(false);
    }, 200);
  };

  const handleLessonSwitch = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setOutputLines(lesson.sampleOutput(params));
    setSelectedAnswer(null);
    setQuizSubmitted(false);
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    if (selectedAnswer === activeLesson.challenge.correctIndex) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
    }
  };

  // Replace placeholders in code display
  const getRenderedCode = () => {
    let code = activeLesson.defaultCode;
    if (activeLesson.id === 'loops') {
      code = code.replace('{rows}', String(params.rows || 5));
    } else if (activeLesson.id === 'conditionals') {
      code = code.replace('{score}', String(params.score || 92));
    } else if (activeLesson.id === 'functions') {
      code = code.replace('{num}', String(params.num || 29));
    }
    return code;
  };

  return (
    <div id="python-playground-simulator" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl relative overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Python Teaching & CDP Visualizer</h3>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-950 text-blue-400 border border-blue-800/60">
                Community Mentorship
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive demonstration of curriculum modules designed & taught by Nakka Tanuj Sekhar
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            id="tab-py-visualizer"
            onClick={() => setActiveTab('visualizer')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'visualizer' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Interactive Code Lab
          </button>
          <button
            id="tab-py-pedagogy"
            onClick={() => setActiveTab('pedagogy')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'pedagogy' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Teaching Methodology & CDP Impact
          </button>
        </div>
      </div>

      {/* Lesson Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-4">
        {LESSONS.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => handleLessonSwitch(lesson)}
            className={`p-3 rounded-xl border text-left text-xs transition ${
              activeLesson.id === lesson.id
                ? 'bg-blue-950/40 border-blue-500/70 shadow-md ring-1 ring-blue-500/20'
                : 'bg-slate-950/50 border-slate-800 hover:bg-slate-900/60'
            }`}
          >
            <div className="font-bold text-white mb-0.5">{lesson.title}</div>
            <div className="text-[11px] text-slate-400">{lesson.topic}</div>
          </button>
        ))}
      </div>

      {activeTab === 'visualizer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
          {/* Left Column: Code Editor & Execution controls */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 text-xs">
                <span className="text-slate-300 font-mono flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" /> main.py
                </span>
                <span className="text-slate-500 text-[11px]">Python 3.11 Execution Simulator</span>
              </div>

              {/* Code display */}
              <div className="p-4 font-mono text-xs text-slate-200 overflow-x-auto bg-slate-950 leading-relaxed whitespace-pre select-text">
                {getRenderedCode()}
              </div>

              {/* Dynamic Parameter Controls */}
              {activeLesson.inputParams && (
                <div className="p-3.5 bg-slate-900/60 border-t border-slate-800 text-xs flex flex-wrap items-center justify-between gap-3">
                  {activeLesson.inputParams.map((input) => (
                    <div key={input.key} className="flex items-center gap-2">
                      <span className="text-slate-300 font-medium">{input.label}</span>
                      <input
                        type="number"
                        value={params[input.key] ?? input.defaultValue}
                        onChange={(e) => handleParamChange(input.key, e.target.value)}
                        className="w-20 px-2.5 py-1 bg-slate-950 border border-slate-700 rounded text-cyan-300 font-mono text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  ))}

                  <button
                    id="run-python-code-btn"
                    onClick={runCode}
                    disabled={isRunning}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow flex items-center gap-1.5 transition ml-auto"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {isRunning ? "Executing..." : "Run Code"}
                  </button>
                </div>
              )}
            </div>

            {/* Teaching Explanation Callout */}
            <div className="p-3.5 bg-blue-950/20 border border-blue-900/30 rounded-xl text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-blue-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Mentorship Concept Explanation:
              </span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {activeLesson.explanation}
              </p>
            </div>
          </div>

          {/* Right Column: stdout Output & Classroom Quiz */}
          <div className="lg:col-span-5 space-y-4">
            {/* Terminal Output */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 mb-2.5">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> Terminal stdout
                </span>
                <span className="text-slate-500 text-[11px]">Process exited with code 0</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80 space-y-1 min-h-[120px] text-[11px]">
                {outputLines.map((line, idx) => (
                  <div key={idx} className="text-slate-200 font-mono">
                    {line}
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Student Challenge / Quiz */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-400" /> Interactive Class Quiz
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                  Concept Check
                </span>
              </div>

              <p className="text-slate-300 font-medium text-xs">
                {activeLesson.challenge.question}
              </p>

              <div className="space-y-1.5">
                {activeLesson.challenge.options.map((option, idx) => {
                  let btnClass = "bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800";
                  if (quizSubmitted) {
                    if (idx === activeLesson.challenge.correctIndex) {
                      btnClass = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold";
                    } else if (idx === selectedAnswer) {
                      btnClass = "bg-rose-950/60 border-rose-500 text-rose-300";
                    }
                  } else if (selectedAnswer === idx) {
                    btnClass = "bg-blue-950/50 border-blue-500 text-white font-semibold";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !quizSubmitted && setSelectedAnswer(idx)}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs transition ${btnClass}`}
                    >
                      <span className="font-mono text-slate-500 mr-2">{String.fromCharCode(65 + idx)})</span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  id="submit-quiz-answer-btn"
                  onClick={handleQuizSubmit}
                  disabled={selectedAnswer === null}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-lg shadow transition"
                >
                  Verify Answer
                </button>
              ) : (
                <div className={`p-2.5 rounded-lg border text-xs ${
                  selectedAnswer === activeLesson.challenge.correctIndex
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}>
                  <div className="font-bold mb-0.5">
                    {selectedAnswer === activeLesson.challenge.correctIndex ? "🎉 Correct!" : "💡 Explanation:"}
                  </div>
                  <div className="text-[11px] text-slate-400">{activeLesson.challenge.explanation}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Pedagogy Tab */}
      {activeTab === 'pedagogy' && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
              1
            </div>
            <div className="font-bold text-white text-sm">Visual Step Debugging</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Instead of dry lectures, students visualized variable transformations step-by-step. This reduced beginner confusion around loops and scoping.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              2
            </div>
            <div className="font-bold text-white text-sm">Hands-on Mini Challenges</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Curated 15+ micro-exercises ranging from pattern construction to arithmetic validation, keeping learners motivated and actively coding.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              3
            </div>
            <div className="font-bold text-white text-sm">Community Mentorship Impact</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Achieved 100% completion in the Community Development Project (CDP) at Lovely Professional University, earning formal structured training completion.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
