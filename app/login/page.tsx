'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('CUSTOMER')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if (searchParams.get('registered')) {
            setSuccess('Account created! Please sign in.')
        }
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const result = await signIn('credentials', {
            email,
            password,
            role,
            redirect: false,
        })

        if (result?.error) {
            setError('Invalid email or password')
            setLoading(false)
        } else {
            router.push('/')
            router.refresh()
        }
    }

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    padding: '3rem',
                    border: '1px solid #eeeeee',
                    background: '#ffffff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{
                        fontFamily: 'serif',
                        fontSize: '2.5rem',
                        fontWeight: 400,
                        color: '#1a1a1a',
                        marginBottom: '1rem'
                    }}>Sign In</h1>
                    <p style={{ color: '#717171', fontSize: '0.9rem' }}>Welcome back to ShopEase.</p>
                </div>

                {success && (
                    <div style={{ padding: '1rem', background: '#f0fff4', color: '#2f855a', fontSize: '0.8rem', marginBottom: '1.5rem', borderLeft: '3px solid #2f855a' }}>
                        {success}
                    </div>
                )}

                {error && (
                    <div style={{ padding: '1rem', background: '#fff5f5', color: '#e53e3e', fontSize: '0.8rem', marginBottom: '1.5rem', borderLeft: '3px solid #e53e3e' }}>
                        {error}
                    </div>
                )}

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                    {['CUSTOMER', 'VENDOR', 'ADMIN'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRole(r)}
                            style={{
                                flex: 1,
                                padding: '0.6rem',
                                border: '1px solid ' + (role === r ? '#1a1a1a' : '#eee'),
                                background: role === r ? '#1a1a1a' : '#fff',
                                color: role === r ? '#fff' : '#1a1a1a',
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label htmlFor="email" style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '1px solid #eeeeee',
                                outline: 'none',
                                fontSize: '0.95rem',
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label htmlFor="password" style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Password</label>
                            <Link href="#" style={{ fontSize: '0.75rem', color: '#717171', textDecoration: 'underline' }}>Forgot Password?</Link>
                        </div>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '1px solid #eeeeee',
                                outline: 'none',
                                fontSize: '0.95rem',
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '1.25rem',
                            marginTop: '1rem',
                            fontSize: '0.85rem',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ marginTop: '3rem', textAlign: 'center', borderTop: '1px solid #eeeeee', paddingTop: '2rem' }}>
                    <p style={{ color: '#717171', fontSize: '0.9rem' }}>
                        New to ShopEase?{' '}
                        <Link href="/signup" style={{ color: '#1a1a1a', fontWeight: 600, textDecoration: 'underline' }}>Create Account</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
