import React, { useState, useEffect } from 'react';
import type { WPPage } from '../../types/wordpress';
import { wpApi } from '../../lib/wordpress';
import { PageCard } from './PageCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

interface PageListProps {
  initialPages?: WPPage[];
  showSearch?: boolean;
  pagesPerPage?: number;
  compact?: boolean;
}

export function PageList({ 
  initialPages = [], 
  showSearch = true, 
  pagesPerPage = 12,
  compact = false 
}: PageListProps) {
  const [pages, setPages] = useState<WPPage[]>(initialPages);
  const [loading, setLoading] = useState(!initialPages.length);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (!initialPages.length) {
      loadPages();
    }
  }, []);

  useEffect(() => {
    if (initialPages.length && searchTerm) {
      handleSearch();
    }
  }, [searchTerm]);

  const loadPages = async (page = 1, append = false) => {
    try {
      setLoading(!append);
      if (append) setLoadingMore(true);

      const params: any = {
        page,
        per_page: pagesPerPage,
        _embed: true
      };

      if (searchTerm) {
        params.search = searchTerm;
      }

      const newPages = await wpApi.getPages(params);
      
      if (append) {
        setPages(prev => [...prev, ...newPages]);
      } else {
        setPages(newPages);
      }
      
      setHasMore(newPages.length === pagesPerPage);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading pages:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setHasMore(true);
    loadPages(1, false);
  };

  const loadMore = () => {
    loadPages(currentPage + 1, true);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    setHasMore(true);
    loadPages(1, false);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {showSearch && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        )}
        <div className={`grid gap-6 ${compact ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {Array.from({ length: pagesPerPage }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border">
              <div className="h-64 bg-gray-200 rounded-t-lg animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showSearch && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar páginas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {searchTerm && (
            <Button variant="outline" onClick={resetSearch} className="mt-3">
              Limpiar búsqueda
            </Button>
          )}
        </div>
      )}

      {pages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron páginas.</p>
          {searchTerm && (
            <Button variant="outline" onClick={resetSearch} className="mt-4">
              Ver todas las páginas
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className={`grid gap-6 ${compact ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {pages.map((page) => (
              <PageCard key={page.id} page={page} compact={compact} />
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
                {loadingMore ? 'Cargando...' : 'Cargar más páginas'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}