import React from 'react';
import type { WPPage } from '../../types/wordpress';
import { wpApi } from '../../lib/wordpress';
import { Calendar, User, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';

interface PageCardProps {
  page: WPPage;
  compact?: boolean;
}

export function PageCard({ page, compact = false }: PageCardProps) {
  const featuredImage = wpApi.extractFeaturedImage(page as any);
  const author = wpApi.extractAuthor(page as any);
  const excerpt = page.excerpt?.rendered ? wpApi.stripHtmlTags(page.excerpt.rendered) : '';
  
  const handleViewPage = () => {
    window.open(`/pages/${page.slug}`, '_blank');
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      {featuredImage && (
        <div className={`relative overflow-hidden ${compact ? 'h-48' : 'h-64'}`}>
          <img
            src={featuredImage}
            alt={page.title.rendered}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader className={compact ? 'p-4' : 'p-6'}>
        <h3 className={`font-bold text-gray-900 line-clamp-2 ${compact ? 'text-lg' : 'text-xl'}`}>
          {page.title.rendered}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={page.date}>
              {wpApi.formatDate(page.date)}
            </time>
          </div>
          
          {author && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{author.name}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className={compact ? 'p-4 pt-0' : 'p-6 pt-0'}>
        {excerpt && (
          <p className={`text-gray-600 mb-4 ${compact ? 'text-sm line-clamp-2' : 'line-clamp-3'}`}>
            {excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <Button
            onClick={handleViewPage}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            Ver página
            <ExternalLink className="w-4 h-4" />
          </Button>
          
          <div className="text-xs text-gray-400">
            Actualizada: {wpApi.formatDate(page.modified)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}