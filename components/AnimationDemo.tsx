"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimationDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boxes = containerRef.current?.querySelectorAll(".demo-box");
    if (!boxes) return;

    // Different animation types
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // Box 1: gsap.to() - animate TO these values
    tl.to(boxes[0], {
      duration: 1,
      xPercent: 100, // Moves 100% of its own width (responsive!)
      rotation: 360,
      ease: "power2.inOut",
    });

    // Box 2: gsap.from() - animate FROM these values
    tl.from(
      boxes[1],
      {
        duration: 1,
        scale: 0,
        opacity: 0,
        ease: "bounce.out",
      },
      0
    ); // Start at the same time as first animation

    // Box 3: gsap.fromTo() - animate FROM -> TO
    tl.fromTo(
      boxes[2],
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "elastic.out(1, 0.3)" },
      0
    );

    // Box 4: gsap.set() - immediately set values (no animation)
    tl.set(boxes[3], { backgroundColor: "#10b981" });
    tl.to(
      boxes[3],
      {
        duration: 1,
        y: 100,
        borderRadius: "50%",
        ease: "power3.inOut",
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          GSAP Animation Types
        </h2>

        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 overflow-visible"
        >
          <div className="space-y-4">
            <h3 className="text-white text-xl">gsap.to()</h3>
            <div className="demo-box w-16 h-16 bg-red-500 rounded"></div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-xl">gsap.from()</h3>
            <div className="demo-box w-16 h-16 bg-blue-500 rounded"></div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-xl">gsap.fromTo()</h3>
            <div className="demo-box w-16 h-16 bg-purple-500 rounded"></div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-xl">gsap.set() + gsap.to()</h3>
            <div className="demo-box w-16 h-16 bg-yellow-500 rounded"></div>
          </div>
        </div>

        <div className="mt-12 text-gray-300 space-y-2">
          <p>
            <strong>gsap.to()</strong> - Animates TO specified values
          </p>
          <p>
            <strong>gsap.from()</strong> - Animates FROM specified values
          </p>
          <p>
            <strong>gsap.fromTo()</strong> - Animates FROM → TO specified values
          </p>
          <p>
            <strong>gsap.set()</strong> - Immediately sets values (no animation)
          </p>
        </div>
      </div>
    </div>
  );
}
