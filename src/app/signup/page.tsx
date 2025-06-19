'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import styles from './page.module.css'
import { Eye, EyeOff } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/confirm`,
      },
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('確認メールを送信しました。メールをご確認ください。')
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>サインアップ</h1>
      <form onSubmit={handleSignup} className={styles.form}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />

<button
  type="button"
  className={styles.eyeButton}
  onClick={() => setShowPassword(!showPassword)}
  aria-label="パスワードの表示切替"
>
  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
</button>

        </div>
        <button type="submit" className={styles.button}>登録</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}
