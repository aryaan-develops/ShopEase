'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Package, DollarSign, List, Image as ImageIcon } from 'lucide-react'

export default function SellPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        product_image: '',
        vendor_id: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const dataToSubmit = {
                ...formData,
                vendor_id: formData.vendor_id || "65e8a4b8e4b0a1a2b3c4d5e6"
            }

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSubmit),
            })

            if (res.ok) {
                alert('Product listed successfully!')
                router.push('/products')
            } else {
                alert('Failed to list product.')
            }
        } catch (err) {
            console.error(err)
            alert('An error occurred.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container" style={{ padding: '8rem 0' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 500, marginBottom: '1rem' }}>Vendor <span style={{ fontWeight: 300, fontStyle: 'italic' }}>Portal</span></h1>
                    <p style={{ color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem' }}>List your masterpiece</p>
                </header>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ background: '#fff', border: '1px solid var(--border)', padding: '3rem' }}
                >
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>PRODUCT NAME</label>
                            <input
                                type="text"
                                required
                                placeholder="Minimalist Silk Scarf"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '1rem', background: '#fcfcfc', border: '1px solid var(--border)', borderRadius: '0', color: 'var(--foreground)' }}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>DESCRIPTION</label>
                            <textarea
                                required
                                placeholder="Describe the aesthetic and quality..."
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                style={{ width: '100%', padding: '1rem', background: '#fcfcfc', border: '1px solid var(--border)', borderRadius: '0', color: 'var(--foreground)', resize: 'none' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>PRICE (USD)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', background: '#fcfcfc', border: '1px solid var(--border)', borderRadius: '0', color: 'var(--foreground)' }}
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>STOCK</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="0"
                                    value={formData.stock_quantity}
                                    onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', background: '#fcfcfc', border: '1px solid var(--border)', borderRadius: '0', color: 'var(--foreground)' }}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>IMAGE URL</label>
                            <input
                                type="url"
                                placeholder="https://images.unsplash.com/..."
                                value={formData.product_image}
                                onChange={(e) => setFormData({ ...formData, product_image: e.target.value })}
                                style={{ width: '100%', padding: '1rem', background: '#fcfcfc', border: '1px solid var(--border)', borderRadius: '0', color: 'var(--foreground)' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '1rem', height: '60px' }}
                        >
                            {loading ? 'Processing...' : 'Add to Collection'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}
