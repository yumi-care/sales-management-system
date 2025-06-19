'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ConfirmPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div style={{ textAlign: 'center', marginTop: '120px' }}>
      <h1>メール認証が完了しました</h1>
      <p>ログイン画面へ自動で移動します…</p>
    </div>
  )
}
