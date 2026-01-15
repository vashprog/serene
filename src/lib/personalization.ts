export type UserGoal = "calm" | "focus" | "grow" | "connect";
export type UserStyle = "gentle" | "direct" | "playful" | "thoughtful";

export interface UserProfile {
  goal: UserGoal | null;
  style: UserStyle | null;
}

export interface PersonalizedContent {
  headline: string;
  subheadline: string;
  steps: string[];
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  cta: string;
  ctaSubtext: string;
}

const contentMap: Record<UserGoal, Record<UserStyle, PersonalizedContent>> = {
  calm: {
    gentle: {
      headline: "Find Your Quiet Place",
      subheadline: "A gentle space designed to help you breathe, rest, and rediscover peace in your everyday moments.",
      steps: [
        "Start with 5 minutes of daily stillness — no phone, no distractions",
        "Notice your breath without trying to change it",
        "Create one 'sacred space' in your home for quiet reflection",
        "Practice saying 'no' to one draining commitment this week",
      ],
      features: [
        { title: "Breathing Exercises", description: "Soft, guided rhythms to calm your mind", icon: "wind" },
        { title: "Nature Sounds", description: "Immerse yourself in peaceful soundscapes", icon: "tree" },
        { title: "Daily Reflections", description: "Gentle prompts to nurture inner peace", icon: "feather" },
      ],
      cta: "Begin Your Journey",
      ctaSubtext: "Start with a 2-minute breathing exercise",
    },
    direct: {
      headline: "Cut Through the Noise",
      subheadline: "No fluff. Just proven techniques to calm your mind and take control of your stress.",
      steps: [
        "Identify your top 3 stress triggers — write them down now",
        "Implement a 60-second reset ritual between tasks",
        "Remove one unnecessary source of stress from your life today",
        "Set a non-negotiable wind-down time each night",
      ],
      features: [
        { title: "Quick Resets", description: "60-second stress relief that works", icon: "zap" },
        { title: "Science-Backed", description: "Methods grounded in research", icon: "brain" },
        { title: "Track Progress", description: "See your calm stats improve", icon: "trending-up" },
      ],
      cta: "Start Now",
      ctaSubtext: "Your first session takes 60 seconds",
    },
    playful: {
      headline: "Chill Out, Friend!",
      subheadline: "Stress? Never heard of her. Let's turn relaxation into your new favorite hobby.",
      steps: [
        "Pick a 'chill anthem' and play it when stress hits",
        "Try the 5-4-3-2-1 grounding game (5 things you see, 4 you hear...)",
        "Schedule a 'do absolutely nothing' block this week",
        "Create a cozy corner that's your official stress-free zone",
      ],
      features: [
        { title: "Zen Games", description: "Relaxation that feels like play", icon: "gamepad-2" },
        { title: "Mood Boosters", description: "Little surprises to brighten your day", icon: "sparkles" },
        { title: "Chill Challenges", description: "Unlock achievements for staying calm", icon: "trophy" },
      ],
      cta: "Let's Chill!",
      ctaSubtext: "Relaxation should be fun, right?",
    },
    thoughtful: {
      headline: "Cultivate Inner Stillness",
      subheadline: "Explore the depths of tranquility through mindful practices and philosophical wisdom.",
      steps: [
        "Sit with discomfort for 10 minutes without seeking distraction",
        "Journal about what 'peace' truly means to you personally",
        "Study one wisdom tradition's approach to stillness this week",
        "Practice detaching your identity from your anxious thoughts",
      ],
      features: [
        { title: "Guided Meditations", description: "Journey inward with expert guidance", icon: "compass" },
        { title: "Wisdom Library", description: "Ancient teachings for modern peace", icon: "book-open" },
        { title: "Journaling Space", description: "Reflect and grow with intention", icon: "pen-tool" },
      ],
      cta: "Begin the Practice",
      ctaSubtext: "Your path to stillness awaits",
    },
  },
  focus: {
    gentle: {
      headline: "Gently Sharpen Your Focus",
      subheadline: "Discover a kinder way to concentrate—one that honors your natural rhythms and energy.",
      steps: [
        "Notice when your energy naturally peaks — work with it, not against it",
        "Start with just 15 minutes of focused work, then rest",
        "Create a simple ritual to signal 'focus time' to your brain",
        "Forgive yourself each time you get distracted — then gently return",
      ],
      features: [
        { title: "Flow Sessions", description: "Ease into deep work naturally", icon: "waves" },
        { title: "Soft Timers", description: "Gentle reminders, not harsh alarms", icon: "clock" },
        { title: "Rest Intervals", description: "Built-in breaks to recharge", icon: "coffee" },
      ],
      cta: "Find Your Flow",
      ctaSubtext: "Start with a gentle 15-minute session",
    },
    direct: {
      headline: "Laser Focus. Zero Distractions.",
      subheadline: "Get more done in less time. This is productivity without the BS.",
      steps: [
        "Delete social media apps from your phone for one week",
        "Block your three biggest time-wasting websites",
        "Use time-blocking: schedule every hour of your workday",
        "Set one MIT (Most Important Task) each morning — do it first",
      ],
      features: [
        { title: "Deep Work Mode", description: "Block distractions, maximize output", icon: "target" },
        { title: "Sprint Timer", description: "Pomodoro technique, perfected", icon: "timer" },
        { title: "Focus Score", description: "Track and beat your personal best", icon: "bar-chart" },
      ],
      cta: "Lock In",
      ctaSubtext: "Your most productive day starts now",
    },
    playful: {
      headline: "Focus Mode: Activated! 🎯",
      subheadline: "Who said getting stuff done can't be fun? Level up your productivity game!",
      steps: [
        "Turn your to-do list into a 'quest log' with XP rewards",
        "Challenge a friend to a focus sprint — loser buys coffee",
        "Create a 'boss battle' playlist for your hardest tasks",
        "Celebrate small wins with a victory dance (seriously, try it)",
      ],
      features: [
        { title: "Quest Mode", description: "Turn tasks into epic adventures", icon: "sword" },
        { title: "Power-Ups", description: "Unlock boosts as you focus", icon: "rocket" },
        { title: "Leaderboards", description: "Compete with friends (or yourself)", icon: "medal" },
      ],
      cta: "Start Your Quest!",
      ctaSubtext: "First quest: 20 minutes of legendary focus",
    },
    thoughtful: {
      headline: "Master the Art of Attention",
      subheadline: "In a world of endless distractions, reclaim your most precious resource: focused attention.",
      steps: [
        "Study your attention patterns — when, where, and why do you drift?",
        "Practice single-tasking: one thing at a time, fully present",
        "Spend 10 minutes daily in meditation to train your attention muscle",
        "Design your environment to make distraction harder than focus",
      ],
      features: [
        { title: "Mindful Focus", description: "Attention training meets productivity", icon: "eye" },
        { title: "Environment Design", description: "Create your optimal focus space", icon: "palette" },
        { title: "Deep Insights", description: "Understand your attention patterns", icon: "search" },
      ],
      cta: "Begin Your Practice",
      ctaSubtext: "Mastery is a journey, not a destination",
    },
  },
  grow: {
    gentle: {
      headline: "Nurture Your Growth",
      subheadline: "Like a garden, personal growth needs patience, care, and the right conditions to flourish.",
      steps: [
        "Choose one tiny habit you can do for just 2 minutes daily",
        "Write down three things you're already doing well",
        "Find one person who supports your growth — lean on them",
        "Celebrate every small step forward, no matter how tiny",
      ],
      features: [
        { title: "Growth Seeds", description: "Small daily habits that bloom over time", icon: "sprout" },
        { title: "Gentle Guidance", description: "Supportive nudges, never pressure", icon: "heart" },
        { title: "Celebrate Progress", description: "Honor every step forward", icon: "sun" },
      ],
      cta: "Plant Your First Seed",
      ctaSubtext: "Growth happens one small step at a time",
    },
    direct: {
      headline: "Level Up. No Excuses.",
      subheadline: "You're here because you want results. Let's build the best version of you.",
      steps: [
        "Write down exactly who you want to become in 1 year",
        "Identify the one habit holding you back most — eliminate it",
        "Set a 30-day challenge that scares you slightly",
        "Find an accountability partner who won't let you off the hook",
      ],
      features: [
        { title: "Goal Tracking", description: "Set targets, crush them, repeat", icon: "flag" },
        { title: "Habit Stacking", description: "Build unstoppable routines", icon: "layers" },
        { title: "Accountability", description: "Stay on track with daily check-ins", icon: "check-circle" },
      ],
      cta: "Commit Now",
      ctaSubtext: "Your transformation starts today",
    },
    playful: {
      headline: "Become Your Best Self (It's Actually Fun!)",
      subheadline: "Self-improvement doesn't have to be boring. Let's make growing up feel like leveling up!",
      steps: [
        "Create a 'character sheet' for yourself — what skills need leveling?",
        "Turn one boring task into a game with points and rewards",
        "Find a growth buddy to share wins and fails with",
        "Reward yourself for showing up, not just for results",
      ],
      features: [
        { title: "Skill Trees", description: "Unlock abilities as you grow", icon: "git-branch" },
        { title: "Daily Quests", description: "Bite-sized challenges, epic rewards", icon: "map" },
        { title: "Character Builder", description: "Design your ideal future self", icon: "user-plus" },
      ],
      cta: "Create Your Character!",
      ctaSubtext: "What kind of hero will you become?",
    },
    thoughtful: {
      headline: "The Examined Life",
      subheadline: "True growth comes from deep self-understanding. Begin the journey of becoming who you truly are.",
      steps: [
        "Spend 20 minutes journaling: 'What am I avoiding and why?'",
        "Identify a belief that's limiting you — question its origin",
        "Read one book that challenges your current worldview",
        "Have one honest conversation about your growth edges",
      ],
      features: [
        { title: "Self-Discovery", description: "Explore your values and purpose", icon: "compass" },
        { title: "Learning Paths", description: "Curated wisdom for your journey", icon: "map-pin" },
        { title: "Reflection Tools", description: "Integrate insights into daily life", icon: "lamp" },
      ],
      cta: "Start the Journey",
      ctaSubtext: "Know thyself, grow thyself",
    },
  },
  connect: {
    gentle: {
      headline: "Build Meaningful Connections",
      subheadline: "In a world that often feels disconnected, find your people and nurture relationships that matter.",
      steps: [
        "Reach out to one person you've been meaning to connect with",
        "Practice asking follow-up questions in your next conversation",
        "Share something vulnerable with someone you trust",
        "Schedule a distraction-free conversation this week",
      ],
      features: [
        { title: "Gentle Intros", description: "Low-pressure ways to connect", icon: "users" },
        { title: "Conversation Starters", description: "Thoughtful prompts to go deeper", icon: "message-circle" },
        { title: "Community Circles", description: "Find your kindred spirits", icon: "heart-handshake" },
      ],
      cta: "Find Your People",
      ctaSubtext: "Meaningful connections await",
    },
    direct: {
      headline: "Network Smarter, Not Harder",
      subheadline: "Quality connections that actually move the needle. No small talk required.",
      steps: [
        "Audit your network: who energizes vs. drains you?",
        "Reach out to 3 people who inspire you this week",
        "Give value before asking for anything in return",
        "Set up one meaningful meeting per week, minimum",
      ],
      features: [
        { title: "Smart Matching", description: "AI finds your ideal connections", icon: "link" },
        { title: "Warm Intros", description: "Skip the cold outreach", icon: "mail" },
        { title: "Relationship CRM", description: "Never let a connection go cold", icon: "database" },
      ],
      cta: "Start Connecting",
      ctaSubtext: "Your network is your net worth",
    },
    playful: {
      headline: "Make Friends & Have Adventures!",
      subheadline: "Life's better with good people. Let's help you find your squad and have some fun!",
      steps: [
        "Say yes to one social invite you'd normally skip",
        "Start a group chat around a shared interest",
        "Plan a low-stakes hangout — coffee, walk, whatever",
        "Be the one to reach out first (yes, it's scary, do it anyway)",
      ],
      features: [
        { title: "Friend Matching", description: "Like dating apps, but for friends!", icon: "shuffle" },
        { title: "Group Adventures", description: "Join activities with cool people", icon: "tent" },
        { title: "Chat Circles", description: "Jump into fun conversations", icon: "messages-square" },
      ],
      cta: "Find Your Squad!",
      ctaSubtext: "Your new best friends are waiting",
    },
    thoughtful: {
      headline: "Deepen Your Human Bonds",
      subheadline: "Move beyond surface-level interactions. Cultivate relationships that enrich your soul and theirs.",
      steps: [
        "Ask someone 'What's been weighing on you lately?'",
        "Practice listening without planning your response",
        "Share a fear or struggle with someone you trust",
        "Reflect on what you truly need from relationships",
      ],
      features: [
        { title: "Deep Dialogues", description: "Questions that spark real connection", icon: "message-square" },
        { title: "Empathy Training", description: "Become a better listener and friend", icon: "ear" },
        { title: "Relationship Wisdom", description: "Insights from psychology and philosophy", icon: "book" },
      ],
      cta: "Begin Connecting",
      ctaSubtext: "The depth of life is in its connections",
    },
  },
};

