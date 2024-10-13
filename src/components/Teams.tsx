'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { PlusCircle, MoreVertical} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTeams, selectAllTeams, selectTeamsStatus, selectTeamsError } from '../features/teams/teamsSlice'
import { AppDispatch } from '../app/store'
import Link from 'next/link'
import { useParams } from 'next/navigation'


export default function Teams() {
  const t = useTranslations('Teams')
  const dispatch = useDispatch<AppDispatch>()
  const teams = useSelector(selectAllTeams)
  const status = useSelector(selectTeamsStatus)
  const error = useSelector(selectTeamsError)
  
  const params = useParams()
  const locale = params.locale as string

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTeams())
    }
  }, [status, dispatch])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getRandomColor = () => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
            <PlusCircle className="ml-2 h-4 w-4" />{t('joinOrCreateTeam')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href={`/${locale}/teams/join`}>{t('joinTeam')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${locale}/teams/create`}>{t('createTeam')}</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="bg-card text-card-foreground rounded-lg shadow-md p-4 flex flex-col items-center dark:border dark:border-gray-100 dark:bg-white-100">
            <div className={`w-20 h-20 rounded-md flex items-center justify-center text-white text-xl font-bold mb-3 ${getRandomColor()}`}>
              {getInitials(team.teamName)}
            </div>
            <div className="flex items-center justify-between w-full mb-2">
              <h3 className="text-lg font-semibold">{team.teamName}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/${locale}/teams/${team.id}/edit`}>{t('manageTeam')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>{t('addMember')}</DropdownMenuItem>
                  <DropdownMenuItem>{t('leaveTeam')}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
