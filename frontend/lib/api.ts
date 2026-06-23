export interface StrapiImage {
  id: number;
  url: string;
  name?: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

export interface LogoLink {
  id: number;
  label: string | null;
  href: string;
  isExternal: boolean;
  image?: StrapiImage | null;
}

export interface NavLink {
  id: number;
  href: string | null;
  label: string | null;
  isExternal: boolean;
  isButtonLink: boolean;
  type: 'PRIMARY' | 'SECONDARY' | null;
}

export interface HeaderComponent {
  id: number;
  logo: LogoLink | null;
  navItems: NavLink[];
  cta: NavLink[];
}

export interface FooterComponent {
  id: number;
  text: string | null;
  logo: LogoLink | null;
  navItems: NavLink[];
  socialLinks: LogoLink[];
}

export interface NavigationPluginItem {
  id: number;
  title: string;
  type: 'INTERNAL' | 'EXTERNAL' | 'WRAPPER';
  path: string;
  externalPath: string | null;
  uiRouterKey: string | null;
  menuAttached: boolean;
  order: number;
  collapsed: boolean;
  items?: NavigationPluginItem[];
}

export interface GlobalSettings {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string;
  header: HeaderComponent;
  footer: FooterComponent;
}

export interface StrapiGlobalResponse {
  data: GlobalSettings | null;
  meta: any;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

/**
 * Normalizes Strapi asset URLs to absolute URLs.
 */
export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
}

/**
 * Fetches the global settings from the Strapi backend with deep nesting populated.
 * Uses no-store cache to ensure real-time dynamic sync of navigation and branding.
 */
export async function fetchGlobalSettings(): Promise<GlobalSettings | null> {
  const queryParams = new URLSearchParams({
    "populate[header][populate][logo][populate]": "*",
    "populate[header][populate][cta][populate]": "*",
    "populate[footer][populate][logo][populate]": "*",
    "populate[footer][populate][navItems][populate]": "*",
    "populate[footer][populate][socialLinks][populate]": "*",
  });

  const url = `${STRAPI_URL}/api/global?${queryParams.toString()}`;

  try {
    const res = await fetch(url, {
      cache: "no-store", // disable caching for instant sync of menu changes
    });

    if (!res.ok) {
      console.warn(`Failed to fetch global settings, response status: ${res.status}`);
      return null;
    }

    const json: StrapiGlobalResponse = await res.json();
    return json.data;
  } catch (error: any) {
    if (error && (error.digest === "DYNAMIC_SERVER_USAGE" || error.message?.includes("Dynamic server usage"))) {
      throw error;
    }
    console.error("Error fetching global settings from Strapi:", error);
    return null;
  }
}

export interface StrapiBlogPageData {
  id: number;
  documentId: string;
  hero_badge: string;
  hero_title: string;
  hero_description: string;
}

export interface StrapiBlogPageResponse {
  data: StrapiBlogPageData | null;
  meta: any;
}

/**
 * Fetches the blog page hero data from the Strapi single type endpoint.
 */
export async function fetchBlogPageData(): Promise<StrapiBlogPageData | null> {
  const url = `${STRAPI_URL}/api/blog`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.warn(`Failed to fetch blog page data, response status: ${res.status}`);
      return null;
    }
    const json: StrapiBlogPageResponse = await res.json();
    return json.data;
  } catch (error: any) {
    if (error && (error.digest === "DYNAMIC_SERVER_USAGE" || error.message?.includes("Dynamic server usage"))) {
      throw error;
    }
    console.error("Error fetching blog page data from Strapi:", error);
    return null;
  }
}

/**
 * Fetches the navigation tree by slug from the Strapi Navigation plugin endpoint.
 */
export async function fetchNavigation(slug: string): Promise<NavigationPluginItem[]> {
  const url = `${STRAPI_URL}/api/navigation/render/${slug}?type=TREE`;

  try {
    const res = await fetch(url, {
      cache: "no-store", // disable caching for instant sync of menu changes
    });

    if (!res.ok) {
      console.warn(`Failed to fetch navigation: ${slug}, response status: ${res.status}`);
      return [];
    }

    const data = await res.json() as NavigationPluginItem[];
    return data;
  } catch (error: any) {
    if (error && (error.digest === "DYNAMIC_SERVER_USAGE" || error.message?.includes("Dynamic server usage"))) {
      throw error;
    }
    console.error(`Error fetching navigation ${slug} from Strapi:`, error);
    return [];
  }
}

export interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  content: string;
  slug: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  posted?: string | null;
  author?: {
    id: number;
    documentId: string;
    name: string;
    email: string | null;
  } | null;
}

export async function fetchStrapiPosts(): Promise<StrapiPost[]> {
  const url = `${STRAPI_URL}/api/posts?populate=*&sort=createdAt:desc`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching posts from Strapi:", error);
    return [];
  }
}

export async function fetchStrapiPostBySlugOrId(slugOrId: string): Promise<StrapiPost | null> {
  // First try documentId filter
  let url = `${STRAPI_URL}/api/posts?filters[documentId][$eq]=${slugOrId}&populate=*`;
  try {
    let res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        return json.data[0];
      }
    }

    // Try slug filter if not found
    url = `${STRAPI_URL}/api/posts?filters[slug][$eq]=${slugOrId}&populate=*`;
    res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        return json.data[0];
      }
    }
    
    // Try absolute document ID fetch if filters failed
    url = `${STRAPI_URL}/api/posts/${slugOrId}?populate=*`;
    res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        return json.data;
      }
    }
  } catch (error) {
    console.error(`Error fetching post ${slugOrId} from Strapi:`, error);
  }
  return null;
}

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover?: {
    url: string;
    alternativeText?: string | null;
  } | null;
  category?: {
    name: string;
    slug: string;
  } | null;
  users_permissions_users?: Array<{
    id: number;
    documentId: string;
    name: string | null;
    username: string | null;
    title: string | null;
    profile_image?: {
      url: string;
    } | null;
  }> | null;
  blocks?: any[];
}

export async function fetchStrapiArticles(): Promise<StrapiArticle[]> {
  const queryParams = new URLSearchParams({
    'populate[cover][fields][0]': 'url',
    'populate[cover][fields][1]': 'alternativeText',
    'populate[category][fields][0]': 'name',
    'populate[category][fields][1]': 'slug',
    'populate[users_permissions_users][fields][0]': 'name',
    'populate[users_permissions_users][fields][1]': 'title',
    'populate[users_permissions_users][fields][2]': 'username',
    'populate[users_permissions_users][populate][profile_image][fields][0]': 'url',
    'sort': 'createdAt:desc'
  });
  const url = `${STRAPI_URL}/api/articles?${queryParams.toString()}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching articles from Strapi:", error);
    return [];
  }
}

export async function fetchStrapiArticleBySlug(slug: string): Promise<StrapiArticle | null> {
  const queryParams = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[cover][fields][0]': 'url',
    'populate[cover][fields][1]': 'alternativeText',
    'populate[category][fields][0]': 'name',
    'populate[category][fields][1]': 'slug',
    'populate[blocks][populate]': '*',
    'populate[users_permissions_users][fields][0]': 'name',
    'populate[users_permissions_users][fields][1]': 'title',
    'populate[users_permissions_users][fields][2]': 'username',
    'populate[users_permissions_users][populate][profile_image][fields][0]': 'url'
  });
  const url = `${STRAPI_URL}/api/articles?${queryParams.toString()}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.data && json.data.length > 0) {
      return json.data[0];
    }
  } catch (error) {
    console.error(`Error fetching article ${slug} from Strapi:`, error);
  }
  return null;
}

export interface NormalizedBlogPost {
  slug: string;
  documentId?: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  isStrapiPost: boolean;
}

