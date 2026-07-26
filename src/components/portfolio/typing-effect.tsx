"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TypingEffectProps = {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
};

export function TypingEffect({
  phrases,
  className,
  typingSpeed = 55,
  deletingSpeed = 35,
  pauseDuration = 1800,
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const activePhrases =
    phrases.length > 0 ? phrases : ["Building meaningful impact"];

  useEffect(() => {
    const currentPhrase = activePhrases[phraseIndex % activePhrases.length];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = currentPhrase.slice(0, displayText.length + 1);
          setDisplayText(next);

          if (next === currentPhrase) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          const next = currentPhrase.slice(0, displayText.length - 1);
          setDisplayText(next);

          if (next.length === 0) {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % activePhrases.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    phraseIndex,
    activePhrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span>{displayText}</span>
      <span
        aria-hidden
        className="ml-1 inline-block h-[1.1em] w-[2px] animate-pulse bg-brand"
      />
    </span>
  );
}
