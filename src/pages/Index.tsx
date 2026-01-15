import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PeacefulTownScene } from "@/components/3d/PeacefulTownScene";
import { UserProfile, UserGoal, UserStyle, getPersonalizedContent, styleOptions } from "@/lib/personalization";
import { Leaf, Volume2, VolumeX, Volume1, MessageCircle, CheckCircle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PsychiatristChat } from "@/components/PsychiatristChat";
import { useAmbientSounds } from "@/hooks/useAmbientSounds";

const Index = () => {
  const [profile, setProfile] = useState<UserProfile>({ goal: null, style: null });
  const [showStylePicker, setShowStylePicker] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [volume, setVolume] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const { playClickSound } = useAmbientSounds(volume, profile.goal);
  const content = getPersonalizedContent(profile);
  const isPersonalized = !!(profile.goal && profile.style);

  useEffect(() => {
    if (profile.goal && !profile.style) {
      const timer = setTimeout(() => setShowStylePicker(true), 800);
      return () => clearTimeout(timer);
    }
  }, [profile.goal, profile.style]);

  useEffect(() => {
    if (isPersonalized) {
      const timer = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isPersonalized]);

  const handleGoalSelect = (goal: UserGoal) => {
    playClickSound();
    setProfile({ ...profile, goal });
    setShowStylePicker(false);
    setShowContent(false);
    setShowChat(false);
  };

  const handleStyleSelect = (style: UserStyle) => {
    setProfile({ ...profile, style });
  };

  const handleReset = () => {
    setProfile({ goal: null, style: null });
    setShowStylePicker(false);
    setShowContent(false);
    setShowChat(false);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-sky-200 via-sky-100 to-green-100 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <PeacefulTownScene selectedGoal={profile.goal} onGoalSelect={handleGoalSelect} />
      </div>

      <header className="absolute top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-6 py-2 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="font-serif text-lg sm:text-xl font-semibold text-white drop-shadow-md">Serene</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div 
              className="relative"
              onPointerDown={(e) => e.stopPropagation()}
              onPointerMove={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseMove={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setShowVolumeSlider(!showVolumeSlider);
                }} 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                {volume === 0 ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : volume < 0.5 ? <Volume1 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              
              {showVolumeSlider && (
                <div 
                  className="absolute top-full mt-2 right-0 bg-white/90 backdrop-blur-lg rounded-lg p-2 sm:p-3 shadow-xl min-w-[140px] sm:min-w-[160px]"
                  onPointerDown={(e) => e.stopPropagation()}
                  onPointerMove={(e) => e.stopPropagation()}
                  onPointerUp={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setVolume(0);
                      }}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <VolumeX className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    </button>
                    <Slider
                      value={[volume]}
                      onValueChange={([v]) => setVolume(v)}
                      max={1}
                      step={0.01}
                      className="w-16 sm:w-20"
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setVolume(1);
                      }}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    </button>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 text-center mt-1">Ambient Sounds</p>
                </div>
              )}
            </div>
            {isPersonalized && (
              <button onClick={handleReset} className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 backdrop-blur text-white text-xs sm:text-sm hover:bg-white/30 transition-colors">
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>

      <AnimatePresence>
        {!profile.goal && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-20 sm:top-32 left-0 right-0 z-30 text-center px-3 sm:px-6">
            <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl px-4 sm:px-8 py-4 sm:py-6 max-w-xl mx-auto shadow-xl">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-2 sm:mb-3">Welcome to Your Journey</h1>
              <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">Choose a destination by clicking on one of the buildings.</p>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-primary">
                <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
                <span className="hidden sm:inline">Drag to explore • Click a destination to continue</span>
                <span className="sm:hidden">Tap a destination to continue</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showStylePicker && !profile.style && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-40 px-3 sm:px-6">
            <div className="bg-white/90 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto shadow-2xl">
              <h2 className="text-base sm:text-xl font-serif font-bold text-gray-800 text-center mb-3 sm:mb-4">How would you like us to speak to you?</h2>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {styleOptions.map((option) => (
                  <motion.button key={option.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleStyleSelect(option.value)} className="p-2.5 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border border-primary/20 transition-all text-left">
                    <span className="font-medium text-gray-800 text-xs sm:text-sm block">{option.label}</span>
                    <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 block line-clamp-2">{option.description}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && isPersonalized && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute inset-0 z-40 flex items-center justify-center px-3 sm:px-6 py-16 sm:py-20 overflow-auto">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-2xl w-full shadow-2xl my-4 sm:my-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="flex items-center gap-2 text-primary text-xs sm:text-sm font-medium mb-2 sm:mb-4">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
                  Personalized for you
                </div>
                <h1 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-2 sm:mb-4">{content.headline}</h1>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{content.subheadline}</p>

                {/* Steps */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /> Steps to Get There
                  </h3>
                  <div className="space-y-1.5 sm:space-y-2">
                    {content.steps.map((step, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-start gap-2 sm:gap-3 text-gray-700 bg-green-50 rounded-lg p-2 sm:p-3">
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 text-white text-[10px] sm:text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        <span className="text-xs sm:text-sm">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>


                {/* Chat Button */}
                <Button onClick={() => setShowChat(true)} size="lg" className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg sm:rounded-xl py-4 sm:py-6 text-sm sm:text-lg font-medium gap-2">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> Talk to Your Guide
                </Button>
                <p className="text-center text-gray-500 text-[10px] sm:text-sm mt-2 sm:mt-4">{content.ctaSubtext}</p>
                <button onClick={handleReset} className="w-full mt-2 sm:mt-4 text-gray-400 hover:text-gray-600 text-xs sm:text-sm transition-colors">← Choose a different path</button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {profile.goal && !profile.style && (
        <div className="absolute top-16 sm:top-24 left-1/2 -translate-x-1/2 z-30">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 shadow-lg">
            Destination: <span className="font-medium text-primary capitalize">{profile.goal}</span>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showChat && profile.goal && profile.style && (
          <PsychiatristChat goal={profile.goal} style={profile.style} onClose={() => setShowChat(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
