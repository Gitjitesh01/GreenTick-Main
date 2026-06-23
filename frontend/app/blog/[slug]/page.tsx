'use client'

import { use, useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, CheckCircle, Mail } from 'lucide-react'
import { fetchDynamicBlogPostBySlugOrId, fetchDynamicBlogPosts, type NormalizedBlogPost } from '@/lib/api'

export default function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  
  const [scrollProgress, setScrollProgress] = useState(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [dynamicPost, setDynamicPost] = useState<NormalizedBlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [allArticles, setAllArticles] = useState<NormalizedBlogPost[]>([])

  useEffect(() => {
    async function loadPostAndAll() {
      try {
        const [p, posts] = await Promise.all([
          fetchDynamicBlogPostBySlugOrId(slug),
          fetchDynamicBlogPosts()
        ]);
        if (p) {
          setDynamicPost(p)
        }
        if (posts) {
          setAllArticles(posts)
        }
      } catch (err) {
        console.error("Failed to load Strapi post:", err)
      } finally {
        setLoading(false)
      }
    }
    loadPostAndAll()
  }, [slug])

  // Find the current post strictly from Strapi API
  const post = dynamicPost;



  // Track scroll progress for the progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        const progress = (window.pageYOffset / totalScroll) * 100
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Find related posts dynamically from loaded Strapi articles
  const relatedPosts = useMemo(() => {
    return allArticles
      .filter((p) => p.slug !== slug)
      .sort((a, b) => {
        if (a.category === post?.category && b.category !== post?.category) return -1
        if (a.category !== post?.category && b.category === post?.category) return 1
        return 0
      })
      .slice(0, 2)
  }, [allArticles, slug, post])

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-6 bg-[#ECEBE9] text-black font-mono">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="size-8 rounded-full border-2 border-[#00b259] border-t-transparent animate-spin" />
          <span className="text-xs font-bold tracking-widest text-[#00b259]">LOADING ARTICLE...</span>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-6 bg-[#ECEBE9] text-black font-mono">
        <h1 className="text-2xl font-black">404 - POST NOT FOUND</h1>
        <p className="text-neutral-500 text-sm max-w-md">The article you are trying to view does not exist or has been moved.</p>
        <Link 
          href="/blog"
          className="px-6 py-2 border border-black hover:bg-black hover:text-[#ECEBE9] transition-all text-xs font-bold"
        >
          RETURN TO BLOG
        </Link>
      </div>
    )
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-[#ECEBE9] text-black">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-16 left-0 h-1 bg-[#00b259] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Main Container */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 bg-[#ECEBE9]/50 pb-20 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-10 border-x border-[#C5C4C2]">
          
          {/* Back Button */}
          <div className="font-mono">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#C5C4C2] bg-[#ECEBE9] text-xs font-bold hover:border-black transition-colors"
              style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
            >
              <ArrowLeft className="size-4 text-[#00b259]" />
              <span>BACK TO INSIGHTS</span>
            </Link>
          </div>

          {/* Article Header */}
          <article className="space-y-8">
            <header className="space-y-6 font-mono">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-2 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5">
                  {post.category}
                </span>
                <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                  <Calendar className="size-3" /> {post.date}
                </span>
                <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                  <Clock className="size-3" /> {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight tracking-tight text-black">
                {post.title}
              </h1>

              {/* Author Details */}
              <div className="flex items-center gap-3 pt-2 border-y border-[#C5C4C2]/30 py-4">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="size-10 rounded-full border border-[#C5C4C2] grayscale"
                />
                <div>
                  <div className="text-xs font-bold text-black">{post.author.name}</div>
                  <div className="text-[10px] text-neutral-400">{post.author.role}</div>
                </div>
              </div>
            </header>

            {/* Banner Image */}
            <div 
              className="border border-[#C5C4C2] overflow-hidden aspect-video w-full relative"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-[#00b259]/5 mix-blend-multiply" />
            </div>

            {/* Article Content */}
            <div 
              className="font-serif text-neutral-800 leading-relaxed text-base sm:text-lg border-b border-[#C5C4C2]/40 pb-12
                [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-black [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-tight
                [&_p]:mb-6 [&_p]:text-neutral-700 [&_p]:leading-relaxed
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:font-sans [&_ul]:text-sm [&_ul]:text-neutral-600
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:font-sans [&_ol]:text-sm [&_ol]:text-neutral-600
                [&_li]:mb-2
                [&_blockquote]:border-l-4 [&_blockquote]:border-[#00b259] [&_blockquote]:pl-6 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-black [&_blockquote]:text-xl [&_blockquote]:font-serif"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Newsletter Form */}
          <section 
            className="border border-[#C5C4C2] bg-[#ECEBE9] p-8 sm:p-12 text-center space-y-6 font-mono"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="px-2 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5">
                :: NEWSLETTER SUBSCRIBE ::
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-black">
                Get Future Insights Direct to Inbox
              </h3>
              <p className="text-neutral-500 text-xs max-w-md mx-auto leading-relaxed">
                Join 5,000+ businesses receiving WhatsApp API strategies, scaling checklists, and automation hacks every fortnight.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#00b259] py-3 bg-[#00b259]/5 border border-[#00b259]/20 max-w-sm mx-auto">
                <CheckCircle className="size-4" />
                <span>YOU ARE SUBSCRIBED! CHECK YOUR EMAIL.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-grow">
                  <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-400">
                    <Mail className="size-4" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="Enter business email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-xs border border-[#C5C4C2] bg-[#ECEBE9] text-black rounded-none outline-none focus:border-[#00b259] transition-colors placeholder:text-neutral-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity shadow-xs shrink-0 cursor-pointer"
                  style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </section>

          {/* Related Articles */}
          <section className="space-y-6 font-mono">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span>[ RELATED READINGS ]</span>
              <div className="h-px bg-[#C5C4C2] flex-grow" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rPost) => (
                <div 
                  key={rPost.slug}
                  className="border border-[#C5C4C2] bg-[#ECEBE9] flex flex-col group"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
                >
                  {/* Image */}
                  <div className="aspect-video w-full overflow-hidden border-b border-[#C5C4C2] relative">
                    <img 
                      src={rPost.image} 
                      alt={rPost.title} 
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300" 
                    />
                    <div className="absolute inset-0 bg-[#00b259]/10 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-grow gap-3">
                    <div className="text-[9px] text-neutral-400 flex items-center gap-2">
                      <span className="text-[#00b259]">{rPost.category}</span>
                      <span>•</span>
                      <span>{rPost.readTime}</span>
                    </div>

                    <h4 className="text-xs font-black text-black group-hover:text-[#00b259] transition-colors line-clamp-2 font-serif leading-snug">
                      {rPost.title}
                    </h4>

                    <Link 
                      href={`/blog/${rPost.slug}`}
                      className="inline-flex items-center gap-1 mt-auto text-[10px] font-bold text-black hover:text-[#00b259] transition-colors"
                    >
                      <span>READ ARTICLE</span>
                      <span className="text-[#00b259]">-&gt;</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
