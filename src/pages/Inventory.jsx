import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CarCard from '../components/CarCard';
import coveredImg from '../assets/covered.png';

export default function Inventory() {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.car-card');
    if (!cards || cards.length === 0) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
  }, []);

  const services = [
    {
      id: 1,
      name: 'Full Body Car Wash',
      price: '₹550 /-',
      coveredImg: coveredImg,
      revealedImg: '/services/carwash service 6.jpeg',
      specs: [
        { label: 'Time Required', value: '45 Mins' },
        { label: 'Inclusions', value: 'Foam wash & interior vacuuming' },
        { label: 'Products', value: 'Ph-neutral premium shampoo' },
      ],
    },
    {
      id: 2,
      name: 'A-Z Complete Service',
      price: '₹2500 /-',
      coveredImg: coveredImg,
      revealedImg: '/services/A-Z Service 5.jpeg',
      specs: [
        { label: 'Diagnostics', value: 'Full electrical & engine scanning' },
        { label: 'Fluids Check', value: 'Coolant, brake fluid & oil flush' },
        { label: 'Suspension', value: 'All-around joint lubing & check' },
      ],
    },
    {
      id: 3,
      name: 'Engine Oil Service',
      price: '₹1500 /-',
      coveredImg: coveredImg,
      revealedImg: '/services/oil service 2.jpeg',
      specs: [
        { label: 'Oil Type', value: 'Fully synthetic high-grade' },
        { label: 'Filter Replacement', value: 'Premium oil filter replacement' },
        { label: 'Top-up', value: 'Windshield washer and steering fluid' },
      ],
    },
    {
      id: 4,
      name: 'Wheels Alignment & Balancing',
      price: '₹850 /-',
      coveredImg: coveredImg,
      revealedImg: '/services/wheels alignement service.jpeg',
      specs: [
        { label: 'Alignment Type', value: 'Computerized 3D Alignment' },
        { label: 'Balancing', value: 'All four wheels balancing with weights' },
        { label: 'Suspension', value: 'Chassis joint inspect' },
      ],
    },
    {
      id: 5,
      name: 'Car Paint & Detailing',
      price: '₹4500 /-',
      coveredImg: coveredImg,
      revealedImg: '/services/car pain service 4.jpeg',
      specs: [
        { label: 'Restoration', value: 'Scratch and swirl mark correction' },
        { label: 'Finish Coating', value: 'Anti-glare ceramic wax coating' },
        { label: 'Paint Grade', value: 'OEM matched custom spray paint' },
      ],
    },
  ];

  return (
    <div className="section" style={{ marginTop: 'var(--header-height)' }}>
      <div className="inventory-header">
        <span className="eyebrow">Premium Care</span>
        <h2 className="about-title" style={{ fontSize: '2.5rem' }}>Our Services</h2>
        <p className="contact-subtext" style={{ marginTop: '0.5rem' }}>
          Explore our range of professional maintenance and detailing options. Tap or hover over any card to view the service execution.
        </p>
      </div>

      <div className="inventory-grid" ref={gridRef}>
        {services.map((service) => (
          <CarCard key={service.id} car={service} />
        ))}
      </div>
    </div>
  );
}
