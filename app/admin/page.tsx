'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutDashboard, Users, ShoppingBag, DollarSign, FileText, ArrowUpRight } from 'lucide-react'

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/admin/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    if (loading) return (
        <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
            <h2 style={{ fontWeight: 300 }}>Initializing Admin Hub...</h2>
        </div>
    )

    return (
        <div className="container" style={{ padding: '8rem 0' }}>
            <header style={{ marginBottom: '5rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 500, marginBottom: '1rem' }}>Collection Overview</h1>
                <p style={{ color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Executive Management Console</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
                <div style={{ background: '#fcfcfc', border: '1px solid var(--border)', padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)' }}>REVENUE</span>
                        <DollarSign size={16} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 500 }}>${stats?.revenue?.toFixed(2)}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: '#10b981', fontSize: '0.8rem', fontWeight: 600 }}>
                        <ArrowUpRight size={14} /> <span>12% from last month</span>
                    </div>
                </div>

                <div style={{ background: '#fcfcfc', border: '1px solid var(--border)', padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)' }}>ORDERS</span>
                        <ShoppingBag size={16} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 500 }}>{stats?.totalOrders}</h2>
                </div>

                <div style={{ background: '#fcfcfc', border: '1px solid var(--border)', padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)' }}>CATALOG</span>
                        <FileText size={16} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 500 }}>{stats?.totalProducts}</h2>
                </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid var(--border)', padding: '3rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '2.5rem' }}>Recent Sales</h3>
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 700 }}>
                                <th style={{ padding: '1rem 0' }}>ORDER ID</th>
                                <th style={{ padding: '1rem 0' }}>CUSTOMER</th>
                                <th style={{ padding: '1rem 0' }}>AMOUNT</th>
                                <th style={{ padding: '1rem 0' }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '0.9rem' }}>
                            {stats?.recentOrders?.length > 0 ? (
                                stats.recentOrders.map((order: any) => (
                                    <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '1.5rem 0', fontFamily: 'monospace', color: 'var(--muted)' }}>{order.id.slice(-8)}</td>
                                        <td style={{ padding: '1.5rem 0', fontWeight: 500 }}>{order.customer.name}</td>
                                        <td style={{ padding: '1.5rem 0', fontWeight: 600 }}>${order.order_amount.toFixed(2)}</td>
                                        <td style={{ padding: '1.5rem 0' }}>
                                            <span style={{ border: '1px solid #1a1a1a', padding: '0.4rem 0.8rem', fontSize: '0.7rem', fontWeight: 700 }}>
                                                {order.order_status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--muted)' }}>
                                        No transactions captured yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
