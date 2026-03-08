'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, X, ArrowRight, Minus, Plus } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

    if (items.length === 0) {
        return (
            <div className="container" style={{ padding: '12rem 0', textAlign: 'center' }}>
                <ShoppingBag size={80} style={{ opacity: 0.1, marginBottom: '2rem' }} />
                <h1 style={{ fontWeight: 400, marginBottom: '1rem' }}>Your bag is empty</h1>
                <p style={{ color: 'var(--muted)', marginBottom: '3rem' }}>Looks like you haven't added anything yet.</p>
                <Link href="/products" className="btn btn-primary">Start Shopping</Link>
            </div>
        )
    }

    return (
        <div className="container" style={{ padding: '8rem 0' }}>
            <header style={{ marginBottom: '5rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 500, marginBottom: '1rem' }}>Shopping Bag</h1>
                <p style={{ color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Review your selections</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '2rem 0',
                                gap: '2.5rem',
                                borderBottom: '1px solid var(--border)'
                            }}
                        >
                            <div style={{ width: '120px', height: '150px', background: '#f5f5f5', flexShrink: 0 }}>
                                {item.image && <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </div>

                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '0.5rem' }}>{item.name}</h3>
                                <span className="product-category" style={{ fontSize: '0.8rem' }}>Unit Price: ${item.price.toFixed(2)}</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', border: '1px solid var(--border)', padding: '0.5rem 1rem' }}>
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'none', border: 'none', color: '#1a1a1a', cursor: 'pointer' }}>
                                    <Minus size={16} />
                                </button>
                                <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', color: '#1a1a1a', cursor: 'pointer' }}>
                                    <Plus size={16} />
                                </button>
                            </div>

                            <div style={{ minWidth: '100px', textAlign: 'right', fontWeight: 700 }}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>

                            <button
                                onClick={() => removeItem(item.id)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#717171' }}
                            >
                                <X size={20} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div style={{ height: 'fit-content', position: 'sticky', top: '150px', background: '#f9f9f9', padding: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', fontWeight: 500 }}>Summary</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '0.9rem' }}>
                            <span>Subtotal</span>
                            <span>${totalPrice().toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '0.9rem' }}>
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.25rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                            <span>Total</span>
                            <span>${totalPrice().toFixed(2)}</span>
                        </div>
                    </div>

                    <Link href="/checkout" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', width: '100%', height: '60px' }}>
                        Checkout <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
