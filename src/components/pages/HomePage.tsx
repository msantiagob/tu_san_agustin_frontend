import React from 'react';
import type { WPPost } from '../../types/wordpress';
import { PostCard } from '../blog/PostCard';
import { Button } from '../ui/button';
import { ArrowRight, Star, MapPin, Calendar } from 'lucide-react';

interface HomePageProps {
  featuredPosts?: WPPost[];
}

export function HomePage({ featuredPosts = [] }: HomePageProps) {
  const features = [
    {
      icon: Calendar,
      title: 'Eventos Únicos',
      description: 'Organizamos eventos memorables adaptados a tus necesidades y presupuesto.'
    },
    {
      icon: MapPin,
      title: 'Turismo Local',
      description: 'Descubre los mejores destinos y experiencias en San Agustín y sus alrededores.'
    },
    {
      icon: Star,
      title: 'Experiencias Premium',
      description: 'Servicios de alta calidad con atención personalizada para cada cliente.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenido a Tu San Agustín
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Tu destino para eventos únicos y experiencias turísticas inolvidables 
              en el corazón de San Agustín, Huila.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Descubrir Servicios
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                Ver Blog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Qué Hacemos?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos servicios especializados en eventos y turismo con la mejor calidad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Últimas Noticias</h2>
                <p className="text-xl text-gray-600">
                  Mantente al día con nuestras últimas actualizaciones y consejos
                </p>
              </div>
              <a href="/blog">
                <Button variant="outline" className="hidden sm:flex items-center gap-2">
                  Ver todo el blog
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post) => (
                <PostCard key={post.id} post={post} compact />
              ))}
            </div>

            <div className="text-center mt-12 sm:hidden">
              <a href="/blog">
                <Button variant="outline" className="flex items-center gap-2 mx-auto">
                  Ver todo el blog
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-xl mb-8 leading-relaxed">
            Contáctanos hoy mismo y comencemos a planear tu evento o experiencia turística perfecta
          </p>
          <Button size="lg" variant="secondary">
            Contáctanos Ahora
          </Button>
        </div>
      </section>
    </div>
  );
}