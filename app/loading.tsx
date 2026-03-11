'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function Loading() {
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            background: '#fff',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999
        }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: '200px' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ height: '1px', background: '#1a1a1a' }}
            />
            <h2 style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', opacity: 0.5 }}>
                ShopEase Experience
            </h2>
        </div>
    )
}
