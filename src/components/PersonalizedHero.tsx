import { motion, AnimatePresence } from "framer-motion";
import { PersonalizedContent } from "@/lib/personalization";
import heroImage from "@/assets/hero-forest.jpg";
import { Button } from "@/components/ui/button";
import { 
  Wind, TreeDeciduous, Feather, Zap, Brain, TrendingUp, Gamepad2, 
  Sparkles, Trophy, Compass, BookOpen, PenTool, Waves, Clock, Coffee,
  Target, Timer, BarChart, Sword, Rocket, Medal, Eye, Palette, Search,
  Sprout, Heart, Sun, Flag, Layers, CheckCircle, GitBranch, Map, UserPlus,
  MapPin, Lamp, Users, MessageCircle, HeartHandshake, Link, Mail, Database,
  Shuffle, Tent, MessagesSquare, MessageSquare, Ear, Book, Cloud
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  wind: <Wind className="w-6 h-6" />,
  tree: <TreeDeciduous className="w-6 h-6" />,
  feather: <Feather className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  brain: <Brain className="w-6 h-6" />,
  "trending-up": <TrendingUp className="w-6 h-6" />,
  "gamepad-2": <Gamepad2 className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  trophy: <Trophy className="w-6 h-6" />,
  compass: <Compass className="w-6 h-6" />,
  "book-open": <BookOpen className="w-6 h-6" />,
  "pen-tool": <PenTool className="w-6 h-6" />,
  waves: <Waves className="w-6 h-6" />,
  clock: <Clock className="w-6 h-6" />,
  coffee: <Coffee className="w-6 h-6" />,
  target: <Target className="w-6 h-6" />,
  timer: <Timer className="w-6 h-6" />,
  "bar-chart": <BarChart className="w-6 h-6" />,
  sword: <Sword className="w-6 h-6" />,
  rocket: <Rocket className="w-6 h-6" />,
  medal: <Medal className="w-6 h-6" />,
  eye: <Eye className="w-6 h-6" />,
  palette: <Palette className="w-6 h-6" />,
  search: <Search className="w-6 h-6" />,
  sprout: <Sprout className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  sun: <Sun className="w-6 h-6" />,
  flag: <Flag className="w-6 h-6" />,
  layers: <Layers className="w-6 h-6" />,
  "check-circle": <CheckCircle className="w-6 h-6" />,
  "git-branch": <GitBranch className="w-6 h-6" />,
  map: <Map className="w-6 h-6" />,
  "user-plus": <UserPlus className="w-6 h-6" />,
  "map-pin": <MapPin className="w-6 h-6" />,
  lamp: <Lamp className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  "message-circle": <MessageCircle className="w-6 h-6" />,
  "heart-handshake": <HeartHandshake className="w-6 h-6" />,
  link: <Link className="w-6 h-6" />,
  mail: <Mail className="w-6 h-6" />,
  database: <Database className="w-6 h-6" />,
  shuffle: <Shuffle className="w-6 h-6" />,
  tent: <Tent className="w-6 h-6" />,
  "messages-square": <MessagesSquare className="w-6 h-6" />,
  "message-square": <MessageSquare className="w-6 h-6" />,
  ear: <Ear className="w-6 h-6" />,
  book: <Book className="w-6 h-6" />,
  cloud: <Cloud className="w-6 h-6" />,
};

interface PersonalizedHeroProps {
  content: PersonalizedContent;
  isPersonalized: boolean;
}

export function PersonalizedHero({ content, isPersonalized }: PersonalizedHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Serene misty forest at dawn"
          className="w-full h-full object-cover animate-breathe"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={content.headline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            {/* Badge */}
            {isPersonalized && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                Personalized for you
              </motion.div>
            )}

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight mb-6 text-balance">
              {content.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 text-balance">
              {content.subheadline}
            </p>

            {/* CTA */}
            <div className="flex flex-col items-center gap-3">
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-medium rounded-xl shadow-elevated hover:shadow-glow transition-all duration-300"
              >
                {content.cta}
              </Button>
              <span className="text-sm text-muted-foreground">{content.ctaSubtext}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Features */}
        <AnimatePresence mode="wait">
          <motion.div
            key={content.features[0].title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {content.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto">
                  {iconMap[feature.icon] || <Sparkles className="w-6 h-6" />}
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
