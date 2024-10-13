'use client'

import { Home, Users, MessageSquare, Clipboard, FolderKanban } from 'lucide-react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

const navItems = [
  { icon: Home, labelKey: 'dashboard', href: '/' },
  { icon: Users, labelKey: 'teams', href: '/teams' },
  { icon: MessageSquare, labelKey: 'chat', href: '/chat' },
  { icon: Clipboard, labelKey: 'tasks', href: '/tasks' },
  { icon: FolderKanban, labelKey: 'projects', href: '/projects' },
]

export default function Sidebar() {
  const t = useTranslations('Sidebar')
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-56 bg-card text-card-foreground border-r border-border">
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(`/${locale}${item.href}`)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-md text-sm transition-colors duration-200 ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {t(item.labelKey)}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}