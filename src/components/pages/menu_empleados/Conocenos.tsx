import React, { useState } from 'react';

const AboutAwards: React.FC = () => {
  const [currentAward, setCurrentAward] = useState(0);

  const awards: string[] = [
    "../../../public/assets/images/awards/latin-american.png",
    "../../../public/assets/images/awards/camara-comercio.png"
  ];
  const nextAward = () => {
    setCurrentAward((prev) => (prev + 1) % awards.length);
  };

  const prevAward = () => {
    setCurrentAward((prev) => (prev - 1 + awards.length) % awards.length);
  };

  return (
    <section className="about-awards-section">
      {/* Logo */}

      <div className="content-wrapper">
        
        {/* Sección Izquierda: Conócenos */}
        <div className="about-section">
            <div className="logo-container">
              <img src="../../../public/assets/images/Tu-San-Agustin_Logo_verde-300x156.png" alt="San Agustín" className="logo" />
            </div>
          <h2 className="about-title">Conócenos</h2>
          <h3 className="about-subtitle">¿Quiénes somos?</h3>
          
          <p className="about-description">
            Somos Tu San Agustín, la empresa líder en operación de eventos. 
            Con más de 35 años, ofrecemos soluciones integrales y personalizadas 
            para cualquier tipo de evento.
          </p>

          <button className="about-button">Ver más</button>
        </div>

        {/* Línea divisoria vertical */}
        <div className="vertical-divider"></div>

        {/* Sección Derecha: Premios */}
        <div className="awards-section">
          <h2 className="awards-title">Premios y Certificaciones</h2>

          <div className="awards-carousel">
            <button 
              className="carousel-button prev" 
              onClick={prevAward}
              aria-label="Premio anterior"
            >
              ‹
            </button>

            <div className="award-display">
              <img
                src={awards[currentAward]}
                alt={`Premio ${currentAward + 1}`}
                className="award-image"
              />
            </div>

            <button 
              className="carousel-button next" 
              onClick={nextAward}
              aria-label="Siguiente premio"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .about-awards-section {
          margin-top: 80px !important;
          padding: 80px 40px;
          margin-top: 80px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .logo-container {
          margin-bottom: 60px;
          justify-self: center;
        }

        .logo {
          width: 200px;
          height: auto;
          margin-left: 80px;
        }

        .content-wrapper {
          display: grid;
          grid-template-columns: 1fr 2px 1fr;
          gap: 80px;
          align-items: start;
        }

        /* Sección Conócenos */
        .about-section {
          padding-right: 40px;
        }

        .about-title {
          font-family: 'Lora';
          font-size: 3.5rem;
          justify-self: center;
          color: #5DBDB4;
          margin-bottom: 10px;
          font-weight: 400;
        }

        .about-subtitle {
          font-family: 'Lora';
          font-size: 3.5rem;
          justify-self: center;
          color: #3A4147;
          margin-bottom: 30px;
          font-weight: 400;
        }

        .about-description {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          line-height: 1.8;
          color: #3A4147;
          margin-bottom: 40px;
        }

        .about-button {
          background: #5DBDB4;
          color: white;
          border: none;
          padding: 12px 40px;
          border-radius: 25px;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(93, 189, 180, 0.3);
        }

        .about-button:hover {
          background: #4da9a0;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(93, 189, 180, 0.4);
        }

        .vertical-divider {
          width: 2px;
          height: calc(100% - 164px);
          background: linear-gradient(to bottom, 
            transparent 0%, 
            #5DBDB4 20%, 
            #5DBDB4 80%, 
            transparent 100%
          );
          align-self: flex-end;
        }

        .awards-section {
          margin-top: 164px;
          padding-left: 40px;
        }

        .awards-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          color: #3A4147;
          margin-bottom: 50px;
          font-weight: 400;
          place-self: center;
        }

        .awards-carousel {
          width: calc(100% + 40px);
          display: flex;
          align-items: center;
          gap: 30px;
          justify-content: center;
        }

        .carousel-button {
          background: transparent;
          border: 2px solid #3A4147;
          color: #3A4147;
          font-size: 2.5rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .carousel-button:hover {
          background: #5DBDB4;
          border-color: #5DBDB4;
          color: white;
          transform: scale(1.1);
        }

        .award-display {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          width: 100%;
          height: 350px;
        }

        .award-image {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .content-wrapper {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .vertical-divider {
            display: none;
          }

          .about-section,
          .awards-section {
            padding: 0;
          }

          .about-title,
          .about-subtitle {
            font-size: 2rem;
          }

          .awards-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 768px) {
          .about-awards-section {
            padding: 60px 20px;
          }

          .logo {
            width: 150px;
            margin: auto; 
          }

          .award-display {
            height: 250px;
          }

          .carousel-button {
            width: 40px;
            height: 40px;
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutAwards;