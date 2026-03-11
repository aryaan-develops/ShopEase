'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star, ShoppingBag, ArrowRight, ShieldCheck, Truck, RefreshCw, Instagram } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const CATEGORIES = ['WOMEN', 'MEN', 'ACCESSORIES', 'LIFESTYLE']

const HERO_SLIDES = [
  {
    id: 1,
    title: "The Silver Collection",
    subtitle: "LIMITED EDITION",
    description: "Architectural Lines in Silk and Silver",
    bg: "#e0e5ec",
    image: "/hero-1.png",
    color: "#1a1a1a"
  },
  {
    id: 2,
    title: "Ethereal Grace",
    subtitle: "COUTURE 2026",
    description: "Flowing Silhouettes for the Modern Muse",
    bg: "#d2b48c",
    image: "/hero-2.png",
    color: "#fff"
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [products, setProducts] = React.useState<any[]>([])
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const addItem = useCartStore((state) => state.addItem)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6000)

    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data.slice(0, 4))
      })
      .catch(err => console.error(err))

    return () => clearInterval(timer)
  }, [])

  const slide = HERO_SLIDES[currentSlide]

  return (
    <div style={{ background: '#fff' }}>
      {/* Hero Section */}
      <motion.section style={{
        position: 'relative',
        height: 'calc(100vh - 40px)',
        minHeight: '700px',
        backgroundColor: slide.bg,
        overflow: 'hidden',
        transition: 'background-color 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: heroOpacity
      }}>
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', width: '100%', gap: '2rem', alignItems: 'center' }}>

            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ color: slide.color, gridColumn: 'span 6', zIndex: 10 }}
              className="hero-text-container"
            >
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.4em', fontWeight: 700, textTransform: 'uppercase' }}>{slide.subtitle}</span>
              <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 300, margin: '1.5rem 0', lineHeight: 1, letterSpacing: '-0.03em' }}>
                {slide.description}
              </h1>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem' }}>
                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="btn btn-primary"
                    style={{ background: slide.color, color: slide.color === '#fff' ? '#1a1a1a' : '#fff', padding: '1.25rem 3rem' }}
                  >
                    Discovery Now
                  </motion.button>
                </Link>
                <Link href="/collections">
                  <button className="btn btn-outline" style={{ borderColor: slide.color, color: slide.color, border: '1px solid' }}>
                    View Lookbook
                  </button>
                </Link>
              </div>
            </motion.div>

            <div style={{ gridColumn: 'span 6', position: 'relative', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
              <motion.img
                key={`image-${currentSlide}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={slide.image}
                alt={slide.title}
                style={{ height: '90%', width: 'auto', objectFit: 'contain', maxHeight: '800px' }}
                className="hero-image"
              />
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <div style={{ position: 'absolute', bottom: '4rem', right: '4rem', display: 'flex', gap: '1rem', zIndex: 100 }}>
          {HERO_SLIDES.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                width: '40px',
                height: '2px',
                background: slide.color,
                opacity: i === currentSlide ? 1 : 0.2,
                cursor: 'pointer',
                transition: '0.4s'
              }}
            />
          ))}
        </div>
      </motion.section>

      {/* Feature Section */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid #f0f0f0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Truck size={24} strokeWidth={1.5} />
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Complimentary Shipping</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>On all orders above $500</p>
          </div>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <ShieldCheck size={24} strokeWidth={1.5} />
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Authenticity Guaranteed</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Directly from global designers</p>
          </div>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <RefreshCw size={24} strokeWidth={1.5} />
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Artisan Returns</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>30-day effortless return policy</p>
          </div>
        </div>
      </section>

      {/* Curated Collection */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--muted)' }}>SPRING 2026</span>
              <h2 style={{ fontSize: '3rem', fontWeight: 300, marginTop: '0.5rem' }}>Curated Selections</h2>
            </div>
            <Link href="/products" style={{ fontSize: '0.8rem', fontWeight: 700, borderBottom: '1px solid #1a1a1a', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              EXPLORE ALL <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '4rem 2rem'
          }}>
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                className="product-card"
              >
                <div className="product-image-wrapper" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.02)', position: 'relative' }}>
                  <Link href={`/products/${product.id}`}>
                    <img
                      src={product.product_image || '/placeholder.png'}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '4/5' }}
                    />
                  </Link>
                  <div className="hover-action" style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', opacity: 0, transition: '0.3s' }}>
                    <button
                      onClick={() => addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.product_image,
                        quantity: 1
                      })}
                      className="btn btn-primary"
                      style={{ width: '100%', fontSize: '0.7rem' }}
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>{product.category || 'COLLECTION'}</span>
                    <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 400, margin: '0.25rem 0' }}>{product.name}</h3>
                    </Link>
                    <p style={{ fontWeight: 600 }}>${(product.price || 0).toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section style={{ padding: '10rem 0', background: '#fafafa' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
            <img src="/promo-woman.png" alt="Philosophy" style={{ width: '100%', height: '700px', objectFit: 'cover' }} />
            <div style={{ maxWidth: '500px' }}>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', opacity: 0.5 }}>PHILOSOPHY</span>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 300, margin: '2rem 0', lineHeight: 1.1 }}>Crafted for the conscious soul.</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555', marginBottom: '3rem' }}>
                We believe in slow fashion. Every piece in our collection is selected for its timeless appeal and exceptional craftsmanship, ensuring it remains a staple in your wardrobe for decades, not seasons.
              </p>
              <button className="btn btn-primary">Read Our Journal</button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <Instagram size={32} style={{ marginBottom: '2rem', opacity: 0.3 }} />
          <h2 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '1.5rem' }}>Join the Inner Circle</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '3rem' }}>Be the first to experience our seasonal drops and exclusive artistic collaborations.</p>
          <form style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            <input type="email" placeholder="Your Email Address" style={{ flex: 1, padding: '1.25rem', border: '1px solid #1a1a1a', outline: 'none' }} />
            <button className="btn btn-primary" style={{ padding: '0 2rem' }}>Subscribe</button>
          </form>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 1024px) {
          .hero-text-container { grid-column: span 12 !important; text-align: center; }
          .hero-image { display: none; }
          .hero-text-container div { justify-content: center; }
        }
      `}</style>
    </div>
  )
}
