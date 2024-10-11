import { Home, Users, MessageSquare, Clipboard, FolderKanban } from 'lucide-react'
import Link from 'next/link'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Teams', href: '/teams' },
  { icon: MessageSquare, label: 'Chat', href: '/chat' },
  { icon: Clipboard, label: 'Tasks', href: '/tasks' },
  { icon: FolderKanban, label: 'Projects', href: '/projects' },
]

export default function Sidebar() {
  return (
    <div className="flex flex-col w-56 bg-card text-card-foreground border-r border-border">
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="flex items-center p-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}