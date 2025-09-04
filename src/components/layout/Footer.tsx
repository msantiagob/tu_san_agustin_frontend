import React from 'react';
import { Separator } from '../ui/separator';

interface FooterProps {
  siteName?: string;
}

export function Footer({ siteName = 'Tu San Agustín' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Sitio',
      links: [
        { name: 'Inicio', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: 'Acerca de', href: '/about' },
        { name: 'Contacto', href: '/contact' },
      ],
    },
    {
      title: 'Servicios',
      links: [
        { name: 'Eventos', href: '/servicios/eventos' },
        { name: 'Turismo', href: '/servicios/turismo' },
        { name: 'Bodas', href: '/servicios/bodas' },
        { name: 'Corporativo', href: '/servicios/corporativo' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacidad', href: '/privacidad' },
        { name: 'Términos', href: '/terminos' },
        { name: 'Cookies', href: '/cookies' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TS</span>
              </div>
              <span className="font-bold text-xl text-gray-900">{siteName}</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tu San Agustín es tu destino para eventos únicos y experiencias turísticas 
              inolvidables en el corazón de San Agustín, Huila.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-600 text-sm">
            © {currentYear} {siteName}. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}