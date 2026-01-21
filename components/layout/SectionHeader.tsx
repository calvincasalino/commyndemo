import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  icon: LucideIcon
  viewMoreHref?: string
}

export function SectionHeader({ title, icon: Icon, viewMoreHref }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 flex items-center justify-center">
        <Icon className="w-5 h-5 text-base-foreground" strokeWidth={2} />
      </div>
      <h2 className="flex-1 text-base font-semibold text-base-foreground leading-6">{title}</h2>
      {viewMoreHref && (
        <Link
          href={viewMoreHref}
          className="text-base font-semibold text-dwelloo-primary leading-6 hover:underline"
        >
          View more
        </Link>
      )}
    </div>
  )
}