export async function fetchDynamicBlogPosts(): Promise<NormalizedBlogPost[]> {
  const [articles, posts] = await Promise.all([
    fetchStrapiArticles(),
    fetchStrapiPosts()
  ]);

  const normalized: NormalizedBlogPost[] = [];

  // 1. Normalize Articles
  articles.forEach((art) => {
    let contentHtml = '';
    if (art.blocks && art.blocks.length > 0) {
      art.blocks.forEach((block) => {
        if (block.__component === 'shared.rich-text' && block.body) {
          contentHtml += `<div class="rich-text my-4">${block.body}</div>`;
        } else if (block.__component === 'shared.quote' && block.body) {
          contentHtml += `<blockquote class="border-l-4 border-[#00b259] pl-6 my-8 italic text-black text-xl font-serif">${block.body}${block.title ? `<cite class="block text-xs font-mono text-neutral-400 not-italic mt-2">— ${block.title}</cite>` : ''}</blockquote>`;
        } else if (block.__component === 'shared.media' && block.file) {
          const imgUrl = getStrapiMediaUrl(block.file.url);
          contentHtml += `<img src="${imgUrl}" alt="${block.file.alternativeText || ''}" class="my-6 rounded-lg border border-[#C5C4C2]" />`;
        }
      });
    } else {
      contentHtml = convertMarkdownToHtml(art.description);
    }

    let dateStr = 'June 15, 2026';
    if (art.publishedAt || art.createdAt) {
      try {
        dateStr = new Date(art.publishedAt || art.createdAt).toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric'
        });
      } catch (e) {}
    }

    // Strip HTML/Markdown and slice for clean excerpt
    const descClean = (art.description || '').replace(/<[^>]*>/g, '').replace(/[\#\*\_]/g, '').trim();
    const excerpt = descClean.slice(0, 160) + (descClean.length > 160 ? '...' : '');

    const authorUser = art.users_permissions_users && art.users_permissions_users.length > 0 ? art.users_permissions_users[0] : null;
    const authorName = authorUser?.name || authorUser?.username || 'Aditya Sharma';
    const authorAvatar = authorUser?.profile_image?.url ? getStrapiMediaUrl(authorUser.profile_image.url) : 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-40.png';
    const authorRole = authorUser?.title || 'Author';

    normalized.push({
      slug: art.slug || art.documentId,
      documentId: art.documentId,
      title: art.title,
      excerpt: excerpt,
      content: contentHtml,
      date: dateStr,
      readTime: '5 min read',
      image: art.cover?.url ? getStrapiMediaUrl(art.cover.url) : 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=600&auto=format&fit=crop',
      category: art.category?.name || 'News',
      tags: art.category?.slug ? [art.category.slug] : ['General'],
      author: {
        name: authorName,
        avatar: authorAvatar,
        role: authorRole
      },
      isStrapiPost: false
    });
  });

  // 2. Normalize Posts
  posts.forEach((post) => {
    const contentClean = (post.content || '').replace(/<[^>]*>/g, '');
    const excerpt = contentClean.slice(0, 160) + (contentClean.length > 160 ? '...' : '');

    let dateStr = 'June 15, 2026';
    if (post.publishedAt || post.createdAt) {
      try {
        dateStr = new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric'
        });
      } catch (e) {}
    }

    normalized.push({
      slug: post.slug || post.documentId,
      documentId: post.documentId,
      title: post.title,
      excerpt: excerpt,
      content: post.content || '',
      date: dateStr,
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=600&auto=format&fit=crop',
      category: 'AI Automation',
      tags: ['Automation', 'AI Agents'],
      author: {
        name: post.author?.name || 'Jhon Doe',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-40.png',
        role: 'Author'
      },
      isStrapiPost: true
    });
  });

  // Sort by date desc (if parsable)
  normalized.sort((a, b) => {
    const timeA = new Date(a.date).getTime() || 0;
    const timeB = new Date(b.date).getTime() || 0;
    return timeB - timeA;
  });

  return normalized;
}

