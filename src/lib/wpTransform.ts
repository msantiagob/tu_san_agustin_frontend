// Helpers para transformar la respuesta WP a objetos de UI
export type UiPost = {
  id: number;
  slug: string;
  title: string;
  href: string;
  image?: string;
  alt?: string;
  excerpt?: string;
  category?: string;
  readTimeMin: number;
  date?: string;
};

export const stripHtml = (html = "") =>
  html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

const getFeatured = (p: any) => {
  const media = p?._embedded?.["wp:featuredmedia"]?.[0];
  return {
    url: media?.source_url,
    alt: media?.alt_text || media?.title?.rendered || "",
  };
};

const getPrimaryCategory = (p: any) => {
  const terms = p?._embedded?.["wp:term"];
  // wp:term es un array de taxonomías; [0] suele ser categoría
  const cat = terms?.[0]?.[0];
  return cat?.name as string | undefined;
};

const computeReadTime = (p: any) => {
  const words = stripHtml(p?.content?.rendered || "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200)); // 200 wpm
};

export const mapPosts = (posts: any[]): UiPost[] =>
  posts.map((p) => {
    const { url, alt } = getFeatured(p);
    return {
      id: p.id,
      slug: p.slug,
      title: stripHtml(p?.title?.rendered || ""),
      href: `/blog/${p.slug}`,
      image: url,
      alt,
      excerpt: stripHtml(p?.excerpt?.rendered || ""),
      category: getPrimaryCategory(p),
      readTimeMin: computeReadTime(p),
      date: p.date,
    };
  });
