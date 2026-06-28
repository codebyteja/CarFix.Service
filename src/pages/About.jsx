import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import revealedImg from '../assets/revealed.jpg';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = sectionRef.current?.children;
    if (!elements || elements.length === 0) return;

    // Simple scroll-triggered fade-in of container children
    const ctx = gsap.context(() => {
      gsap.fromTo(elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="section" style={{ marginTop: 'var(--header-height)' }}>
      <div className="about-layout" ref={sectionRef}>
        <div className="about-content">
          <span className="eyebrow">Our Philosophy</span>
          <h2 className="about-title">CarFix. PERFORMANCE</h2>
          <div className="about-copy">
            <p>
              We do not deal in standard commodities. CarFix was established to bridge the gap between motorsport-grade precision and daily road reliability. Every customer vehicle that enters our facility undergoes a rigorous diagnostic process before custom work begins.
            </p>
            <p>
              Our team of master technicians conducts a detailed 150-point inspection, scrutinizing structural integrity, fluid dynamics, and electronic calibrations. We analyze engine tolerances under load simulation and run compression checks. If any component falls below OEM or performance specifications, it is restored.
            </p>
            <p>
              From custom tuning, computerized suspension alignment, mechanical rebuilds, to paint correction and detailing inside our dust-free facility, we deliver services that ensure your machine performs flawlessly and commands a striking road presence.
            </p>
          </div>
        </div>

        <div className="about-image-wrapper">
          <img
            src={revealedImg}
            alt="CarFix Workshop Detail"
            className="about-image"
          />
        </div>
      </div>
    </div>
  );
}
