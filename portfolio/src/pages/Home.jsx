import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Home.css'

function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const anim = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="about" ref={ref}>
      <nav className="about-nav">
        <span className="nav-label">SOBRE MIM</span>
        <span className="nav-label">02</span>
      </nav>

      <div className="about-grid">
        <div className="col-text">
          <motion.div className="eyebrow" {...anim(0.1)}>
            PRODUÇÃO AUDIOVISUAL<br />& FOTOGRAFIA
          </motion.div>

          <motion.h2 className="about-title" {...anim(0.2)}>
            MARIA BAYALARD
          </motion.h2>

          <motion.div className="divider" {...anim(0.3)} />

          <motion.p className="about-bio" {...anim(0.4)}>
            Sou fotógrafa e diretora criativa apaixonada por capturar
            momentos que contam histórias únicas. Cada clique é uma
            oportunidade de revelar o invisível.
          </motion.p>

          <motion.p className="about-bio" {...anim(0.5)}>
            Trabalho com marcas, artistas e pessoas que acreditam que
            a imagem certa pode mudar tudo.
          </motion.p>

          <motion.div className="about-tags" {...anim(0.6)}>
            {['Fotografia', 'Direção de Arte', 'Branding', 'Conteúdo'].map(tag => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </motion.div>

          <motion.a href="#contact" className="about-cta" {...anim(0.7)}>
            vamos trabalhar juntos →
          </motion.a>
        </div>

        <motion.div className="col-photo" {...anim(0.3)}>
          <div className="photo-frame">
            <img
              src="/about.jpeg"
              alt="Maria"
              className="about-photo"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>

          <div className="badge-wrap">
            <div className="badge">
              <svg viewBox="0 0 100 100" className="badge-svg">
                <defs>
                  <path id="circle" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                </defs>
                <text className="badge-text">
                  <textPath href="#circle">FOTOGRAFIA · DIREÇÃO CRIATIVA · 2026 ·</textPath>
                </text>
              </svg>
              <span className="badge-center">★</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const albuns = [
  { id: 1, title: 'Palma DJ', year: '2026', cover: '/albuns/palma.jpg' },
  { id: 2, title: 'Peça', year: '2026', cover: '/albuns/peca.jpeg' },
]

function AlbunsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const trackRef = useRef(null)

  const scroll = (dir) => {
    if (!trackRef.current) return
    trackRef.current.scrollBy({ left: dir * 420, behavior: 'smooth' })
  }

  return (
    <section className="albuns" ref={ref}>
      <motion.div
        className="albuns-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div>
          <span className="nav-label" style={{ color: 'var(--white)', opacity: 0.4 }}>03</span>
          <h2 className="albuns-title">ÁLBUNS</h2>
        </div>
        <div className="albuns-arrows">
          <button className="arrow-btn" onClick={() => scroll(-1)}>←</button>
          <button className="arrow-btn" onClick={() => scroll(1)}>→</button>
        </div>
      </motion.div>

      <motion.div
        className="albuns-track"
        ref={trackRef}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {albuns.map((album, i) => (
          <motion.a
            key={album.id}
            href={`/album/${album.id}`}
            className="album-card"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 * i }}
          >
            <div className="album-img-wrap">
              <img src={album.cover} alt={album.title} className="album-img" />
              <div className="album-overlay" />
            </div>
            <div className="album-info">
              <span className="album-name">{album.title}</span>
              <span className="album-year">{album.year}</span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}

export default function Home() {
  const heroRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      heroRef.current.style.transform = `scale(1.05) translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* ── SEÇÃO HERO ── */}
      <main className="home">
        <div className="hero-wrap">
          <img ref={heroRef} src="/hero.jpg" alt="Captured by Rebe" className="hero-img" />
          <div className="hero-overlay" />
        </div>

        <header className="top-bar">
          <motion.span className="label" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            PORTFÓLIO
          </motion.span>
          <motion.span className="label" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            2026
          </motion.span>
        </header>

        <div className="hero-bottom">
          <div className="title-row">
            {['shot', 'by', 'maria'].map((word, i) => (
              <motion.h1
                key={word}
                className="title-word"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.h1>
            ))}
          </div>

          <div className="subtitle-row">
            <motion.p className="subtitle-left" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.9 }}>
              PRODUÇÃO<br />AUDIOVISUAL
            </motion.p>
            <motion.p className="subtitle-right" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.0 }}>
              &amp; FOTOGRAFIA<br />
            </motion.p>
          </div>
        </div>

        <motion.div className="scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <span className="scroll-line" />
          <span className="scroll-text">SCROLL</span>
        </motion.div>
      </main>

      {/* ── SEÇÃO SOBRE ── */}
      <AboutSection />

      {/* ── SEÇÃO ÁLBUNS ── */}
      <AlbunsSection />
    </>
  )
}