const defaultContent: PersonalizedContent = {
  headline: "A Space That Knows You",
  subheadline: "Tell us a little about yourself, and watch this page transform into something crafted just for you.",
  steps: [],
  features: [
    { title: "Personalized Experience", description: "Content that adapts to your needs", icon: "sparkles" },
    { title: "Smart Recommendations", description: "Discover what resonates with you", icon: "compass" },
    { title: "Your Journey", description: "A path designed around your goals", icon: "map" },
  ],
  cta: "Get Started",
  ctaSubtext: "It only takes a moment",
};

export function getPersonalizedContent(profile: UserProfile): PersonalizedContent {
  if (!profile.goal || !profile.style) {
    return defaultContent;
  }
  return contentMap[profile.goal][profile.style];
}

export const goalOptions: Array<{ value: UserGoal; label: string; description: string; icon: string }> = [
  { value: "calm", label: "Find Calm", description: "Peace and tranquility", icon: "cloud" },
  { value: "focus", label: "Sharpen Focus", description: "Clarity and productivity", icon: "target" },
  { value: "grow", label: "Personal Growth", description: "Become your best self", icon: "trending-up" },
  { value: "connect", label: "Connect", description: "Build relationships", icon: "users" },
];

export const styleOptions: Array<{ value: UserStyle; label: string; description: string }> = [
  { value: "gentle", label: "Gentle & Nurturing", description: "Soft, encouraging approach" },
  { value: "direct", label: "Direct & Efficient", description: "Straight to the point" },
  { value: "playful", label: "Playful & Fun", description: "Light-hearted and engaging" },
  { value: "thoughtful", label: "Deep & Thoughtful", description: "Philosophical and introspective" },
];
