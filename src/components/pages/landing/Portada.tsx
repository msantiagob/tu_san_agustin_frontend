import React from 'react';

export default function Portada() {
  return (
    <>
      <style>{`
        .landing-hero {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url('../../../public/assets/images/landing-empleados/banner-empleados.webp');
          background-size: cover;
          background-position: center;
          color: white;
          text-align: center;
          padding: 2rem;
        }

        .hero-content {
          max-width: 800px;
          animation: fadeInUp 1s ease-out;
        }

        .hero-content h1 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section className="landing-hero">
        <div className="hero-content">
          <h1>Tipos de Menú pa Empleados desde la Lógica Nutricional</h1>
        </div>
      </section>
    </>
  );
}
