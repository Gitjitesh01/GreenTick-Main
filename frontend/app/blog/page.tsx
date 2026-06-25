'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Search, Clock, Calendar } from 'lucide-react'
import { fetchDynamicBlogPosts, fetchBlogPageData, type StrapiBlogPageData, type NormalizedBlogPost } from '@/lib/api'

export default function BlogIndexPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [dynamicPosts, setDynamicPosts] = useState<NormalizedBlogPost[]>([])
  const [blogPageData, setBlogPageData] = useState<StrapiBlogPageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [posts, pageData] = await Promise.all([
          fetchDynamicBlogPosts(),
          fetchBlogPageData()
        ])
        if (posts && posts.length > 0) {
          setDynamicPosts(posts)
        }
        if (pageData) {
          setBlogPageData(pageData)
        }
      } catch (err) {
        console.error("Failed to load dynamic blog posts:", err)
      } finally {
        setLoading(false)
      }
    }
    loadData();
  }, [])

  // Resolve active posts list from Strapi API
  const allPosts = dynamicPosts

  // Categories list derived from blog posts data
  const categories = useMemo(() => {
    const list = new Set(allPosts.map((post) => post.category))
    return ['All', ...Array.from(list)]
  }, [allPosts])

  // Filter blog posts based on category and search query
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory

      const title = post.title || ''
      const excerpt = post.excerpt || ''
      const tags = post.tags || []
      const searchLower = searchQuery.toLowerCase()

      const matchesSearch =
        title.toLowerCase().includes(searchLower) ||
        excerpt.toLowerCase().includes(searchLower) ||
        tags.some((tag) => (tag || '').toLowerCase().includes(searchLower))
      return matchesCategory && matchesSearch
    })
  }, [allPosts, selectedCategory, searchQuery])

  // Featured post (latest post from our active list)
  const featuredPost = useMemo(() => {
    return allPosts[0]
  }, [allPosts])



  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-6 bg-[#ECEBE9] text-black font-mono">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="size-8 rounded-full border-2 border-[#00b259] border-t-transparent animate-spin" />
          <span className="text-xs font-bold tracking-widest text-[#00b259]">LOADING BLOG...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-[#ECEBE9] text-black">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 border-x border-b border-[#C5C4C2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center space-y-6 border-x border-b border-[#C5C4C2]">
          <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
            :: {blogPageData?.hero_badge || 'INTEL & KNOWLEDGE HUB'} ::
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight leading-none text-black">
            {blogPageData?.hero_title || 'The AI Greentick Blog'}
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-sm sm:text-base font-sans">
            {blogPageData?.hero_description || 'Deep dives into WhatsApp API automation, customer engagement strategies, and scaling business workflows using conversational AI.'}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 bg-[#ECEBE9]/50 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-10 space-y-16">

          {/* Featured Post (Only show if not searching or filtering, or show if it matches) */}
          {searchQuery === '' && selectedCategory === 'All' && featuredPost && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                <span>[ FEATURED INSIGHT ]</span>
                <div className="h-px bg-[#C5C4C2] flex-grow" />
              </div>

              <div
                className="border border-[#C5C4C2] bg-[#ECEBE9] grid grid-cols-1 lg:grid-cols-12 lg:h-[440px] overflow-hidden group"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
              >
                {/* Image */}
                <div className="lg:col-span-7 h-[300px] lg:h-full w-full overflow-hidden relative border-b lg:border-b-0 lg:border-r border-[#C5C4C2]">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-[#00b259]/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
                </div>

                {/* Details */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between font-mono lg:h-full gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5">
                        {featuredPost.category}
                      </span>
                      <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                        <Clock className="size-3" /> {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-black group-hover:text-[#00b259] transition-colors leading-tight font-sans">
                      {featuredPost.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-[#C5C4C2]/40">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="size-8 rounded-full border border-[#C5C4C2] grayscale"
                      />
                      <div>
                        <div className="text-xs font-bold text-black">{featuredPost.author.name}</div>
                        <div className="text-[10px] text-neutral-400">{featuredPost.author.role}</div>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-black hover:text-[#00b259] transition-colors group/btn"
                    >
                      <span>READ ARTICLE</span>
                      <span className="text-[#00b259] group-hover/btn:translate-x-1 transition-transform">-&gt;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search & Filter Bar */}
          <div className="border border-[#C5C4C2] bg-[#ECEBE9] p-4 sm:p-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-6 font-mono"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
          >
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-400">
                <Search className="size-4" />
              </span>
              <input
                type="text"
                placeholder="Search updates by title or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-[#C5C4C2] bg-[#ECEBE9] text-black rounded-none outline-none focus:border-[#00b259] transition-colors placeholder:text-neutral-400"
              />
            </div>

            {/* Category Filter Desktop & Mobile */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-neutral-400 mr-2">[ CATEGORY ]</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-[10px] font-bold transition-all cursor-pointer ${selectedCategory === category
                    ? 'bg-black text-[#ECEBE9] border border-black'
                    : 'border border-[#C5C4C2] hover:border-black text-neutral-600 hover:text-black'
                    }`}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Post Grid */}
          <div className="space-y-8">
            <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
              <span>[ ARTICLES ({filteredPosts.length}) ]</span>
              <span>FILTER: {selectedCategory.toUpperCase()}</span>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <div
                    key={post.slug}
                    className="border border-[#C5C4C2] bg-[#ECEBE9] flex flex-col group relative"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
                  >
                    {/* Card Header Image */}
                    <div className="aspect-video w-full overflow-hidden border-b border-[#C5C4C2] relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-[#00b259]/10 mix-blend-multiply group-hover:opacity-0 transition-opacity" />

                      {/* Tag pill */}
                      <span className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold text-white bg-black/80 font-mono backdrop-blur-xs">
                        {post.category}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col flex-grow gap-4 font-mono">
                      <div className="flex items-center justify-between text-[10px] text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" /> {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-black group-hover:text-[#00b259] transition-colors line-clamp-2 leading-snug font-sans">
                        {post.title}
                      </h3>

                      <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed font-sans">
                        {post.excerpt}
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-2 mt-2 pt-4 border-t border-[#C5C4C2]/30">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="size-6 rounded-full border border-[#C5C4C2] grayscale"
                        />
                        <span className="text-[10px] font-bold text-neutral-600">{post.author.name}</span>
                      </div>

                      {/* Card Footer Link */}
                      <div className="mt-auto pt-4 flex justify-between items-center text-xs font-bold">
                        <Link href={`/blog/${post.slug}`} className="flex items-center gap-1.5 hover:text-[#00b259] transition-colors group/btn">
                          <span>READ POST</span>
                          <span className="text-[#00b259] group-hover/btn:translate-x-0.5 transition-transform">-&gt;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-[#C5C4C2] py-20 text-center font-mono">
                <p className="text-neutral-500 text-sm">NO ARTICLES FOUND MATCHING YOUR CRITERIA.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}
                  className="mt-4 px-4 py-2 border border-black text-xs font-bold hover:bg-black hover:text-[#ECEBE9] transition-all cursor-pointer"
                >
                  RESET FILTERS
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
