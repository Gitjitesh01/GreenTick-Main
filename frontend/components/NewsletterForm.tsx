'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { subscribeToNewsletter } from '@/lib/api'

type NewsletterFormProps = {
  source?: string
}

const NewsletterForm = ({ source = 'website-newsletter' }: NewsletterFormProps) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setErrorMsg('')
    try {
      const result = await subscribeToNewsletter(email, source)
      if (result.success) {
        setSubscribed(true)
        setEmail('')
      } else {
        setErrorMsg(result.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setErrorMsg('Failed to connect to the subscription server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section 
      className="border border-[#C5C4C2] bg-[#ECEBE9] p-8 sm:p-12 text-center space-y-6 font-mono w-full"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
    >
      <div className="flex flex-col items-center gap-3">
        <span className="px-2 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 font-mono">
          :: NEWSLETTER SUBSCRIBE ::
        </span>
        <h3 className="text-xl sm:text-2xl font-bold font-sans text-black">
          Get Future Insights Direct to Inbox
        </h3>
        <p className="text-neutral-500 text-xs max-w-md mx-auto leading-relaxed font-sans">
          Join 5,000+ businesses receiving WhatsApp API strategies, scaling checklists, and automation hacks every fortnight.
        </p>
      </div>

      {subscribed ? (
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#00b259] py-3 bg-[#00b259]/5 border border-[#00b259]/20 max-w-sm mx-auto">
          <CheckCircle className="size-4 shrink-0" />
          <span>YOU ARE SUBSCRIBED! CHECK YOUR EMAIL.</span>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full">
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-400">
              <Mail className="size-4" />
            </span>
            <input
              type="email"
              required
              disabled={loading}
              placeholder="Enter business email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs border border-[#C5C4C2] bg-[#ECEBE9] text-black rounded-none outline-none focus:border-[#00b259] transition-colors placeholder:text-neutral-400 font-sans disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity shadow-xs shrink-0 cursor-pointer disabled:opacity-50"
            style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
          >
            {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
          </button>
        </form>
      )}

      {errorMsg && (
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-red-500 max-w-sm mx-auto">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMsg.toUpperCase()}</span>
        </div>
      )}
    </section>
  )
}

export default NewsletterForm
