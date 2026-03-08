'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function SignupPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ name, email, password, confirmPassword })
    }

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '450px',
                padding: '3rem',
                border: '1px solid #eeeeee',
                background: '#ffffff'
            }}>
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

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label htmlFor="name" style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Full Name</label>
                        <input
                            id="name"
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
                                transition: 'border-color 0.3s ease'
                            }}
                        />
                    </div>

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
                                transition: 'border-color 0.3s ease'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label htmlFor="password" style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Password</label>
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
                                transition: 'border-color 0.3s ease'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label htmlFor="confirmPassword" style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Confirm Password</label>
                        <input
                            id="confirmPassword"
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
                                transition: 'border-color 0.3s ease'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            padding: '1.25rem',
                            marginTop: '1rem',
                            fontSize: '0.85rem'
                        }}
                    >
                        Create Account
                    </button>
                </form>

                <div style={{ marginTop: '3rem', textAlign: 'center', borderTop: '1px solid #eeeeee', paddingTop: '2rem' }}>
                    <p style={{ color: '#717171', fontSize: '0.9rem' }}>
                        Already have an account?{' '}
                        <Link href="/login" style={{ color: '#1a1a1a', fontWeight: 600, textDecoration: 'underline' }}>Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
