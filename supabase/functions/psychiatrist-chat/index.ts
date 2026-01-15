import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatRequest {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  goal: string;
  style: string;
}

const goalPrompts: Record<string, string> = {
  calm: `You are helping someone who seeks inner peace and calm. They want to reduce anxiety, find tranquility, and create peaceful moments in their life. Focus on stress management, relaxation techniques, mindfulness, and emotional regulation.`,
  focus: `You are helping someone who wants to improve their concentration and productivity. They struggle with distractions and want to achieve more. Focus on attention training, productivity habits, eliminating distractions, and building focus routines.`,
  grow: `You are helping someone on a personal growth journey. They want to become a better version of themselves, build new habits, and reach their potential. Focus on self-improvement, habit formation, goal setting, and overcoming limiting beliefs.`,
  connect: `You are helping someone who wants to build deeper connections with others. They may feel lonely or want to improve their relationships. Focus on communication skills, vulnerability, building trust, and nurturing meaningful relationships.`,
};

const stylePrompts: Record<string, string> = {
  gentle: `Speak with warmth, empathy, and encouragement. Use soft language, validate their feelings, and never push too hard. Be like a caring friend who listens deeply.`,
  direct: `Be straightforward and efficient. Get to the point quickly, give clear actionable advice, and don't sugarcoat things. Respect their time while remaining supportive.`,
  playful: `Be light-hearted, use humor when appropriate, and make the conversation feel fun. Use casual language, emojis occasionally, and keep the energy positive.`,
  thoughtful: `Be philosophical and introspective. Ask deep questions, reference wisdom from psychology and philosophy, and encourage profound self-reflection.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, goal, style } = (await req.json()) as ChatRequest;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const goalContext = goalPrompts[goal] || goalPrompts.calm;
    const styleContext = stylePrompts[style] || stylePrompts.gentle;

    const systemPrompt = `You are a compassionate AI wellness companion and therapist. ${goalContext}

Communication style: ${styleContext}

Important guidelines:
- Be empathetic and non-judgmental
- Ask thoughtful follow-up questions to understand their situation better
- Provide practical, actionable advice when appropriate
- Acknowledge their feelings before offering solutions
- Keep responses concise (2-4 paragraphs max)
- If they share something serious (self-harm, abuse, etc.), gently encourage them to seek professional help
- Remember previous messages in the conversation to provide continuity
- You can use markdown formatting for emphasis when helpful`;

    console.log(`Chat request for goal: ${goal}, style: ${style}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to connect to AI service" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
