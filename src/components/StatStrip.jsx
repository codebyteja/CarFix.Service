import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function StatStrip() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = itemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fade/slide in items when entering the viewport
    const ctx = gsap.context(() => {
      gsap.fromTo(items,
        {
          opacity: 0,
          y: prefersReducedMotion ? 0 : 30
        },
        {
          opacity: 1,
          y: 0,
          duration: prefersReducedMotion ? 0.35 : 0.8,
          stagger: prefersReducedMotion ? 0 : 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      number: '150+',
      label: 'Inspection Points',
      desc: 'Rigorous bumper-to-bumper verification of vehicle integrity.',
    },
    {
      number: '48h',
      label: 'Turnaround Time',
      desc: 'Rapid detailing, diagnostic, and delivery preparation.',
    },
    {
      number: '12mo',
      label: 'Extended Warranty',
      desc: 'Comprehensive protection standard on all track-tuned inventory.',
    },
    {
      number: '0%',
      label: 'Hidden Fees',
      desc: 'Transparent pricing with no surprise add-ons or commissions.',
    }
  ];

  return (
    <section className="stat-strip-container" ref={containerRef}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="stat-item"
          ref={(el) => (itemsRef.current[index] = el)}
        >
          <div className="stat-number">{stat.number}</div>
          <div className="stat-label">{stat.label}</div>
          <div className="stat-desc">{stat.desc}</div>
        </div>
      ))}
    </section>
  );
}
