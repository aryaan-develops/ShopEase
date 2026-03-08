'use client'

import React from 'react'

const blogPosts = [
    {
        id: '1',
        title: 'The Art of Minimalist Living',
        excerpt: 'Discover the beauty of simplicity and how it can transform your daily life.',
        date: 'March 1, 2026',
        category: 'Lifestyle'
    },
    {
        id: '2',
        title: 'Spring Collection 2026: A First Look',
        excerpt: 'An exclusive preview into our upcoming seasonal highlights.',
        date: 'February 24, 2026',
        category: 'Fashion'
    },
    {
        id: '3',
        title: 'Why Sustainable Fashion Matters',
        excerpt: 'Exploring the impact of conscious shopping on the environment.',
        date: 'February 15, 2026',
        category: 'Sustainability'
    }
]

export default function BlogPage() {
    return (
        <div className="container" style={{ padding: '8rem 0' }}>
            <header style={{ marginBottom: '6rem', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'serif', fontSize: '3.5rem', fontWeight: 400, marginBottom: '1.5rem', color: '#1a1a1a' }}>The Journal</h1>
                <p style={{ color: '#717171', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Insights, stories, and style from Mixtas.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }}>
                {blogPosts.map((post) => (
                    <div key={post.id} style={{ borderBottom: '1px solid #eeeeee', paddingBottom: '3rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: '#717171', letterSpacing: '0.1em' }}>{post.category}</span>
                        <h2 style={{ fontSize: '1.5rem', margin: '1rem 0', fontWeight: 500, lineHeight: 1.3 }}>{post.title}</h2>
                        <p style={{ color: '#717171', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>{post.excerpt}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                            <span style={{ color: '#717171' }}>{post.date}</span>
                            <button style={{ background: 'none', border: 'none', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
