'use client'

import type { HTMLAttributes, ImgHTMLAttributes } from 'react'

export const GreenTickBadge = ({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img src="/logo-icon.png" alt="aiGreenTick badge" className={className} {...props} />
  )
}

export const AiGreenTickLogo = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`flex items-center ${className}`} {...props}>
      <img src="/logo-full.png" alt="aiGreenTick" className="h-9 w-auto select-none" />
    </div>
  )
}
