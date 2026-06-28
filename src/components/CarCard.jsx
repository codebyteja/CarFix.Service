import React from 'react';

export default function CarCard({ car }) {
  return (
    <article className="car-card">
      <div className="car-card-img-wrapper">
        <img
          src={car.revealedImg}
          alt={car.name}
          className="car-card-img"
          loading="lazy"
        />
      </div>

      <div className="car-card-details">
        <div className="car-card-footer">
          <h3 className="car-card-title">{car.name}</h3>
          <span className="car-card-price">{car.price}</span>
        </div>

        <div className="car-card-specs">
          {car.specs.map((spec, idx) => (
            <div key={idx} className="car-card-spec-item">
              <span className="car-card-spec-label">{spec.label}:</span>
              <span className="car-card-spec-value">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
