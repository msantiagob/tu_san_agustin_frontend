import type { WPPost, WPPage, WPCategory, WPTag, WPMedia, WPUser } from '../types/wordpress';

const WP_API_BASE = 'https://wp.tusanagustin.com/wp/wp-json/wp/v2';

export class WordPressAPI {
  private baseUrl: string;

  constructor(baseUrl: string = WP_API_BASE) {
    this.baseUrl = baseUrl;
  }

  private async fetchAPI<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Posts methods
  async getPosts(params: {
    page?: number;
    per_page?: number;
    search?: string;
    categories?: number[];
    tags?: number[];
    author?: number;
    status?: string;
    _embed?: boolean;
  } = {}): Promise<WPPost[]> {
    return this.fetchAPI<WPPost[]>('/posts', {
      ...params,
      _embed: params._embed ?? true
    });
  }

  async getPost(slug: string, embed = true): Promise<WPPost | null> {
    try {
      const posts = await this.fetchAPI<WPPost[]>('/posts', {
        slug,
        _embed: embed
      });
      return posts[0] || null;
    } catch {
      return null;
    }
  }

  async getPostById(id: number, embed = true): Promise<WPPost | null> {
    try {
      return await this.fetchAPI<WPPost>(`/posts/${id}`, {
        _embed: embed
      });
    } catch {
      return null;
    }
  }

  // Pages methods
  async getPages(params: {
    page?: number;
    per_page?: number;
    search?: string;
    parent?: number;
    _embed?: boolean;
  } = {}): Promise<WPPage[]> {
    return this.fetchAPI<WPPage[]>('/pages', {
      ...params,
      _embed: params._embed ?? true
    });
  }

  async getPage(slug: string, embed = true): Promise<WPPage | null> {
    try {
      const pages = await this.fetchAPI<WPPage[]>('/pages', {
        slug,
        _embed: embed
      });
      return pages[0] || null;
    } catch {
      return null;
    }
  }

  async getPageById(id: number, embed = true): Promise<WPPage | null> {
    try {
      return await this.fetchAPI<WPPage>(`/pages/${id}`, {
        _embed: embed
      });
    } catch {
      return null;
    }
  }

  // Categories methods
  async getCategories(params: {
    page?: number;
    per_page?: number;
    search?: string;
    parent?: number;
  } = {}): Promise<WPCategory[]> {
    return this.fetchAPI<WPCategory[]>('/categories', params);
  }

  async getCategory(slug: string): Promise<WPCategory | null> {
    try {
      const categories = await this.fetchAPI<WPCategory[]>('/categories', { slug });
      return categories[0] || null;
    } catch {
      return null;
    }
  }

  // Tags methods
  async getTags(params: {
    page?: number;
    per_page?: number;
    search?: string;
  } = {}): Promise<WPTag[]> {
    return this.fetchAPI<WPTag[]>('/tags', params);
  }

  async getTag(slug: string): Promise<WPTag | null> {
    try {
      const tags = await this.fetchAPI<WPTag[]>('/tags', { slug });
      return tags[0] || null;
    } catch {
      return null;
    }
  }

  // Media methods
  async getMedia(id: number): Promise<WPMedia | null> {
    try {
      return await this.fetchAPI<WPMedia>(`/media/${id}`);
    } catch {
      return null;
    }
  }

  async getMediaList(params: {
    page?: number;
    per_page?: number;
    media_type?: 'image' | 'video' | 'audio' | 'file';
  } = {}): Promise<WPMedia[]> {
    return this.fetchAPI<WPMedia[]>('/media', params);
  }

  // Users methods
  async getUser(id: number): Promise<WPUser | null> {
    try {
      return await this.fetchAPI<WPUser>(`/users/${id}`);
    } catch {
      return null;
    }
  }

  async getUsers(params: {
    page?: number;
    per_page?: number;
    search?: string;
  } = {}): Promise<WPUser[]> {
    return this.fetchAPI<WPUser[]>('/users', params);
  }

  // Utility methods
  extractFeaturedImage(post: WPPost): string | null {
    if (post._embedded?.['wp:featuredmedia']?.[0]) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return null;
  }

  extractAuthor(post: WPPost): WPUser | null {
    if (post._embedded?.['wp:author']?.[0]) {
      return post._embedded['wp:author'][0];
    }
    return null;
  }

  extractCategories(post: WPPost): WPCategory[] {
    if (post._embedded?.['wp:term']?.[0]) {
      return post._embedded['wp:term'][0].filter((term: any) => term.taxonomy === 'category');
    }
    return [];
  }

  extractTags(post: WPPost): WPTag[] {
    if (post._embedded?.['wp:term']?.[1]) {
      return post._embedded['wp:term'][1].filter((term: any) => term.taxonomy === 'post_tag');
    }
    return [];
  }

  stripHtmlTags(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }

  formatDate(dateString: string, locale = 'es-ES'): string {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

export const wpApi = new WordPressAPI();