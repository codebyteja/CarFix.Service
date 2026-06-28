import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import StatStrip from '../components/StatStrip';

export default function Home() {
  return (
    <main>
      {/* Scroll-reveal Hero (pinned) */}
      <Hero />

      {/* 4 Stats Stack */}
      <StatStrip />

      {/* Teaser link to Inventory */}
      <div className="teaser-container">
        <Link to="/inventory" className="teaser-link">
          View Services <span>&rarr;</span>
        </Link>
      </div>
    </main>
  );
}
