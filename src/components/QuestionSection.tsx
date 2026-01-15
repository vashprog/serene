import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionCard } from "./QuestionCard";
import { 
  UserGoal, 
  UserStyle, 
  UserProfile, 
  goalOptions, 
  styleOptions 
} from "@/lib/personalization";
import { Cloud, Target, TrendingUp, Users, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const goalIcons: Record<string, React.ReactNode> = {
  cloud: <Cloud className="w-8 h-8" />,
  target: <Target className="w-8 h-8" />,
  "trending-up": <TrendingUp className="w-8 h-8" />,
  users: <Users className="w-8 h-8" />,
};

interface QuestionSectionProps {
  profile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
}

export function QuestionSection({ profile, onProfileChange }: QuestionSectionProps) {
  const [step, setStep] = useState<"goal" | "style" | "done">(
    profile.goal && profile.style ? "done" : "goal"
  );

  const handleGoalSelect = (goal: UserGoal) => {
    onProfileChange({ ...profile, goal });
    setTimeout(() => setStep("style"), 300);
  };

  const handleStyleSelect = (style: UserStyle) => {
    onProfileChange({ ...profile, style });
    setTimeout(() => setStep("done"), 300);
  };

  const handleReset = () => {
    onProfileChange({ goal: null, style: null });
    setStep("goal");
  };

  const isComplete = profile.goal && profile.style;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-sage-mist/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <AnimatePresence mode="wait">
            {step === "goal" && (
              <motion.div
                key="goal-question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Question 1 of 2
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
                  What brings you here today?
                </h2>
                <p className="text-muted-foreground">
                  Choose what resonates most with you right now
                </p>
              </motion.div>
            )}

            {step === "style" && (
              <motion.div
                key="style-question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Question 2 of 2
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
                  How do you like to be spoken to?
                </h2>
                <p className="text-muted-foreground">
                  We'll adapt our tone to match your preference
                </p>
              </motion.div>
            )}

            {step === "done" && isComplete && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium">Page personalized for you</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                  Your Experience is Ready
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  The page above has been rewritten just for you. Looking for something different?
                </p>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="mt-4 gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Start Over
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Question Cards */}
        <AnimatePresence mode="wait">
          {step === "goal" && (
            <motion.div
              key="goal-cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {goalOptions.map((option) => (
                <QuestionCard
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  description={option.description}
                  icon={goalIcons[option.icon]}
                  selected={profile.goal === option.value}
                  onSelect={handleGoalSelect}
                />
              ))}
            </motion.div>
          )}

          {step === "style" && (
            <motion.div
              key="style-cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {styleOptions.map((option) => (
                  <QuestionCard
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    description={option.description}
                    selected={profile.style === option.value}
                    onSelect={handleStyleSelect}
                  />
                ))}
              </div>
              
              {/* Back button */}
              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => {
                    onProfileChange({ ...profile, goal: null });
                    setStep("goal");
                  }}
                  className="text-muted-foreground hover:text-foreground gap-2"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Go back
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress indicator */}
        {step !== "done" && (
          <div className="flex justify-center gap-2 mt-10">
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                step === "goal" ? "bg-primary" : "bg-primary/30"
              }`}
            />
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                step === "style" ? "bg-primary" : "bg-primary/30"
              }`}
            />
          </div>
        )}
      </div>
    </section>
  );
}
