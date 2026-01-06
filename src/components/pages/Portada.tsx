import React from 'react';

interface PortadaProps {
  title: string;
  photo: string;
}
export default function Portada({ title, photo }: PortadaProps) {
  return (
    <>
      <style>{`
        .landing-hero {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url('${photo}');
          background-size: cover;
          background-position: center;
          color: white;
          text-align: center;
          padding: 2rem;
        }

        .hero-content {
          animation: fadeInUp 1s ease-out;
          margin: 0 35px;
        }

        .hero-content h1 {
          width: 100%;
          font-family: 'Lora';
          font-size: 5.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        @media (max-width: 480px) {
          .hero-content h1 {
          font-size: 2.5rem
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
          <h1>{title}</h1>
        </div>
      </section>
    </>
  );
}