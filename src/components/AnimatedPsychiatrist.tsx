import { motion } from "framer-motion";
import { UserGoal } from "@/lib/personalization";
import { Heart, Brain, Sparkles, Users } from "lucide-react";

interface AnimatedPsychiatristProps {
  goal: UserGoal;
  isSpeaking?: boolean;
}

const psychiatristStyles: Record<UserGoal, {
  icon: React.ReactNode;
  bgGradient: string;
  name: string;
}> = {
  calm: {
    icon: <Heart className="w-6 h-6 text-white" />,
    bgGradient: "from-emerald-400 to-teal-500",
    name: "Dr. Serenity",
  },
  focus: {
    icon: <Brain className="w-6 h-6 text-white" />,
    bgGradient: "from-sky-400 to-blue-500",
    name: "Dr. Clarity",
  },
  grow: {
    icon: <Sparkles className="w-6 h-6 text-white" />,
    bgGradient: "from-amber-400 to-orange-500",
    name: "Dr. Bloom",
  },
  connect: {
    icon: <Users className="w-6 h-6 text-white" />,
    bgGradient: "from-pink-400 to-rose-500",
    name: "Dr. Harmony",
  },
};

// Animation variants for each goal
const getAnimationForGoal = (goal: UserGoal) => {
  switch (goal) {
    case "calm":
      return {
        y: [0, -8, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
      };
    case "focus":
      return {
        scale: [1, 1.05, 1],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
      };
    case "grow":
      return {
        y: [0, -12, 0],
        rotate: [0, 3, -3, 0],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeOut" as const },
      };
    case "connect":
      return {
        rotate: [0, 5, -5, 0],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
      };
  }
};

export const AnimatedPsychiatrist = ({ goal, isSpeaking = false }: AnimatedPsychiatristProps) => {
  const style = psychiatristStyles[goal];
  const animation = getAnimationForGoal(goal);

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={isSpeaking ? { scale: [1, 1.02, 1] } : animation}
        transition={isSpeaking ? { duration: 0.3, repeat: Infinity } : undefined}
        className="relative"
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute -inset-3 rounded-full bg-gradient-to-r ${style.bgGradient} opacity-30 blur-md`}
        />
        
        {/* Main avatar */}
        <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${style.bgGradient} flex items-center justify-center shadow-lg`}>
          {/* Inner ring */}
          <div className="absolute inset-1 rounded-full bg-white/20" />
          
          {/* Icon */}
          <motion.div
            animate={isSpeaking ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, repeat: isSpeaking ? Infinity : 0 }}
          >
            {style.icon}
          </motion.div>

          {/* Speaking indicator */}
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md"
            >
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${style.bgGradient}`}
              />
            </motion.div>
          )}
        </div>

        {/* Floating particles around the avatar */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -30, -20],
              x: [i * 10 - 10, i * 10 - 5, i * 10 - 10],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className={`absolute top-0 w-2 h-2 rounded-full bg-gradient-to-r ${style.bgGradient}`}
            style={{ left: `${20 + i * 25}%` }}
          />
        ))}
      </motion.div>
      
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs font-medium text-gray-500"
      >
        {style.name}
      </motion.span>
    </div>
  );
};
