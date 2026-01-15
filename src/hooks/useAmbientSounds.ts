import { useEffect, useRef, useCallback } from "react";
import { UserGoal } from "@/lib/personalization";


const AMBIENT_SOUNDS = {
  base: "https://cdn.pixabay.com/audio/2022/03/15/audio_8cb749d484.mp3", 
  calm: "https://cdn.pixabay.com/audio/2024/09/10/audio_6e5d7d1912.mp3", 
  focus: "https://cdn.pixabay.com/audio/2022/01/18/audio_ea75ad3b05.mp3", 
  grow: "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3", 
  connect: "https://cdn.pixabay.com/audio/2023/07/03/audio_0a1f2e9e2a.mp3",
};

export function useAmbientSounds(volume: number, selectedGoal: UserGoal | null) {
  const baseAudioRef = useRef<HTMLAudioElement | null>(null);
  const goalAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentGoalRef = useRef<UserGoal | null>(null);


  useEffect(() => {
    const audio = new Audio(AMBIENT_SOUNDS.base);
    audio.loop = true;
    audio.volume = volume * 0.5;
    baseAudioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (baseAudioRef.current) {
      baseAudioRef.current.volume = volume * 0.5;
      if (volume === 0) {
        baseAudioRef.current.pause();
      } else if (baseAudioRef.current.paused) {
        baseAudioRef.current.play().catch(() => {});
      }
    }
  }, [volume]);

  useEffect(() => {

    if (goalAudioRef.current && currentGoalRef.current !== selectedGoal) {
      const oldAudio = goalAudioRef.current;
      oldAudio.pause();
      oldAudio.src = "";
      goalAudioRef.current = null;
    }

    if (selectedGoal && volume > 0) {
      const audio = new Audio(AMBIENT_SOUNDS[selectedGoal]);
      audio.loop = true;
      audio.volume = volume * 0.3;
      goalAudioRef.current = audio;
      currentGoalRef.current = selectedGoal;

      audio.play().catch(() => {});
    }
  }, [selectedGoal, volume > 0]);

 
  useEffect(() => {
    if (goalAudioRef.current) {
      goalAudioRef.current.volume = volume * 0.3;
      if (volume === 0) {
        goalAudioRef.current.pause();
      } else if (goalAudioRef.current.paused && selectedGoal) {
        goalAudioRef.current.play().catch(() => {});
      }
    }
  }, [volume, selectedGoal]);

  const playClickSound = useCallback(() => {
    if (volume > 0) {
      const click = new Audio("https://cdn.pixabay.com/audio/2022/03/10/audio_a89df9d8f0.mp3");
      click.volume = volume * 0.3;
      click.play().catch(() => {});
    }
  }, [volume]);

  return { playClickSound };
}
