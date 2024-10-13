'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDispatch, useSelector } from 'react-redux'
import { selectTeamById, updateTeam } from '../../../../../features/teams/teamsSlice'
import { AppDispatch, RootState } from '../../../../store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export default function EditTeam({ params }: { params: { id: string } }) {
  const t = useTranslations('Teams')
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const teamId = parseInt(params.id, 10)
  const team = useSelector((state: RootState) => selectTeamById(state, teamId))
  const [teamName, setTeamName] = useState('')

  useEffect(() => {
    if (team) {
      setTeamName(team.teamName)
    }
  }, [team])

  const handleUpdateTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!team) return

    try {
      await dispatch(updateTeam({ id: team.id, teamName })).unwrap()
      router.push('/teams')
    } catch (error) {
      console.error('Failed to update team:', error)
    }
  }

  if (!team) {
    return <div>Team not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('editTeam')}</h1>
      <form onSubmit={handleUpdateTeam} className="space-y-4">
        <div>
          <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
            {t('teamName')}
          </label>
          <Input
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder={t('enterTeamName')}
            required
          />
        </div>
        <Button type="submit">{t('updateTeam')}</Button>
      </form>
    </div>
  )
}