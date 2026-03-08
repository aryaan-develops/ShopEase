'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const CATEGORIES = ['WOMEN', 'MEN', 'SHOES', 'BAGS', 'ACCESSORIES']

const HERO_SLIDES = [
  {
    id: 1,
    title: "Refined Tailoring",
    subtitle: "URBAN EDGE",
    description: "Jackets for the Modern Man",
    bg: "#75aadb",
    image: "/hero-1.png",
    color: "#fff"
  },
  {
    id: 2,
    title: "Timeless Grace",
    subtitle: "ETHEREAL ELEGANCE",
    description: "Couture in Every Silhouette",
    bg: "#e3dad1",
    image: "/hero-2.png",
    color: "#4a4a4a"
  },
  {
    id: 3,
    title: "Urban Strides",
    subtitle: "CITY CHIC",
    description: "Footwear for Active Lifestyle",
    bg: "#ced4da",
    image: "/hero-male.png",
    color: "#1a1a1a"
  }
]

const PRODUCTS = [
  { id: 1, name: 'adidas X Pop Polo shirt, navy / blue', category: 'JACKETS', price: 85.00, image: '/product-jacket.png' },
  { id: 2, name: 'adidas X Pop TRX Vintage, navy / white', category: 'SHOES', price: 69.99, image: '/product-shirt.png' },
  { id: 3, name: 'adidas X Pop Beckenhauer Track Jacket', category: 'JACKETS', price: 120.00, rating: 5, image: '/product-jacket.png' },
  { id: 4, name: 'adidas X Pop Classic t-shirt, grey / navy', category: 'SHIRTS', price: 120.00, image: '/product-shirt.png' },
  { id: 5, name: 'adidas X Pop SL Cap, navy / white', category: 'HATS', price: 55.00, image: '/product-cap.png' },
  { id: 6, name: 'Butter Yard Pullover Hood, denim', category: 'JACKETS', price: 120.00, image: '/product-jacket.png' },
  { id: 7, name: 'Parra Rug Pull t-shirt, white', category: 'SHIRTS', price: 60.00, image: '/product-shirt.png' },
  { id: 8, name: 'Carhartt L/S DeadKebab Knock Knock Sweet', category: 'JACKETS', price: 135.00, image: '/product-jacket.png' },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = HERO_SLIDES[currentSlide]

  return (
    <div style={{ background: '#fff' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '600px',
        height: 'calc(100vh - 40px)',
        backgroundColor: slide.bg,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.8s ease'
      }}>
        <div className="hero-container container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '2rem', padding: '120px 1rem 60px' }}>

          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ color: slide.color, textAlign: 'center', zIndex: 5 }}
            className="hero-content"
          >
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', fontWeight: 600 }}>{slide.subtitle}</span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 700, margin: '1rem 0 1.5rem', lineHeight: 1.1 }}>
              {slide.description}
            </h1>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                style={{
                  background: slide.color === '#fff' ? '#fff' : '#1a1a1a',
                  color: slide.color === '#fff' ? '#1a1a1a' : '#fff',
                  borderRadius: '4px',
                  padding: '1rem 2.5rem'
                }}
              >
                Discovery Now
              </motion.button>
            </Link>
          </motion.div>

          {/* Model Images */}
          <div className="hero-image-wrapper" style={{ height: '50vh', zIndex: 1 }}>
            <motion.img
              key={`image-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              src={slide.image}
              alt={slide.title}
              style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Navigation Arrows - Hidden on small mobile */}
        <div className="nav-arrows" style={{ position: 'absolute', width: '100%', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', zIndex: 20 }}>
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 'clamp(40px, 8vw, 60px)', height: 'clamp(40px, 8vw, 60px)', color: slide.color, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 'clamp(40px, 8vw, 60px)', height: 'clamp(40px, 8vw, 60px)', color: slide.color, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Slide Indicators */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.75rem', zIndex: 20 }}>
          {HERO_SLIDES.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                width: i === currentSlide ? '30px' : '8px',
                height: '3px',
                background: slide.color,
                borderRadius: '2px',
                opacity: i === currentSlide ? 1 : 0.3,
                cursor: 'pointer',
                transition: 'all 0.4s ease'
              }}
            />
          ))}
        </div>

        <style jsx>{`
          .hero-container { min-height: 100%; }
          .hero-image-wrapper { width: 100%; display: flex; justify-content: center; }
          @media (min-width: 1024px) {
            .hero-container { flex-direction: row !important; justify-content: space-between !important; text-align: left !important; padding: 0 2rem !important; }
            .hero-content { text-align: left !important; max-width: 50%; }
            .hero-image-wrapper { width: 50%; height: 700px !important; }
            .hero-title { margin-left: 0 !important; }
          }
          @media (max-width: 640px) {
            .nav-arrows { display: none !important; }
            .hero-title { font-size: 2.2rem !important; }
          }
        `}</style>
      </section>

      {/* New Arrivals Section */}
      <section style={{ padding: 'clamp(3rem, 10vw, 6rem) 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', marginBottom: '2rem', fontWeight: 500 }}>New Arrivals</h2>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1rem, 3vw, 3rem)', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.7rem',
                  fontWeight: i === 0 ? 700 : 500,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  borderBottom: i === 0 ? '2px solid #1a1a1a' : 'none',
                  paddingBottom: '0.5rem',
                  color: i === 0 ? '#1a1a1a' : '#717171'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {PRODUCTS.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper" style={{ background: '#f9f9f9', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="hover-zoom"
                  />
                </div>
                <span className="product-category">{product.category}</span>
                <h3 className="product-name" style={{ fontSize: '0.9rem' }}>{product.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  {product.rating && (
                    <div style={{ display: 'flex', gap: '2px', color: '#ffc107', marginLeft: 'auto' }}>
                      {[...Array(product.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Grid */}
      <section style={{ padding: '0 0 clamp(3rem, 10vw, 6rem)' }}>
        <div className="container">
          <div className="res-promo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>

            {/* Left Big Promo */}
            <div className="promo-item" style={{ background: '#f5f5f5', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', height: '600px' }}>
              <div className="promo-content">
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#717171' }}>ETHEREAL ELEGANCE</span>
                <h2 style={{ fontSize: '1.8rem', margin: '1rem 0 1.5rem' }}>Where Dreams <br /> Meet Couture</h2>
                <button className="btn btn-outline" style={{ width: 'fit-content' }}>Shop Now</button>
              </div>
              <img src="/promo-woman.png" alt="Promo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
            </div>

            {/* Right Side: Split Promos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="promo-item" style={{ background: '#f5f5f5', position: 'relative', overflow: 'hidden', height: '290px' }}>
                <div className="promo-content">
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#717171' }}>RADIANT REVERIE</span>
                  <h2 style={{ fontSize: '1.5rem', margin: '0.5rem 0 1.5rem' }}>Enchanting Styles</h2>
                  <button className="btn btn-outline" style={{ width: 'fit-content' }}>Shop Now</button>
                </div>
                <img src="/promo-woman.png" alt="Radiant Reverie" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, opacity: 0.7 }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', height: '290px' }}>
                <div className="promo-item" style={{ background: '#f5f5f5', position: 'relative', overflow: 'hidden' }}>
                  <img src="/shoes-promo.png" alt="Shoes" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                  <div className="promo-content" style={{ top: '1.5rem', left: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', margin: '0.5rem 0' }}>City Chic</h3>
                  </div>
                </div>
                <div className="promo-item" style={{ background: '#4d6980', color: '#fff', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                  <img src="/bags-promo.png" alt="Bags" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, opacity: 0.4 }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>50%</h2>
                    <span style={{ fontSize: '0.6rem', textTransform: 'uppercase' }}>OFF NOW</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
