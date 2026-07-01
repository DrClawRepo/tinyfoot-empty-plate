import React, { useState, useMemo } from "react";
import { 
  BOOK_CHAPTERS, 
  QUIZ_QUESTIONS, 
  FUN_FACTS 
} from "../const";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  BookOpen, 
  Calculator, 
  CheckCircle, 
  Download, 
  HelpCircle, 
  Info, 
  Sparkles, 
  Trash2, 
  Utensils, 
  Volume2, 
  X,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Bus,
  ArrowRight
} from "lucide-react";

// Asset links
const ASSET_BASE = `${import.meta.env.BASE_URL}manus-storage/`;
const HERO_BANNER = `${ASSET_BASE}hero_cover_47cdbd9b.png`;
const CHONGO_IMG = `${ASSET_BASE}chongo_new_1fb89ae0.png`;
const BAILEY_IMG = `${ASSET_BASE}bailey_new_378e45fe.png`;
const CHERRY_IMG = `${ASSET_BASE}cherry_new_5917f3b4.png`;

// Extracted book pages for visual highlights
const BOOK_PAGE_DELIVER = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030293449/RrqpCJPbm3oKi52teDgLRZ/hero_banner-dAEtPJEhHtADdxRhhxNMtL.webp"; // fallback

export default function Home() {
  // Story Companion State
  const [activeChapter, setActiveChapter] = useState(0);
  
  // Calculator State
  const [mealsWasted, setMealsWasted] = useState(2);
  const [householdSize, setHouseholdSize] = useState(4);
  
  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizScoreCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Audio/Read Aloud simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Calculator computations
  const calculatorResults = useMemo(() => {
    // Standard meal size in kg (approx 0.4kg per meal)
    const mealWeightKg = 0.4;
    const weeklyWasteKg = mealsWasted * householdSize * mealWeightKg;
    const yearlyWasteKg = weeklyWasteKg * 52;
    
    // 1 double decker bus = approx 15,000 kg
    const busWeightKg = 15000;
    const busEquivalent = yearlyWasteKg / busWeightKg;
    
    // Co2 emission: 1kg food waste ≈ 2.5kg CO2
    const co2SavedKg = yearlyWasteKg * 2.5;
    
    return {
      weeklyWasteKg: weeklyWasteKg.toFixed(1),
      yearlyWasteKg: yearlyWasteKg.toFixed(0),
      busEquivalent: busEquivalent.toFixed(4),
      co2SavedKg: co2SavedKg.toFixed(0)
    };
  }, [mealsWasted, householdSize]);

  // Quiz Handlers
  const handleAnswerSelect = (optionIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
    
    if (optionIndex === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer) {
      setQuizScore(prev => prev + 1);
      toast.success("Awesome job! That's correct!", {
        description: "You're a true eco-hero!",
        duration: 3000
      });
    } else {
      toast.error("Oops! Not quite right.", {
        description: "Read the explanation to learn why!",
        duration: 3000
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizScoreCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizScore(0);
    setQuizScoreCompleted(false);
    setQuizStarted(true);
  };

  // Simulate Read Aloud
  const handleReadAloud = (text: string) => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for kids
    utterance.pitch = 1.1; // Friendly pitch
    
    utterance.onend = () => {
      setIsPlayingAudio(false);
    };

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen flex flex-col pb-12 text-foreground">
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-full felt-border-primary">
              <span className="text-2xl">🍽️</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl text-primary flex items-center gap-2">
                TinyFoot <span className="text-foreground text-sm font-normal px-2 py-0.5 bg-muted rounded-full">Operation Empty Plate</span>
              </h1>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a href="#storybook" className="hover:text-primary transition-colors">Story Companion</a>
            <a href="#calculator" className="hover:text-primary transition-colors">Eco-Calculator</a>
            <a href="#quiz" className="hover:text-primary transition-colors">Hero Quiz</a>
          </nav>

          <Button 
            variant="default" 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold btn-squish"
            onClick={() => {
              const el = document.getElementById("storybook");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Learning!
          </Button>
        </div>
      </header>

      {/* HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-card py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider felt-border-primary">
              <Sparkles className="w-3.5 h-3.5" /> Digital Book Companion
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary leading-tight font-extrabold">
              Become an <br />
              <span className="text-secondary text-shadow">Empty Plate Hero!</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl font-medium">
              Join Chongo the gentle space giant, Bailey the brave explorer, and Cherry the squirrel on a fun mission to stop food waste in Singapore! Learn how small changes on your plate make a huge difference for our planet.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-8 py-6 rounded-2xl btn-squish shadow-lg shadow-primary/20"
                onClick={() => {
                  const el = document.getElementById("storybook");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <BookOpen className="mr-2 h-5 h-5" /> Read Companion
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-secondary text-secondary hover:bg-secondary/10 font-bold text-base px-8 py-6 rounded-2xl btn-squish"
                onClick={() => {
                  const el = document.getElementById("calculator");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Calculator className="mr-2 h-5 h-5" /> Waste Calculator
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 felt-border border-white/20">
              <img 
                src={HERO_BANNER} 
                alt="Chongo and Bailey with healthy food" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Floating character bubbles */}
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full overflow-hidden border-4 border-primary shadow-lg animate-bounce z-20 bg-card">
              <img src={CHONGO_IMG} alt="Chongo" className="w-full h-full object-cover scale-125" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full overflow-hidden border-4 border-accent shadow-lg animate-bounce delay-300 z-20 bg-card">
              <img src={BAILEY_IMG} alt="Bailey" className="w-full h-full object-cover scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE HEROES */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl text-primary mb-2">Meet Your TinyFoot Friends!</h3>
        <p className="text-muted-foreground max-w-xl mx-auto mb-12">These friendly characters will guide you through your food waste saving journey.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* CHONGO */}
          <Card className="bg-card/50 felt-border hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-primary/10 border-4 border-primary mb-4">
                <img src={CHONGO_IMG} alt="Chongo" className="w-full h-full object-cover scale-125" />
              </div>
              <h4 className="text-2xl text-primary mb-1">Chongo</h4>
              <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-bold mb-3">GENTLE SPACE GIANT</span>
              <p className="text-sm text-muted-foreground text-center">
                An alien from planet Deep Blue! He can change his size at will. He has a giant appetite but hates wasting even a single grain of rice!
              </p>
            </CardContent>
          </Card>

          {/* BAILEY */}
          <Card className="bg-card/50 felt-border hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-accent/10 border-4 border-accent mb-4">
                <img src={BAILEY_IMG} alt="Bailey" className="w-full h-full object-cover scale-110" />
              </div>
              <h4 className="text-2xl text-accent mb-1">Bailey</h4>
              <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full font-bold mb-3">BRAVE EXPLORER</span>
              <p className="text-sm text-muted-foreground text-center">
                A clever girl who loves recycling, nature, and going on green adventures. She knows all the best tricks to save food and protect our Earth!
              </p>
            </CardContent>
          </Card>

          {/* CHERRY */}
          <Card className="bg-card/50 felt-border hover:border-secondary/50 transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-secondary/10 border-4 border-secondary mb-4">
                <img src={CHERRY_IMG} alt="Cherry" className="w-full h-full object-cover scale-110" />
              </div>
              <h4 className="text-2xl text-secondary mb-1">Cherry</h4>
              <span className="text-xs bg-secondary/20 text-secondary px-3 py-1 rounded-full font-bold mb-3">RESTAURANT OWNER</span>
              <p className="text-sm text-muted-foreground text-center">
                A squirrel who owns a busy restaurant. She loves serving huge portions to show her love, but is learning that ordering too much causes food waste!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SECTION 1: INTERACTIVE STORYBOOK COMPANION */}
      <section id="storybook" className="py-16 px-6 bg-card/30 border-y border-border/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-1 rounded-full text-xs font-bold uppercase felt-border border-secondary/30">
              <BookOpen className="w-3.5 h-3.5" /> Story Companion
            </div>
            <h3 className="text-3xl md:text-4xl text-primary">Operation Empty Plate Chapters</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Follow along with your physical or digital book! Click through the chapters below to unlock Chongo and Bailey's top green tips for each scene.
            </p>
          </div>

          {/* STORY INTERACTIVE PLAYER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left side: Navigation Chapters */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
              {BOOK_CHAPTERS.map((chapter, idx) => (
                <button
                  key={chapter.id}
                  onClick={() => {
                    setActiveChapter(idx);
                    if (isPlayingAudio) {
                      window.speechSynthesis.cancel();
                      setIsPlayingAudio(false);
                    }
                  }}
                  className={`flex-shrink-0 lg:flex-shrink text-left p-4 rounded-2xl border-2 transition-all duration-300 w-64 lg:w-full ${
                    activeChapter === idx 
                      ? "bg-primary/20 border-primary text-primary font-bold shadow-md" 
                      : "bg-card/40 border-transparent hover:border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      activeChapter === idx ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {chapter.id}
                    </span>
                    <span className="truncate text-sm md:text-base">{chapter.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right side: Chapter Details Card */}
            <Card className="lg:col-span-8 bg-card felt-border border-primary/30 overflow-hidden flex flex-col justify-between">
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary px-3 py-1 bg-secondary/10 rounded-full felt-border border-secondary/20">
                    Featuring: {BOOK_CHAPTERS[activeChapter].character}
                  </span>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className={`border-primary text-primary hover:bg-primary/10 rounded-full btn-squish ${
                      isPlayingAudio ? "bg-primary/20 border-dashed animate-pulse" : ""
                    }`}
                    onClick={() => handleReadAloud(`${BOOK_CHAPTERS[activeChapter].title}. ${BOOK_CHAPTERS[activeChapter].description}`)}
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    {isPlayingAudio ? "Stop Reading" : "Read to Me"}
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="text-2xl md:text-3xl text-primary">
                    {BOOK_CHAPTERS[activeChapter].title}
                  </h4>
                  <p className="text-base md:text-lg text-white leading-relaxed font-medium">
                    {BOOK_CHAPTERS[activeChapter].description}
                  </p>
                </div>

                {/* Interactive Highlight Lesson Box */}
                <div className="bg-primary/10 p-5 rounded-2xl border border-primary/30 space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-6 -mt-6" />
                  <h5 className="text-sm font-bold text-primary flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> GREEN HERO MISSION:
                  </h5>
                  <p className="text-sm text-slate-200 font-semibold leading-relaxed">
                    {BOOK_CHAPTERS[activeChapter].lesson}
                  </p>
                </div>
              </div>

              {/* Navigation controls */}
              <div className="bg-muted/30 p-4 border-t border-border/20 flex items-center justify-between">
                <Button
                  variant="ghost"
                  disabled={activeChapter === 0}
                  onClick={() => {
                    setActiveChapter(prev => prev - 1);
                    if (isPlayingAudio) window.speechSynthesis.cancel();
                  }}
                  className="hover:text-primary"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" /> Previous Chapter
                </Button>
                <span className="text-sm font-bold text-muted-foreground">
                  {activeChapter + 1} of {BOOK_CHAPTERS.length}
                </span>
                <Button
                  variant="ghost"
                  disabled={activeChapter === BOOK_CHAPTERS.length - 1}
                  onClick={() => {
                    setActiveChapter(prev => prev + 1);
                    if (isPlayingAudio) window.speechSynthesis.cancel();
                  }}
                  className="hover:text-primary"
                >
                  Next Chapter <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 2: FOOD WASTE CALCULATOR */}
      <section id="calculator" className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase felt-border border-primary/30">
              <Calculator className="w-3.5 h-3.5" /> Interactive Math
            </div>
            <h3 className="text-3xl md:text-4xl text-primary leading-tight">
              Singapore Eco-Waste <br />
              <span className="text-secondary">Calculator!</span>
            </h3>
            <p className="text-muted-foreground font-medium">
              Every meal we throw away adds up. Use this interactive calculator to see how much food waste your household can save in a year, and how it compares to Singapore's double-decker buses!
            </p>

            {/* Interactive Sliders */}
            <div className="space-y-6 bg-card/40 p-6 rounded-3xl felt-border">
              {/* Slider 1: Meals wasted per person per week */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-foreground">Meals wasted per person weekly:</span>
                  <span className="text-primary text-lg">{mealsWasted} meals</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  value={mealsWasted} 
                  onChange={(e) => setMealsWasted(Number(e.target.value))}
                  className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 (Perfect!)</span>
                  <span>5 (Average)</span>
                  <span>10 (Too many!)</span>
                </div>
              </div>

              {/* Slider 2: Household Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-foreground">People in your household:</span>
                  <span className="text-secondary text-lg">{householdSize} people</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="8" 
                  value={householdSize} 
                  onChange={(e) => setHouseholdSize(Number(e.target.value))}
                  className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 person</span>
                  <span>4 (Family)</span>
                  <span>8 people</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Results Dashboard */}
          <div className="lg:col-span-7">
            <Card className="bg-card felt-border border-secondary/30 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-10 -mt-10" />
              
              <div className="p-6 md:p-8 space-y-6 text-center">
                <h4 className="text-xl font-bold text-secondary flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" /> YOUR HOUSEHOLD IMPACT REPORT
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  {/* Result 1: Weekly weight */}
                  <div className="bg-muted/20 p-4 rounded-2xl border border-border/20">
                    <span className="text-xs text-muted-foreground font-bold uppercase block mb-1">Weekly Waste</span>
                    <span className="text-2xl md:text-3xl font-extrabold text-foreground">{calculatorResults.weeklyWasteKg} kg</span>
                  </div>

                  {/* Result 2: Yearly weight */}
                  <div className="bg-muted/20 p-4 rounded-2xl border border-border/20">
                    <span className="text-xs text-muted-foreground font-bold uppercase block mb-1">Yearly Waste</span>
                    <span className="text-2xl md:text-3xl font-extrabold text-primary">{calculatorResults.yearlyWasteKg} kg</span>
                  </div>
                </div>

                {/* Visual comparison: Double Decker Bus */}
                <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20 space-y-4">
                  <div className="flex items-center justify-center gap-3 text-primary">
                    <Bus className="w-8 h-8 animate-bounce" />
                    <span className="text-lg font-bold">Double-Decker Bus Comparison</span>
                  </div>
                  
                  <p className="text-sm md:text-base text-foreground/90 font-medium">
                    Your household's yearly food waste weighs equivalent to <strong className="text-primary text-lg">{calculatorResults.busEquivalent}</strong> of a standard Singapore double-decker bus!
                  </p>

                  <p className="text-xs text-muted-foreground">
                    *Based on 784 million kg total waste weighing more than 50,000 double-decker buses.
                  </p>
                </div>

                {/* CO2 Emissions Saved if they go Empty Plate */}
                <div className="bg-secondary/10 p-5 rounded-2xl border border-secondary/20 flex items-center gap-4 text-left">
                  <div className="bg-secondary/20 p-3 rounded-full text-2xl">🌱</div>
                  <div>
                    <h5 className="font-bold text-secondary">Green Eco-Hero Goal!</h5>
                    <p className="text-sm text-foreground/90">
                      By practicing <strong>Operation Empty Plate</strong> and reducing waste to zero, your family can save <strong>{calculatorResults.co2SavedKg} kg of greenhouse gases</strong> every year!
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 3: HERO QUIZ GAME */}
      <section id="quiz" className="py-16 px-6 bg-card/30 border-y border-border/20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1 rounded-full text-xs font-bold uppercase felt-border border-accent/30">
              <HelpCircle className="w-3.5 h-3.5" /> Challenge Game
            </div>
            <h3 className="text-3xl md:text-4xl text-primary">Operation Empty Plate Hero Quiz</h3>
            <p className="text-muted-foreground">
              Think you have what it takes to be a certified Eco-Hero? Help Chongo, Bailey, and Cherry solve these tricky food puzzles!
            </p>
          </div>

          {!quizStarted ? (
            // Quiz Landing State
            <Card className="bg-card felt-border border-accent/30 p-8 space-y-6">
              <div className="flex justify-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-primary/10 border-2 border-primary">
                  <img src={CHONGO_IMG} alt="Chongo" className="w-full h-full object-cover scale-125" />
                </div>
                <div className="w-20 h-20 rounded-full overflow-hidden bg-accent/10 border-2 border-accent">
                  <img src={BAILEY_IMG} alt="Bailey" className="w-full h-full object-cover scale-110" />
                </div>
              </div>
              <h4 className="text-2xl text-foreground">Are you ready to test your knowledge?</h4>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Answer 5 friendly questions about food portions, leftovers, sharing, and Singapore's food environment to unlock your special digital badge!
              </p>
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-5 rounded-2xl btn-squish"
                onClick={() => setQuizStarted(true)}
              >
                Start the Quiz! <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Card>
          ) : quizCompleted ? (
            // Quiz Completed State
            <Card className="bg-card felt-border border-primary/30 p-8 space-y-6 animate-fade-in">
              <div className="text-6xl animate-bounce">🏆</div>
              <h4 className="text-3xl text-primary">Congratulations, Eco-Hero!</h4>
              <p className="text-lg font-bold text-foreground">
                You scored <span className="text-secondary text-2xl">{quizScore}</span> out of <span className="text-2xl">{QUIZ_QUESTIONS.length}</span>!
              </p>
              
              {quizScore >= 4 ? (
                <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20 max-w-md mx-auto space-y-3">
                  <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-bold">OFFICIAL BADGE UNLOCKED</span>
                  <h5 className="text-xl text-primary font-bold">🎖️ Master Empty Plate Hero</h5>
                  <p className="text-xs text-muted-foreground">
                    You understand exactly how to stop food waste, share leftovers, and respect the planet. Chongo and Bailey are so proud of you!
                  </p>
                </div>
              ) : (
                <div className="bg-secondary/10 p-6 rounded-2xl border border-secondary/20 max-w-md mx-auto space-y-3">
                  <span className="text-xs bg-secondary/20 text-secondary px-3 py-1 rounded-full font-bold">ECO-HERO IN TRAINING</span>
                  <h5 className="text-xl text-secondary font-bold">🌱 Junior Food Saver</h5>
                  <p className="text-xs text-muted-foreground">
                    Great effort! Try the quiz again to see if you can get a perfect score and unlock the Master Hero badge!
                  </p>
                </div>
              )}

              <div className="flex justify-center gap-4 pt-4">
                <Button 
                  variant="outline" 
                  className="border-2 border-border hover:bg-muted/20 rounded-2xl btn-squish"
                  onClick={resetQuiz}
                >
                  <RefreshCw className="mr-2 w-4 h-4" /> Try Again
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl btn-squish"
                  onClick={() => {
                    const el = document.getElementById("storybook");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Read Storybook <BookOpen className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          ) : (
            // Active Quiz Question State
            <Card className="bg-card felt-border border-accent/30 overflow-hidden text-left">
              {/* Progress bar */}
              <Progress 
                value={((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100} 
                className="h-2 rounded-none bg-muted accent-accent"
              />
              
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">
                    QUESTION {currentQuestionIndex + 1} OF {QUIZ_QUESTIONS.length}
                  </span>
                  
                  {/* Character helper avatar */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-bold uppercase">
                      Helper: {QUIZ_QUESTIONS[currentQuestionIndex].character}
                    </span>
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-border bg-muted">
                      <img 
                        src={
                          QUIZ_QUESTIONS[currentQuestionIndex].character === 'chongo' ? CHONGO_IMG :
                          QUIZ_QUESTIONS[currentQuestionIndex].character === 'bailey' ? BAILEY_IMG : CHERRY_IMG
                        } 
                        alt="Helper" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                </div>

                <h4 className="text-xl md:text-2xl text-foreground font-bold leading-snug">
                  {QUIZ_QUESTIONS[currentQuestionIndex].question}
                </h4>

                {/* Options list */}
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, idx) => {
                    const isCorrect = idx === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer;
                    const isSelected = idx === selectedAnswer;
                    
                    let btnClass = "bg-muted/10 border-border text-foreground hover:border-accent hover:bg-accent/5";
                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        btnClass = "bg-primary/20 border-primary text-primary font-bold";
                      } else if (isSelected) {
                        btnClass = "bg-destructive/20 border-destructive text-destructive font-bold";
                      } else {
                        btnClass = "bg-muted/5 border-border/50 text-muted-foreground opacity-50";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedAnswer !== null}
                        onClick={() => handleAnswerSelect(idx)}
                        className={`p-4 rounded-2xl border-2 text-left text-sm md:text-base transition-all duration-300 flex items-start gap-3 ${btnClass}`}
                      >
                        <span className="font-bold text-muted-foreground mr-1">{String.fromCharCode(65 + idx)}.</span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation block */}
                {showExplanation && (
                  <div className="bg-primary/10 p-5 rounded-2xl border border-primary/20 space-y-2 animate-fade-in">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                      <Info className="w-4 h-4" /> EXPLANATION
                    </div>
                    <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                      {QUIZ_QUESTIONS[currentQuestionIndex].explanation}
                    </p>
                    <div className="flex justify-end pt-2">
                      <Button 
                        size="sm" 
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl btn-squish"
                        onClick={handleNextQuestion}
                      >
                        {currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? "Finish Quiz" : "Next Question"} 
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* DID YOU KNOW? FUN FACTS */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl text-primary mb-2">Did You Know? 💡</h3>
        <p className="text-muted-foreground max-w-xl mx-auto mb-12">Amazing eco-facts that will blow your mind and help you save the environment!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FUN_FACTS.map((fact, idx) => (
            <Card key={idx} className="bg-card/50 felt-border border-primary/20 hover:border-primary/40 transition-all duration-300 text-left">
              <CardContent className="p-6 space-y-4">
                <div className="text-4xl">{fact.icon}</div>
                <h4 className="text-lg text-primary">{fact.title}</h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium">
                  {fact.fact}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-card/40 border-t border-border/20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center gap-3">
            <div className="bg-primary/20 p-2 rounded-full felt-border-primary">
              <span className="text-xl">🍽️</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground font-medium max-w-md mx-auto">
            Thank you for participating in Operation Empty Plate! Let's work together to make every meal waste-free and keep our Earth green.
          </p>
          
          {/* SG Eco Fund & TinyFoot Footer Acknowledgement */}
          <div className="pt-6 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-semibold">
            <p>© 2026 Tiny Foot Wonders. All rights reserved. Published in Singapore.</p>
            <div className="flex items-center gap-4">
              <span>Supported by: <strong>SG Eco Fund</strong></span>
              <span>•</span>
              <span>Printed on 100% recycled paper</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
