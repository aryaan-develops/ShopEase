'use client'

import React from 'react'

export default function ContactPage() {
    return (
        <div className="container" style={{ padding: '8rem 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8rem', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ fontFamily: 'serif', fontSize: '4.5rem', fontWeight: 400, marginBottom: '2.5rem', lineHeight: 1 }}>Get in Touch</h1>
                    <p style={{ color: '#717171', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '4rem', maxWidth: '500px' }}>
                        Whether you have a question about our collections, need assistance with an order, or just want to say hello, we're here to help.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <div>
                            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>Inquiries</h3>
                            <p style={{ fontSize: '1.2rem' }}>hello@mixtas.com</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>Support</h3>
                            <p style={{ fontSize: '1.2rem' }}>support@mixtas.com</p>
                        </div>
                    </div>
                </div>

                <div style={{ background: '#f9f9f9', padding: '4rem', border: '1px solid #eeeeee' }}>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Name</label>
                            <input type="text" placeholder="Your name" style={{ border: 'none', borderBottom: '1px solid #ccc', background: 'transparent', padding: '1rem 0', outline: 'none' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</label>
                            <input type="email" placeholder="Your email" style={{ border: 'none', borderBottom: '1px solid #ccc', background: 'transparent', padding: '1rem 0', outline: 'none' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Message</label>
                            <textarea placeholder="How can we help?" rows={4} style={{ border: 'none', borderBottom: '1px solid #ccc', background: 'transparent', padding: '1rem 0', outline: 'none', resize: 'none' }} />
                        </div>
                        <button className="btn btn-primary" style={{ marginTop: '2rem', padding: '1.5rem' }}>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
