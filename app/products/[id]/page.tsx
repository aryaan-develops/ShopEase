'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingBag, Star, ArrowLeft, Truck, Shield, RefreshCw, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'

interface Product {
    id: string
    name: string
    description: string
    price: number
    product_image: string
    category?: string
    stock_quantity: number
    vendor: { vendor_name: string }
    reviews: any[]
}

export default function ProductDetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const addItem = useCartStore((state) => state.addItem)

    useEffect(() => {
        if (id) {
            fetch(`/api/products/${id}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data)
                    setLoading(false)
                })
                .catch(() => setLoading(false))
        }
    }, [id])

    if (loading) return <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}><h2>Loading masterpiece...</h2></div>
    if (!product) return <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}><h2>Product not found.</h2></div>

    return (
        <div className="container" style={{ padding: '6rem 0' }}>
            <Link href="/products" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', color: 'var(--muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <ArrowLeft size={16} /> Back to Collection
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
                {/* Left: Product Image */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ background: '#f9f9f9', position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}
                >
                    <img
                        src={product.product_image || '/placeholder.png'}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </motion.div>

                {/* Right: Product Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                    <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{product.category || 'Limited Edition'}</span>
                        <h1 style={{ fontSize: '3rem', fontWeight: 500, margin: '0.5rem 0' }}>{product.name}</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>${(product.price || 0).toFixed(2)}</span>
                            <div style={{ display: 'flex', color: '#ffc107' }}>
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.round(product.reviews?.reduce((acc, r) => acc + r.rating, 0) / (product.reviews?.length || 1) || 5) ? "currentColor" : "none"} />)}
                                <span style={{ marginLeft: '10px', color: '#717171', fontSize: '0.9rem' }}>({product.reviews?.length || 0} reviews)</span>
                            </div>
                        </div>
                    </div>

                    <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1.1rem' }}>
                        {product.description || 'Elevate your style with this exclusive piece. Meticulously crafted for those who appreciate the finer details of modern luxury.'}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ display: 'flex', border: '1px solid var(--border)', width: 'fit-content' }}>
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '0.75rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>-</button>
                                <span style={{ padding: '0.75rem 1rem', minWidth: '40px', textAlign: 'center' }}>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '0.75rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>+</button>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: product.stock_quantity > 0 ? '#2f855a' : '#e53e3e' }}>
                                {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                            </span>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button
                                disabled={product.stock_quantity === 0}
                                onClick={() => {
                                    addItem({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        image: product.product_image,
                                        quantity
                                    });
                                }}
                                className="btn btn-outline"
                                style={{ flex: 1, padding: '1.25rem', fontSize: '0.9rem' }}
                            >
                                Add to Bag
                            </button>
                            <button
                                disabled={product.stock_quantity === 0}
                                onClick={() => {
                                    addItem({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        image: product.product_image,
                                        quantity
                                    });
                                    router.push('/checkout');
                                }}
                                className="btn btn-primary"
                                style={{ flex: 1, padding: '1.25rem', fontSize: '0.9rem' }}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
                            <Truck size={20} />
                            <span>Express Delivery</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
                            <Shield size={20} />
                            <span>Secure Checkout</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
                            <RefreshCw size={20} />
                            <span>30-Day Returns</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
                            <User size={20} />
                            <span>Contact Vendor: {product.vendor?.vendor_name}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Reviews Section */}
            <div style={{ marginTop: '8rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 500, marginBottom: '3rem' }}>Customer Reviews</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {product.reviews && product.reviews.length > 0 ? (
                            product.reviews.map((review: any) => (
                                <div key={review.id} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '2.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                                                {review.customer?.name?.[0] || 'U'}
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{review.customer?.name || 'Verified User'}</p>
                                                <p style={{ fontSize: '0.8rem', color: '#717171' }}>{new Date(review.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', color: '#ffc107' }}>
                                            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />)}
                                        </div>
                                    </div>
                                    <p style={{ color: '#555', lineHeight: 1.6 }}>{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#717171', fontStyle: 'italic' }}>No reviews yet. Be the first to share your thoughts.</p>
                        )}
                    </div>

                    <div style={{ background: '#f9f9f9', padding: '3rem', height: 'fit-content' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '1.5rem' }}>Write a Review</h3>
                        <AddReviewForm productId={product.id} onComplete={() => window.location.reload()} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function AddReviewForm({ productId, onComplete }: { productId: string, onComplete: () => void }) {
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product_id: productId, rating, comment })
            })
            if (res.ok) onComplete()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>RATING</label>
                <div style={{ display: 'flex', gap: '0.5rem', color: '#ffc107' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                            key={s}
                            size={20}
                            fill={s <= rating ? "currentColor" : "none"}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setRating(s)}
                        />
                    ))}
                </div>
            </div>
            <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>COMMENT</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    style={{ width: '100%', padding: '1rem', border: '1px solid #eee', minHeight: '120px', resize: 'none' }}
                    placeholder="Share your experience..."
                />
            </div>
            <button disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
                {loading ? 'Submitting...' : 'Post Review'}
            </button>
        </form>
    )
}
