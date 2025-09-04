import React from 'react';
import type { WPPage } from '../../types/wordpress';
import { wpApi } from '../../lib/wordpress';
import { Calendar, User } from 'lucide-react';

interface PageDetailProps {
  page: WPPage;
}

export function PageDetail({ page }: PageDetailProps) {
  const featuredImage = wpApi.extractFeaturedImage(page);
  const author = wpApi.extractAuthor(page);
  const formattedDate = wpApi.formatDate(page.date);

  return (
    <article className="max-w-4xl mx-auto">
      {featuredImage && (
        <div className="relative mb-8 rounded-lg overflow-hidden">
          <img
            src={featuredImage}
            alt={page.title.rendered}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
      )}

      <header className="mb-8">
        <h1 
          className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
          dangerouslySetInnerHTML={{ __html: page.title.rendered }}
        />

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Actualizado: {formattedDate}</span>
          </div>
          
          {author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{author.name}</span>
            </div>
          )}
        </div>
      </header>

      <div 
        className="prose prose-lg max-w-none
          prose-headings:text-gray-900 
          prose-p:text-gray-700 
          prose-p:leading-relaxed
          prose-a:text-blue-600 
          prose-a:hover:text-blue-800
          prose-strong:text-gray-900
          prose-img:rounded-lg 
          prose-img:shadow-md
          prose-blockquote:border-l-blue-500
          prose-blockquote:bg-blue-50
          prose-blockquote:px-4
          prose-blockquote:py-2
          prose-blockquote:rounded-r-lg"
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />
    </article>
  );
}