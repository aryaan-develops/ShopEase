'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { CreditCard, CheckCircle, ShieldCheck } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useSession } from 'next-auth/react'

export default function CheckoutPage() {
    const router = useRouter()
    const { items, totalPrice, clearCart } = useCartStore()
    const { data: session } = useSession()
    const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Success
    const [loading, setLoading] = useState(false)

    const [shippingData, setShippingData] = useState({
        name: session?.user?.name || '',
        address: '',
        city: '',
        zip: '',
        phone: ''
    })

    const [deliveryMethod, setDeliveryMethod] = useState('standard') // 'standard' or 'express'
    const shippingCost = deliveryMethod === 'standard' ? 0 : 25

    const handlePlaceOrder = async () => {
        setLoading(true)
        // Mocking API call to place order
        setTimeout(() => {
            setStep(3)
            clearCart()
            setLoading(false)
        }, 2000)
    }

    if (items.length === 0 && step !== 3) {
        return (
            <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
                <h2>Your bag is empty.</h2>
                <button onClick={() => router.push('/products')} className="btn btn-primary" style={{ marginTop: '2rem' }}>Back to Shop</button>
            </div>
        )
    }

    return (
        <div className="container" style={{ padding: '6rem 0' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {/* Steps Indicator */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '5rem' }}>
                    {[1, 2, 3].map((s) => (
                        <div key={s} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            opacity: step >= s ? 1 : 0.3,
                            color: step === s ? '#1a1a1a' : 'inherit',
                            fontWeight: step === s ? 700 : 400
                        }}>
                            <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                border: '1px solid #1a1a1a',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: step >= s ? '#1a1a1a' : 'none',
                                color: step >= s ? '#fff' : 'inherit',
                                fontSize: '0.8rem'
                            }}>{s}</div>
                            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Complete'}
                            </span>
                        </div>
                    ))}
                </div>

                {step === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '2rem' }}>Shipping Information</h2>
                                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                        <label style={{ fontSize: '0.7rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>FULL NAME</label>
                                        <input type="text" value={shippingData.name} onChange={e => setShippingData({ ...shippingData, name: e.target.value })} style={{ width: '100%', padding: '1rem', border: '1px solid #eee' }} />
                                    </div>
                                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                        <label style={{ fontSize: '0.7rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>ADDRESS</label>
                                        <input type="text" value={shippingData.address} onChange={e => setShippingData({ ...shippingData, address: e.target.value })} style={{ width: '100%', padding: '1rem', border: '1px solid #eee' }} />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontSize: '0.7rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>CITY</label>
                                        <input type="text" value={shippingData.city} onChange={e => setShippingData({ ...shippingData, city: e.target.value })} style={{ width: '100%', padding: '1rem', border: '1px solid #eee' }} />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontSize: '0.7rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>ZIP CODE</label>
                                        <input type="text" value={shippingData.zip} onChange={e => setShippingData({ ...shippingData, zip: e.target.value })} style={{ width: '100%', padding: '1rem', border: '1px solid #eee' }} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '2rem' }}>Delivery Method</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div
                                        onClick={() => setDeliveryMethod('standard')}
                                        style={{
                                            padding: '1.5rem',
                                            border: `1px solid ${deliveryMethod === 'standard' ? '#1a1a1a' : '#eee'}`,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            background: deliveryMethod === 'standard' ? '#fafafa' : 'none'
                                        }}
                                    >
                                        <div>
                                            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Standard Delivery</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>3-5 business days</p>
                                        </div>
                                        <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>FREE</p>
                                    </div>
                                    <div
                                        onClick={() => setDeliveryMethod('express')}
                                        style={{
                                            padding: '1.5rem',
                                            border: `1px solid ${deliveryMethod === 'express' ? '#1a1a1a' : '#eee'}`,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            background: deliveryMethod === 'express' ? '#fafafa' : 'none'
                                        }}
                                    >
                                        <div>
                                            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Express Delivery</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Next day delivery</p>
                                        </div>
                                        <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>$25.00</p>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => setStep(2)} className="btn btn-primary" style={{ padding: '1.25rem', marginTop: '1rem' }}>Proceed to Payment</button>
                        </div>

                        <OrderSummary items={items} subtotal={totalPrice()} shipping={shippingCost} />
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 500 }}>Payment Method</h2>
                            <div style={{ border: '2px solid #1a1a1a', padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
                                <CreditCard size={32} />
                                <div>
                                    <p style={{ fontWeight: 600 }}>Secure Credit Card Payment</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Encrypted by 256-bit SSL</p>
                                </div>
                                <CheckCircle size={20} style={{ position: 'absolute', right: '1.5rem', color: '#1a1a1a' }} />
                            </div>
                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label style={{ fontSize: '0.7rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>CARD NUMBER</label>
                                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" style={{ width: '100%', padding: '1rem', border: '1px solid #eee' }} />
                                </div>
                                <div className="form-group">
                                    <label style={{ fontSize: '0.7rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>EXPIRY</label>
                                    <input type="text" placeholder="MM/YY" style={{ width: '100%', padding: '1rem', border: '1px solid #eee' }} />
                                </div>
                                <div className="form-group">
                                    <label style={{ fontSize: '0.7rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>CVV</label>
                                    <input type="text" placeholder="XXX" style={{ width: '100%', padding: '1rem', border: '1px solid #eee' }} />
                                </div>
                            </div>
                            <button onClick={handlePlaceOrder} disabled={loading} className="btn btn-primary" style={{ padding: '1.25rem', marginTop: '2rem' }}>
                                {loading ? 'Processing...' : `Pay $${(totalPrice() + shippingCost).toFixed(2)} Now`}
                            </button>
                            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <ShieldCheck size={14} /> Transactions are encrypted and secure.
                            </p>
                        </div>
                        <OrderSummary items={items} subtotal={totalPrice()} shipping={shippingCost} />
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '5rem 0' }}>
                        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#f0fff4', color: '#2f855a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem' }}>
                            <CheckCircle size={50} />
                        </div>
                        <h1 style={{ fontSize: '3rem', fontWeight: 500, marginBottom: '1.5rem' }}>Masterpiece Secured.</h1>
                        <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto' }}>
                            Thank you for your order. We've sent a detailed receipt to your email. Your items will be dispatched within 24 hours.
                        </p>
                        <button onClick={() => router.push('/')} className="btn btn-primary" style={{ padding: '1.25rem 3rem' }}>Return to Shop</button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

function OrderSummary({ items, subtotal, shipping }: { items: any[], subtotal: number, shipping: number }) {
    return (
        <div style={{ background: '#f9f9f9', padding: '2.5rem', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '2rem' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                        <div style={{ fontSize: '0.85rem' }}>
                            <p style={{ fontWeight: 600 }}>{item.name}</p>
                            <p style={{ color: 'var(--muted)' }}>Qty: {item.quantity}</p>
                        </div>
                        <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}

                <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                        <span style={{ color: 'var(--muted)' }}>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                        <span style={{ color: 'var(--muted)' }}>Shipping</span>
                        <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.2rem', marginTop: '0.5rem' }}>
                        <span>Total</span>
                        <span>${(subtotal + shipping).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
