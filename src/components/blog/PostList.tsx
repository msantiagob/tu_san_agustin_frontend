import React, { useState, useEffect } from 'react';
import type { WPPost, WPCategory } from '../../types/wordpress';
import { wpApi } from '../../lib/wordpress';
import { PostCard } from './PostCard';
import { PostSkeleton } from './PostSkeleton';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, Filter } from 'lucide-react';

interface PostListProps {
  initialPosts?: WPPost[];
  showFilters?: boolean;
  postsPerPage?: number;
  compact?: boolean;
}

export function PostList({ 
  initialPosts = [], 
  showFilters = true, 
  postsPerPage = 9,
  compact = false 
}: PostListProps) {
  const [posts, setPosts] = useState<WPPost[]>(initialPosts);
  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [loading, setLoading] = useState(!initialPosts.length);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (!initialPosts.length) {
      loadPosts();
    }
    if (showFilters) {
      loadCategories();
    }
  }, []);

  useEffect(() => {
    if (initialPosts.length && (searchTerm || selectedCategory !== 'all')) {
      handleSearch();
    }
  }, [searchTerm, selectedCategory]);

  const loadPosts = async (page = 1, append = false) => {
    try {
      setLoading(!append);
      if (append) setLoadingMore(true);

      const params: any = {
        page,
        per_page: postsPerPage,
        _embed: true
      };

      if (searchTerm) {
        params.search = searchTerm;
      }

      if (selectedCategory !== 'all') {
        const category = categories.find(cat => cat.slug === selectedCategory);
        if (category) {
          params.categories = [category.id];
        }
      }

      const newPosts = await wpApi.getPosts(params);
      
      if (append) {
        setPosts(prev => [...prev, ...newPosts]);
      } else {
        setPosts(newPosts);
      }
      
      setHasMore(newPosts.length === postsPerPage);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadCategories = async () => {
    try {
      const cats = await wpApi.getCategories({ per_page: 50 });
      setCategories(cats);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setHasMore(true);
    loadPosts(1, false);
  };

  const loadMore = () => {
    loadPosts(currentPage + 1, true);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setCurrentPage(1);
    setHasMore(true);
    loadPosts(1, false);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {showFilters && (
          <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-48">
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        )}
        <div className={`grid gap-6 ${compact ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {Array.from({ length: postsPerPage }).map((_, index) => (
            <PostSkeleton key={index} compact={compact} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="w-full sm:w-48">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(searchTerm || selectedCategory !== 'all') && (
            <Button variant="outline" onClick={resetFilters}>
              Limpiar
            </Button>
          )}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron posts.</p>
          {(searchTerm || selectedCategory !== 'all') && (
            <Button variant="outline" onClick={resetFilters} className="mt-4">
              Ver todos los posts
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className={`grid gap-6 ${compact ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} compact={compact} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center pt-8">
              <Button
                onClick={loadMore}
                disabled={loadingMore}
                variant="outline"
                className="px-8"
              >
                {loadingMore ? 'Cargando...' : 'Cargar más posts'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}