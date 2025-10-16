import React from 'react';
import type { WPPost } from '../../types/wordpress';
import { wpApi } from '../../lib/wordpress';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { User } from 'lucide-react';
import { Button } from '../ui/button';

interface PostCardProps {
  post: WPPost & {
    authorName?: string;
    authorAvatar?: string;
    authorDescription?: string;
  };
  compact?: boolean;
}

export function PostCard({ post, compact = false }: PostCardProps) {
  const featuredImage = wpApi.extractFeaturedImage(post);
  const categories = wpApi.extractCategories(post);

  const _author = wpApi.extractAuthor(post);
  const authorName = post.authorName || _author?.name;

  const description = wpApi.stripHtmlTags(
    (post as any)?.content?.rendered || post?.excerpt?.rendered || ''
  );

  return (
    <Card
      className={[
        'bg-white text-secondary-color',
        'border border-text-color-light/40',
        'overflow-hidden transition-all duration-300 hover:shadow-lg',
        compact ? 'h-full' : ''
      ].join(' ')}
    >
      {featuredImage && (
        <div className={`relative overflow-hidden ${compact ? 'h-48' : 'h-64'}`}>
          <img
            src={featuredImage}
            alt={post.title.rendered}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {categories.length > 0 && (
            <div className="absolute top-4 left-4">
              <Badge
                variant="secondary"
                className="bg-white/90 text-secondary-color border border-text-color-light"
              >
                {categories[0].name}
              </Badge>
            </div>
          )}
        </div>
      )}

<CardHeader className={`${compact ? 'pb-3' : 'pb-4'} group`}>
  <h3
    className={`font-bold leading-tight line-clamp-2 ${compact ? 'text-lg' : 'text-xl'} !text-primary-color`}
  >
    <a
      href={`/posts/${post.slug}`}
      className="group-hover:!text-primary-color-hover !text-inherit"
      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
    />
  </h3>
</CardHeader>


      <CardContent className={compact ? 'pt-0 pb-3' : 'pt-0 pb-4'}>
        <p className="text-secondary-color-hover line-clamp-3 mb-4">
          {description}
        </p>
        <Separator className="h-[9px] bg-primary-color" />
      </CardContent>

      {!compact && (
        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full">
            {/* Autor con icono User */}
            <div className="flex items-center gap-2 text-sm text-secondary-color">
              <User className="w-4 h-4 text-primary-color" />
              <span>
                <span className="text-secondary-color">Por:&nbsp;</span>
                {authorName || 'Anónimo'}
              </span>
            </div>

            {/* Botón outline */}
            <a
              href={`/posts/${post.slug}`}
              aria-label={`Leer más sobre ${wpApi.stripHtmlTags(post.title.rendered)}`}
              className="shrink-0"
            >
              <Button
                variant="outline"
                size="sm"
                className={[
                  'border-primary-color text-primary-color',
                  'hover:border-primary-color-hover hover:text-primary-color-hover hover:bg-primary-color/10',
                  'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-color/50'
                ].join(' ')}
              >
                Leer más
              </Button>
            </a>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}