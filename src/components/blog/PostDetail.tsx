import React from 'react';
import type { WPPost } from '../../types/wordpress';
import { wpApi } from '../../lib/wordpress';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface PostDetailProps {
  post: WPPost;
  showBackButton?: boolean;
}

export function PostDetail({ post, showBackButton = true }: PostDetailProps) {
  const featuredImage = wpApi.extractFeaturedImage(post);
  const author = wpApi.extractAuthor(post);
  const categories = wpApi.extractCategories(post);
  const tags = wpApi.extractTags(post);
  const formattedDate = wpApi.formatDate(post.date);

  return (
    <article className="max-w-4xl mx-auto">
      {showBackButton && (
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Button>
        </div>
      )}

      {featuredImage && (
        <div className="relative mb-8 rounded-lg overflow-hidden">
          <img
            src={featuredImage}
            alt={post.title.rendered}
            className="w-full h-64 md:h-96 object-cover"
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

      <header className="mb-8">
        <h1 
          className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
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

        {author && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Avatar className="w-12 h-12">
              <AvatarImage src={author.avatar_urls['96']} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{author.name}</p>
              {author.description && (
                <p className="text-sm text-gray-600">
                  {wpApi.stripHtmlTags(author.description)}
                </p>
              )}
            </div>
          </div>
        )}
      </header>

      <Separator className="my-8" />

      <div 
        className="prose prose-lg max-w-none mb-8
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
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      <Separator className="my-8" />

      <footer className="space-y-6">
        {(categories.length > 0 || tags.length > 0) && (
          <div className="space-y-4">
            {categories.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Categorías</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge key={category.id} variant="outline">
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {tags.length > 0 && (
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Etiquetas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary">
                      #{tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {showBackButton && (
          <div className="text-center pt-8">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Button>
          </div>
        )}
      </footer>
    </article>
  );
}