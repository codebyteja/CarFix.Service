import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const imagesRef = useRef([]);
  const frameCount = 120;

  // Center and fill canvas (object-fit: cover implementation)
  const drawImage = (img, canvas, context) => {
    if (!img || !img.complete || !canvas || !context) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    if (!imgWidth || !imgHeight) return;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      drawX = 0;
      drawY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawHeight = canvasHeight;
      drawX = (canvasWidth - drawWidth) / 2;
      drawY = 0;
    }

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // 1. Asynchronously pre-load all 120 images in the background
  useEffect(() => {
    const loadedImages = [];
    const canvas = canvasRef.current;
    const context = canvas ? canvas.getContext('2d') : null;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/ezgif-1912ef94a9f39b8a-jpg/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        // Draw first frame immediately to make hero visible right away
        if (i === 1 && canvas && context) {
          drawImage(img, canvas, context);
        }
      };

      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  // 2. Trigger GSAP scroll interactions instantly
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Draw active frame utility
    const drawActive = (index) => {
      const activeImg = imagesRef.current[index];
      if (activeImg && activeImg.complete) {
        drawImage(activeImg, canvas, context);
      } else {
        // Fallback: search backwards for nearest loaded image
        for (let k = index; k >= 0; k--) {
          const fallbackImg = imagesRef.current[k];
          if (fallbackImg && fallbackImg.complete) {
            drawImage(fallbackImg, canvas, context);
            break;
          }
        }
      }
    };

    // Make canvas display at device native pixel ratio (prevents blurriness)
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Redraw active frame
      const activeIdx = getActiveFrameIndex();
      drawActive(activeIdx);
    };

    const getActiveFrameIndex = () => {
      if (!containerRef.current) return 0;
      const val = containerRef.current.style.getPropertyValue('--active-frame');
      return val ? Math.round(parseFloat(val)) : 0;
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Init sizing on load

    const ctx = gsap.context(() => {
      const airObj = { frame: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: prefersReducedMotion ? '+=100%' : '+=380%',
          pin: true,
          pinSpacing: true,
          scrub: 1.5, // 1.5s momentum delay softens mobile wheel and trackpad swipe jumps
          invalidateOnRefresh: true,
        }
      });

      // Scale away texts in first 30% of scroll progress
      tl.to(contentRef.current, {
        opacity: 0,
        y: prefersReducedMotion ? 0 : -50,
        duration: 0.3,
        ease: 'power1.out'
      }, 0);

      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: prefersReducedMotion ? 0 : 20,
        duration: 0.2,
        ease: 'power1.out'
      }, 0);

      // Scrub frames progression
      if (prefersReducedMotion) {
        tl.to(airObj, {
          frame: frameCount - 1,
          duration: 1,
          onUpdate: function () {
            const p = this.progress();
            const frameIndex = p > 0.5 ? frameCount - 1 : 0;
            if (containerRef.current) {
              containerRef.current.style.setProperty('--active-frame', frameIndex);
            }
            drawActive(frameIndex);
          }
        }, 0.1);
      } else {
        tl.to(airObj, {
          frame: frameCount - 1,
          ease: 'none',
          duration: 1,
          onUpdate: () => {
            const index = Math.round(airObj.frame);
            if (containerRef.current) {
              containerRef.current.style.setProperty('--active-frame', index);
            }
            drawActive(index);
          }
        }, 0);
      }
    }, containerRef);

    // Initial check: if first frame became ready before this effect, render it
    const firstImg = imagesRef.current[0];
    if (firstImg && firstImg.complete) {
      drawImage(firstImg, canvas, context);
    }

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="hero-pin-container" ref={containerRef}>
      <div className="hero-viewport">
        {/* Canvas container for smooth drawing */}
        <div className="hero-images-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              backgroundColor: '#050505'
            }}
          />
        </div>

        {/* Dark Vignette Overlay */}
        <div className="hero-vignette"></div>

        {/* Text Content Overlay */}
        <div className="hero-content" ref={contentRef}>
          <span className="eyebrow">Exquisite Engineering</span>
          <h1 className="hero-title">CarFix.<br />PERFORMANCE</h1>
          {/* <p className="hero-subtext">
            Handpicked, fully inspected, and meticulously tuned track-grade vehicles. Roll scroll down to build.
          </p> */}
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
          <span>Scroll</span>
          <div className="scroll-line-container">
            <div className="scroll-line-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
