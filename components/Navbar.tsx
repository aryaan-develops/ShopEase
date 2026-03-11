'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingBag, User, Search, Heart, ChevronDown, LogOut, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
    const totalItems = useCartStore((state) => state.totalItems())
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const { data: session } = useSession()

    return (
        <nav className="navbar" style={{ padding: '0 1.5rem' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', position: 'relative' }}>

                {/* Left Side: Navigation (Desktop) */}
                <div className="nav-links-desktop" style={{ display: 'none', gap: '1.5rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'Shop', path: '/products' },
                        { name: 'Sell', path: '/sell' },
                    ].map((item) => (
                        <motion.div key={item.name} whileHover={{ y: -2 }}>
                            <Link href={item.path} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'inherit' }}>
                                {item.name}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', zIndex: 1100 }}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Center: Logo */}
                <Link href="/" className="logo" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.04em', color: '#1a1a1a', fontFamily: 'serif', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                    <motion.span whileHover={{ scale: 1.05 }} style={{ display: 'inline-block' }}>ShopEase</motion.span>
                </Link>

                {/* Right Side: Icons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.8rem, 2vw, 1.5rem)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {session ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600 }} className="icon-hide-mobile">
                                    {session.user?.name}
                                </span>
                                <button onClick={() => signOut()} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link href="/login" title="Login / Signup" style={{ color: 'inherit' }}><User size={18} /></Link>
                            </motion.div>
                        )}
                    </div>

                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Search size={18} style={{ cursor: 'pointer' }} />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Link href="/cart" style={{ position: 'relative', color: 'inherit' }}>
                            <ShoppingBag size={18} />
                            {totalItems > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-6px',
                                    right: '-6px',
                                    background: '#1a1a1a',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '14px',
                                    height: '14px',
                                    fontSize: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            position: 'fixed',
                            top: '90px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '95%',
                            background: 'rgba(255,255,255,0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '2rem',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            zIndex: 999,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            textAlign: 'center',
                            overflow: 'hidden'
                        }}
                    >
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'Shop', path: '/products' },
                            { name: 'Sell', path: '/sell' },
                            { name: 'Cart', path: '/cart' }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{ fontSize: '1.2rem', fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
              @media (min-width: 1024px) {
                .nav-links-desktop { display: flex !important; }
                .mobile-toggle { display: none !important; }
                .logo { font-size: 1.8rem !important; }
              }
              @media (max-width: 640px) {
                .icon-hide-mobile { display: none !important; }
              }
            `}</style>
        </nav>
    )
}
