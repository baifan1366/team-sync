'use client'

import { useState } from 'react'
import { Home, Users, MessageSquare, Clipboard, FolderKanban, Menu, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { icon: Home, labelKey: 'dashboard', href: '/dashboard' },
  { icon: Users, labelKey: 'teams', href: '/teams' },
  { icon: Clipboard, labelKey: 'tasks', href: '/tasks' },
  { icon: FolderKanban, labelKey: 'projects', href: '/projects' },
  { icon: MessageSquare, labelKey: 'chat', href: '/chat' },
]

export default function Sidebar() {
  const t = useTranslations('Sidebar')
  const locale = useLocale()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return (
    <motion.div
      className={`flex flex-col bg-card text-card-foreground border-r border-border h-screen`}
      animate={{ width: isCollapsed ? 70 : 200 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xl font-semibold"
          >
            {t('menu')}
          </motion.h2>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(`/${locale}${item.href}`)
            return (
              <li key={item.href}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/${locale}${item.href}`}
                        className={`flex items-center p-3 rounded-lg text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-accent text-accent-foreground font-medium'
                            : 'hover:bg-accent/50 hover:text-accent-foreground'
                        }`}
                      >
                        <item.icon className={`w-5 h-5 ${isCollapsed ? 'mr-0' : 'mr-3'}`} />
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {t(item.labelKey)}
                          </motion.span>
                        )}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
                        <p>{t(item.labelKey)}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-muted-foreground"
          >
            © 2023 Team Sync
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}