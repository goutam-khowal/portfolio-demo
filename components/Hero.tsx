"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const [hasMounted, setHasMounted] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Only trigger GSAP after mount to avoid hydration issues
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    // Set initial safe state
    gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
      opacity: 1,
      autoAlpha: 1,
      scale: 1,
      y: 0,
      display: "column",
      visibility: "visible",
    });

    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: "power3.out",
    })
      .from(
        subtitleRef.current,
        {
          duration: 0.8,
          y: 50,
          opacity: 0,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        buttonRef.current,
        {
          duration: 0.6,
          scale: 0,
          autoAlpha: 0,
          ease: "circ.out(1.7)",
          transformOrigin: "center center",
        },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, [hasMounted]);

  // Optional: prevent render before hydration is complete
  if (!hasMounted) return null;

  return (
    <div
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      <div className="text-center text-white max-w-4xl px-6">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
        >
          Goutam Khowal
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl mb-8 text-gray-300">
          Full Stack Developer
        </p>
        <button
          ref={buttonRef}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold hover:scale-105 transition-all"
        >
          View My Work
        </button>
      </div>
    </div>
  );
}
