import React from 'react';
import type { WPPost } from '../../types/wordpress';
import { wpApi } from '../../lib/wordpress';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Calendar, User } from 'lucide-react';

interface PostCardProps {
  post: WPPost;
  compact?: boolean;
}

export function PostCard({ post, compact = false }: PostCardProps) {
  const featuredImage = wpApi.extractFeaturedImage(post);
  const author = wpApi.extractAuthor(post);
  const categories = wpApi.extractCategories(post);
  const formattedDate = wpApi.formatDate(post.date);
  const excerpt = wpApi.stripHtmlTags(post.excerpt.rendered);

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${compact ? 'h-full' : ''}`}>
      {featuredImage && (
        <div className={`relative overflow-hidden ${compact ? 'h-48' : 'h-64'}`}>
          <img
            src={featuredImage}
            alt={post.title.rendered}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {categories.length > 0 && (
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-white/90 text-gray-800">
                {categories[0].name}
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <CardHeader className={compact ? 'pb-3' : 'pb-4'}>
        <h3 className={`font-bold leading-tight line-clamp-2 ${compact ? 'text-lg' : 'text-xl'}`}>
          <a 
            href={`/blog/${post.slug}`}
            className="hover:text-blue-600 transition-colors duration-200"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </h3>
      </CardHeader>

      <CardContent className={compact ? 'pt-0 pb-3' : 'pt-0 pb-4'}>
        {!compact && (
          <p className="text-gray-600 line-clamp-3 mb-4">
            {excerpt}
          </p>
        )}
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          
          {author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{author.name}</span>
            </div>
          )}
        </div>
      </CardContent>

      {!compact && author && (
        <CardFooter className="pt-0 border-t">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={author.avatar_urls['48']} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{author.name}</p>
              {author.description && (
                <p className="text-xs text-gray-500 line-clamp-1">
                  {wpApi.stripHtmlTags(author.description)}
                </p>
              )}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}