export async function fetchDynamicBlogPostBySlugOrId(slugOrId: string): Promise<NormalizedBlogPost | null> {
  // Try finding in posts first
  const post = await fetchStrapiPostBySlugOrId(slugOrId);
  if (post) {
    const contentClean = (post.content || '').replace(/<[^>]*>/g, '');
    const excerpt = contentClean.slice(0, 160) + (contentClean.length > 160 ? '...' : '');

    let dateStr = 'June 15, 2026';
    if (post.publishedAt || post.createdAt) {
      try {
        dateStr = new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric'
        });
      } catch (e) {}
    }

    return {
      slug: post.slug || post.documentId,
      documentId: post.documentId,
      title: post.title,
      excerpt: excerpt,
      content: post.content || '',
      date: dateStr,
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=600&auto=format&fit=crop',
      category: 'AI Automation',
      tags: ['Automation', 'AI Agents'],
      author: {
        name: post.author?.name || 'Jhon Doe',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-40.png',
        role: 'Author'
      },
      isStrapiPost: true
    };
  }

  // Try finding in articles
  const art = await fetchStrapiArticleBySlug(slugOrId);
  if (art) {
    let contentHtml = '';
    if (art.blocks && art.blocks.length > 0) {
      art.blocks.forEach((block) => {
        if (block.__component === 'shared.rich-text' && block.body) {
          contentHtml += `<div class="rich-text my-4">${block.body}</div>`;
        } else if (block.__component === 'shared.quote' && block.body) {
          contentHtml += `<blockquote class="border-l-4 border-[#00b259] pl-6 my-8 italic text-black text-xl font-serif">${block.body}${block.title ? `<cite class="block text-xs font-mono text-neutral-400 not-italic mt-2">— ${block.title}</cite>` : ''}</blockquote>`;
        } else if (block.__component === 'shared.media' && block.file) {
          const imgUrl = getStrapiMediaUrl(block.file.url);
          contentHtml += `<img src="${imgUrl}" alt="${block.file.alternativeText || ''}" class="my-6 rounded-lg border border-[#C5C4C2]" />`;
        }
      });
    } else {
      contentHtml = convertMarkdownToHtml(art.description);
    }

    let dateStr = 'June 15, 2026';
    if (art.publishedAt || art.createdAt) {
      try {
        dateStr = new Date(art.publishedAt || art.createdAt).toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric'
        });
      } catch (e) {}
    }

    // Strip HTML/Markdown and slice for clean excerpt
    const descClean = (art.description || '').replace(/<[^>]*>/g, '').replace(/[\#\*\_]/g, '').trim();
    const excerpt = descClean.slice(0, 160) + (descClean.length > 160 ? '...' : '');

    const authorUser = art.users_permissions_users && art.users_permissions_users.length > 0 ? art.users_permissions_users[0] : null;
    const authorName = authorUser?.name || authorUser?.username || 'Aditya Sharma';
    const authorAvatar = authorUser?.profile_image?.url ? getStrapiMediaUrl(authorUser.profile_image.url) : 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-40.png';
    const authorRole = authorUser?.title || 'Author';

    return {
      slug: art.slug || art.documentId,
      documentId: art.documentId,
      title: art.title,
      excerpt: excerpt,
      content: contentHtml,
      date: dateStr,
      readTime: '5 min read',
      image: art.cover?.url ? getStrapiMediaUrl(art.cover.url) : 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=600&auto=format&fit=crop',
      category: art.category?.name || 'News',
      tags: art.category?.slug ? [art.category.slug] : ['General'],
      author: {
        name: authorName,
        avatar: authorAvatar,
        role: authorRole
      },
      isStrapiPost: false
    };
  }

  return null;
}

export function convertMarkdownToHtml(markdown: string | null | undefined): string {
  if (!markdown) return "";
  
  // Split content by paragraphs/blocks
  const blocks = markdown.split(/\n\s*\n/);
  const htmlBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";
    
    // Headers
    if (trimmed.startsWith("### ")) {
      return `<h2>${trimmed.slice(4)}</h2>`;
    }
    if (trimmed.startsWith("## ")) {
      return `<h2>${trimmed.slice(3)}</h2>`;
    }
    if (trimmed.startsWith("# ")) {
      return `<h1>${trimmed.slice(2)}</h1>`;
    }
    
    // Blockquote
    if (trimmed.startsWith(">")) {
      const quoteText = trimmed.replace(/^>\s*/, "").replace(/^_\s*"/, '"').replace(/"\s*_$/, '"').replace(/^_\s*/, "").replace(/_$/, "");
      return `<blockquote class="border-l-4 border-[#00b259] pl-6 my-8 italic text-black text-xl font-serif">${quoteText}</blockquote>`;
    }
    
    // Unordered List
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const items = trimmed.split(/\n[\*\-]\s+/).map(item => {
        const cleanItem = item.replace(/^[\*\-]\s+/, "");
        return `<li>${convertBoldItalic(cleanItem)}</li>`;
      });
      return `<ul class="list-disc pl-6 mb-6 font-sans text-sm text-neutral-600">${items.join("")}</ul>`;
    }
    
    // Paragraph
    return `<p class="mb-6 text-neutral-700 leading-relaxed">${convertBoldItalic(trimmed)}</p>`;
  });
  
  return htmlBlocks.filter(b => b).join("\n");
}

function convertBoldItalic(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/__(.*?)__/g, "<strong>$1</strong>")
    .replace(/_(.*?)_/g, "<em>$1</em>");
}


