'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from './page.module.css'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.replace('/login')
      } else {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return <p className={styles.message}>読み込み中...</p>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ダッシュボード</h1>
      <p className={styles.text}>ログイン済みのユーザーだけが見られるページです。</p>
    </div>
  )
}
