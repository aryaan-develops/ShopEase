'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Star } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

interface Product {
    id: string
    name: string
    description: string
    price: number
    product_image: string
    category?: string
    vendor: { vendor_name: string }
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const addItem = useCartStore((state) => state.addItem)

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setProducts(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    if (loading) return (
        <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
            <h2 style={{ fontWeight: 300 }}>Updating Collection...</h2>
        </div>
    )

    return (
        <div className="container" style={{ padding: '6rem 0' }}>
            <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 500, marginBottom: '1rem' }}>The Shop</h1>
                <p style={{ color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                    Explore our latest curated pieces
                </p>
            </header>

            {products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '10rem 0', border: '1px solid var(--border)' }}>
                    <p style={{ color: 'var(--muted)' }}>No items found in the current collection.</p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '3rem 2rem'
                }}>
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="product-card"
                        >
                            <div className="product-image-wrapper">
                                {product.product_image ? (
                                    <img src={product.product_image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', background: '#ebebeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <ShoppingBag size={40} style={{ opacity: 0.1 }} />
                                    </div>
                                )}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '1rem',
                                    left: '1rem',
                                    right: '1rem',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease'
                                }} className="hover-action">
                                    <button
                                        onClick={() => addItem({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            quantity: 1,
                                            image: product.product_image
                                        })}
                                        className="btn btn-primary"
                                        style={{ width: '100%', padding: '0.8rem' }}
                                    >
                                        Quick Add
                                    </button>
                                </div>
                            </div>

                            <span className="product-category">{product.category || 'COLLECTION'}</span>
                            <h3 className="product-name" style={{ height: '2.5rem', overflow: 'hidden' }}>{product.name}</h3>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="product-price">${product.price.toFixed(2)}</span>
                                <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>by {product.vendor.vendor_name}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <style jsx>{`
        .product-image-wrapper:hover .hover-action {
          opacity: 1 !important;
        }
      `}</style>
        </div>
    )
}
