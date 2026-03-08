'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, Truck, CheckCircle, ShieldCheck, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
    const router = useRouter()
    const { items, totalPrice, clearCart } = useCartStore()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    })

    const handleCheckout = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items,
                    total_amount: totalPrice(),
                    payment_method: 'Credit Card',
                    card_details: {
                        number: formData.cardNumber,
                        expiry: formData.expiry
                    },
                    customer_info: {
                        name: formData.name,
                        address: formData.address
                    }
                })
            })

            if (res.ok) {
                setStep(3)
                clearCart()
            } else {
                alert('Payment processing failed.')
            }
        } catch (err) {
            console.error(err)
            alert('An error occurred during checkout.')
        } finally {
            setLoading(false)
        }
    }

    if (items.length === 0 && step !== 3) {
        router.push('/products')
        return null
    }

    return (
        <div className="container" style={{ padding: '8rem 0' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>

                {/* Simple Progress Tracker */}
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '5rem', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--muted)' }}>
                    <span style={{ color: step >= 1 ? '#1a1a1a' : 'inherit' }}>01 SHIPPING</span>
                    <span style={{ opacity: 0.3 }}>/</span>
                    <span style={{ color: step >= 2 ? '#1a1a1a' : 'inherit' }}>02 PAYMENT</span>
                    <span style={{ opacity: 0.3 }}>/</span>
                    <span style={{ color: step >= 3 ? '#1a1a1a' : 'inherit' }}>03 CONFIRMATION</span>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h2 style={{ fontSize: '2rem', fontWeight: 500, marginBottom: '3rem' }}>Shipping Details</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                                <input
                                    type="text" placeholder="Full Name"
                                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: '0', background: '#fcfcfc' }}
                                />
                                <input
                                    type="text" placeholder="Street Address"
                                    value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: '0', background: '#fcfcfc' }}
                                />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <input
                                        type="text" placeholder="City"
                                        value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: '0', background: '#fcfcfc' }}
                                    />
                                    <input
                                        type="text" placeholder="Postcode / ZIP"
                                        value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                        style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: '0', background: '#fcfcfc' }}
                                    />
                                </div>
                                <button onClick={() => setStep(2)} className="btn btn-primary" style={{ marginTop: '2rem', height: '60px' }}>
                                    Continue to Payment
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', cursor: 'pointer' }} onClick={() => setStep(1)}>
                                <ArrowLeft size={16} /> <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>BACK TO SHIPPING</span>
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 500, marginBottom: '3rem' }}>Payment Method</h2>

                            <div style={{ border: '1px solid #1a1a1a', padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <CreditCard size={24} />
                                    <span style={{ fontWeight: 600 }}>Credit Card</span>
                                </div>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#1a1a1a' }}></div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                                <input
                                    type="text" placeholder="Card Number"
                                    value={formData.cardNumber} onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: '0', background: '#fcfcfc' }}
                                />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <input
                                        type="text" placeholder="Expiry (MM/YY)"
                                        value={formData.expiry} onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                                        style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: '0', background: '#fcfcfc' }}
                                    />
                                    <input
                                        type="password" placeholder="CVV"
                                        value={formData.cvv} onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                        style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: '0', background: '#fcfcfc' }}
                                    />
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className="btn btn-primary"
                                    style={{ marginTop: '2rem', height: '60px' }}
                                >
                                    {loading ? 'Processing...' : `Place Order - $${totalPrice().toFixed(2)}`}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ textAlign: 'center', padding: '6rem 0' }}
                        >
                            <CheckCircle size={80} strokeWidth={1} style={{ color: '#1a1a1a', marginBottom: '2rem' }} />
                            <h2 style={{ fontSize: '3rem', fontWeight: 500, marginBottom: '1.5rem' }}>Thank You.</h2>
                            <p style={{ color: 'var(--muted)', marginBottom: '4rem' }}>Your order has been received and is being prepared for shipment.</p>
                            <button onClick={() => router.push('/products')} className="btn btn-primary" style={{ height: '60px' }}>Continue Shopping</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
