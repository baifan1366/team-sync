'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDispatch } from 'react-redux'
import { joinTeam } from '../../../../features/teams/teamsSlice'
import { AppDispatch } from '../../../store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export default function JoinTeam() {
  const t = useTranslations('Teams')
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [teamCode, setTeamCode] = useState('')

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await dispatch(joinTeam({ teamCode })).unwrap()
      router.push('/teams')
    } catch (error) {
      console.error('Failed to join team:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('joinTeam')}</h1>
      <form onSubmit={handleJoinTeam} className="space-y-4">
        <div>
          <label htmlFor="teamCode" className="block text-sm font-medium text-gray-700">
            {t('teamCode')}
          </label>
          <Input
            id="teamCode"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            placeholder={t('enterTeamCode')}
            required
          />
        </div>
        <Button type="submit">{t('joinTeam')}</Button>
      </form>
    </div>
  )
}