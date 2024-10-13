'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDispatch } from 'react-redux'
import { addTeam } from '../../../../features/teams/teamsSlice'
import { AppDispatch } from '../../../store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export default function CreateTeam() {
  const t = useTranslations('Teams')
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [teamName, setTeamName] = useState('')

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await dispatch(addTeam({ teamName })).unwrap()
      router.push('/teams')
    } catch (error) {
      console.error('Failed to create team:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('createTeam')}</h1>
      <form onSubmit={handleCreateTeam} className="space-y-4">
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
        <Button type="submit">{t('createTeam')}</Button>
      </form>
    </div>
  )
}