"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ScrollSections() {
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = sectionsRef.current?.querySelectorAll(".scroll-section");
    if (!sections) return;

    sections.forEach((section, index) => {
      // Animate each section on scroll
      gsap.fromTo(
        section,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%", // Start when top of section hits 80% of viewport
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Parallax effect for images
      const image = section.querySelector(".parallax-image");
      if (image) {
        gsap.to(image, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true, // Smooth scrubbing effect
          },
        });
      }

      // Text reveal animation
      const textElements = section.querySelectorAll(".reveal-text");
      if (textElements.length > 0) {
        gsap.from(textElements, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1, // Stagger each element by 0.1s
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }

      console.log(index);
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionsRef} className="bg-gray-900">
      {/* Section 1 */}
      <section className="scroll-section min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="parallax-image w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full"></div>
          <h2 className="reveal-text text-4xl md:text-6xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="reveal-text text-xl text-gray-300 mb-6">
            I create digital experiences that inspire and engage users.
          </p>
          <div className="reveal-text grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">
                Frontend
              </h3>
              <p className="text-gray-400">React, Next.js, TypeScript</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">Design</h3>
              <p className="text-gray-400">Figma, Adobe Creative Suite</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">
                Animation
              </h3>
              <p className="text-gray-400">GSAP, Framer Motion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="scroll-section min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="reveal-text text-4xl md:text-5xl font-bold text-white mb-6">
                My Work
              </h2>
              <p className="reveal-text text-lg text-gray-300 mb-8">
                A collection of projects that showcase my passion for creating
                beautiful, functional, and user-friendly digital experiences.
              </p>
              <div className="reveal-text space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">E-commerce Platform</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Mobile App UI</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">Brand Identity</span>
                </div>
              </div>
            </div>
            <div className="parallax-image h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="scroll-section min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="reveal-text text-4xl md:text-6xl font-bold text-white mb-8">
            {"Let's Work Together"}
          </h2>
          <p className="reveal-text text-xl text-gray-300 mb-12">
            {
              "Ready to bring your ideas to life? Let's create something amazing together."
            }
          </p>
          <div className="reveal-text">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold text-lg hover:scale-105 transition-transform">
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
