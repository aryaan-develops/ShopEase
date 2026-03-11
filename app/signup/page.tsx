'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function SignupPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('CUSTOMER')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role }),
            })

            const data = await res.json()

            if (res.ok) {
                router.push('/login?registered=true')
            } else {
                setError(data.error || 'Something went wrong')
            }
        } catch (err) {
            setError('Failed to connect to server')
        } finally {
            setLoading(false)
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    padding: '3rem',
                    border: '1px solid #eeeeee',
                    background: '#ffffff',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{
                        fontFamily: 'serif',
                        fontSize: '2.5rem',
                        fontWeight: 400,
                        color: '#1a1a1a',
                        marginBottom: '1rem'
                    }}>Join Us</h1>
                    <p style={{ color: '#717171', fontSize: '0.9rem' }}>Experience the finest collections.</p>
                </div>

                {error && (
                    <div style={{ padding: '1rem', background: '#fff5f5', color: '#e53e3e', fontSize: '0.8rem', marginBottom: '1.5rem', borderLeft: '3px solid #e53e3e' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                        <button
                            type="button"
                            onClick={() => setRole('CUSTOMER')}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                border: '1px solid ' + (role === 'CUSTOMER' ? '#1a1a1a' : '#eee'),
                                background: role === 'CUSTOMER' ? '#1a1a1a' : '#fff',
                                color: role === 'CUSTOMER' ? '#fff' : '#1a1a1a',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                                cursor: 'pointer'
                            }}
                        >
                            CUSTOMER
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('VENDOR')}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                border: '1px solid ' + (role === 'VENDOR' ? '#1a1a1a' : '#eee'),
                                background: role === 'VENDOR' ? '#1a1a1a' : '#fff',
                                color: role === 'VENDOR' ? '#fff' : '#1a1a1a',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                                cursor: 'pointer'
                            }}
                        >
                            VENDOR
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Full Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</label>
                        <input
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
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Password</label>
                        <input
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

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        disabled={loading}
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            padding: '1.25rem',
                            marginTop: '1rem',
                            fontSize: '0.85rem',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div style={{ marginTop: '3rem', textAlign: 'center', borderTop: '1px solid #eeeeee', paddingTop: '2rem' }}>
                    <p style={{ color: '#717171', fontSize: '0.9rem' }}>
                        Already have an account?{' '}
                        <Link href="/login" style={{ color: '#1a1a1a', fontWeight: 600, textDecoration: 'underline' }}>Sign In</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
