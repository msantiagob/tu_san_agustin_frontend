import React from 'react';

interface VideoProps {
  urlVideo: string;
}

export default function Video({ urlVideo }: VideoProps) {
  // Convertir cualquier URL de YouTube a formato embed
  const getEmbedUrl = (url: string) => {
    // Eliminar espacios en blanco
    url = url.trim();
    
    let videoId = '';
    
    // Patrones para capturar el ID del video
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /(?:m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        videoId = match[1];
        break;
      }
    }
    
    if (videoId) {
      return `https://www.youtube-nocookie.com/embed/${videoId}`;
    }
    
    // Si no se pudo extraer el ID, retornar la URL original
    console.error('No se pudo extraer el ID del video de:', url);
    return url;
  };

  const embedUrl = getEmbedUrl(urlVideo);

  return (
    <>
      <style>{`
        .video-container {
            width: 100vw;
            max-width: 700px;
            aspect-ratio: 16 / 9;
            height: auto;
            margin: 0 auto 40px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        
        .video-container iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
      `}</style>

      <div>
        <div className="video-container">
          <iframe 
            src={embedUrl}
            title="Video Tu San Agustín"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin">
          </iframe>
        </div>
      </div>
    </>
  );
}