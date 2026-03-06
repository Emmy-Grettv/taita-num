import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
    FiArrowRight, FiShield, FiTruck, FiDroplet,
    FiEye, FiZap, FiRadio, FiCheckCircle
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import './Home.css'

/* ---- Animation variants ---- */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' } }),
}

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
}

/* ---- Animated Counter ---- */
function Counter({ target, suffix = '' }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const countRef = useRef(null)

    useEffect(() => {
        if (!inView) return
        let start = 0
        const duration = 1800
        const step = Math.ceil(target / (duration / 16))
        const timer = setInterval(() => {
            start = Math.min(start + step, target)
            if (countRef.current) countRef.current.textContent = start + suffix
            if (start >= target) clearInterval(timer)
        }, 16)
        return () => clearInterval(timer)
    }, [inView, target, suffix])

    return <span ref={ref}><span ref={countRef}>0{suffix}</span></span>
}

/* ---- Particle Canvas ---- */
function ParticleCanvas() {
    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animId
        const particles = []
        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()
        window.addEventListener('resize', resize)
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 0.5,
                dx: (Math.random() - 0.5) * 0.4,
                dy: (Math.random() - 0.5) * 0.4,
                opacity: Math.random() * 0.5 + 0.1,
            })
        }
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach(p => {
                p.x += p.dx; p.y += p.dy
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(0, 194, 255, ${p.opacity})`
                ctx.fill()
            })
            // Draw connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 100) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(31, 111, 235, ${0.08 * (1 - dist / 100)})`
                        ctx.lineWidth = 0.5
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }
            animId = requestAnimationFrame(draw)
        }
        draw()
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
    }, [])
    return <canvas ref={canvasRef} id="particles-canvas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}

/* ---- Service Highlight Cards ---- */
const highlights = [
    { icon: <FiTruck />, title: 'Cargo Tracking', desc: 'Advanced ECTS and electronic seals for seamless cargo monitoring.' },
    { icon: <FiShield />, title: 'Fleet Management', desc: 'Real-time GPS tracking, maintenance alerts and fuel management.' },
    { icon: <FiDroplet />, title: 'Smart Meters', desc: 'Prepaid water & gas meters with cloud monitoring platforms.' },
    { icon: <FiEye />, title: 'Driver Monitoring', desc: 'In-cabin AI systems for drowsiness detection & alcohol prevention.' },
    { icon: <FiRadio />, title: 'Media Monitoring', desc: 'Comprehensive media monitoring tools for organizations.' },
    { icon: <FiZap />, title: 'Online Gambling Tax', desc: 'Monitoring tools for online gambling platforms for accurate taxation.' },
]

const stats = [
    { n: 2017, suffix: '', label: 'Founded' },
    { n: 11, suffix: '+', label: 'Core Services' },
    { n: 5, suffix: '+', label: 'Years Active' },
    { n: 100, suffix: '%', label: 'Rwanda-Based' },
]

const partners = ['Rwanda Revenue Authority', 'RDB Registered']

export default function Home() {
    return (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" exit={{ opacity: 0 }}>

            {/* ====== HERO ====== */}
            <section className="hero">
                <div className="hero__bg">
                    <img src="/hero_banner.png" alt="IoT Smart City" className="hero__bg-img" />
                    <div className="hero__overlay" />
                    <ParticleCanvas />
                </div>

                <div className="container hero__content">
                    <motion.div className="hero__text" initial="hidden" animate="visible">
                        <motion.div variants={fadeUp} custom={0} className="badge badge-cyan">
                            <div className="pulse-dot" />
                            Rwanda's #1 IoT Solutions Provider
                        </motion.div>

                        <motion.h1 variants={fadeUp} custom={1} className="heading-xl hero__headline">
                            Powering Rwanda's<br />
                            <span className="text-gradient-light">Smart Future</span><br />
                            with IoT Technology
                        </motion.h1>

                        <motion.p variants={fadeUp} custom={2} className="hero__subtitle">
                            TAITA-NUM LTD delivers cutting-edge tracking, monitoring, and automation
                            systems — from electronic cargo seals to smart meters and fleet management.
                        </motion.p>

                        <motion.div variants={fadeUp} custom={3} className="hero__actions">
                            <Link to="/services" className="btn btn-cyan btn-lg">
                                Explore Services <FiArrowRight />
                            </Link>
                            <a
                                href="https://wa.me/250785382824"
                                className="btn btn-outline btn-lg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaWhatsapp size={18} /> WhatsApp Us
                            </a>
                        </motion.div>

                        <motion.div variants={fadeUp} custom={4} className="hero__trust">
                            <FiCheckCircle className="hero__trust-icon" />
                            <span>Trusted partner of <strong>Rwanda Revenue Authority (RRA)</strong></span>
                        </motion.div>
                    </motion.div>

                    {/* Hero Card Float */}
                    <motion.div
                        className="hero__card float-anim"
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="hero__card-header">
                            <div className="hero__card-dot hero__card-dot--green" />
                            <div className="hero__card-dot hero__card-dot--yellow" />
                            <div className="hero__card-dot hero__card-dot--red" />
                            <span className="hero__card-title">Live Monitoring</span>
                        </div>
                        <div className="hero__card-body">
                            <div className="hero__metric">
                                <span className="hero__metric-label">Active Cargo Units</span>
                                <span className="hero__metric-value">1,247</span>
                                <span className="hero__metric-up">↑ 12%</span>
                            </div>
                            <div className="hero__metric">
                                <span className="hero__metric-label">Fleet Vehicles Tracked</span>
                                <span className="hero__metric-value">843</span>
                                <span className="hero__metric-up">↑ 8%</span>
                            </div>
                            <div className="hero__metric">
                                <span className="hero__metric-label">Smart Meters Online</span>
                                <span className="hero__metric-value">5,901</span>
                                <span className="hero__metric-up">↑ 22%</span>
                            </div>
                            <div className="hero__metric-bar">
                                <div className="hero__metric-bar-fill" style={{ width: '78%' }} />
                            </div>
                            <span className="hero__metric-bar-label">Overall System Uptime: 99.7%</span>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <div className="hero__scroll">
                    <div className="hero__scroll-mouse">
                        <div className="hero__scroll-wheel" />
                    </div>
                </div>
            </section>

            {/* ====== STATS ====== */}
            <section className="stats-bar">
                <div className="container stats-bar__grid">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            className="stats-bar__item"
                            variants={fadeUp}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className="stat-number">
                                <Counter target={s.n} suffix={s.suffix} />
                            </div>
                            <div className="stats-bar__label">{s.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ====== ABOUT SNIPPET ====== */}
            <section className="section home-about">
                <div className="container grid-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="badge">About TAITA-NUM</div>
                        <h2 className="heading-lg" style={{ marginBottom: 20 }}>
                            Rwanda's Pioneering<br />
                            <span className="text-gradient">IoT Solutions Provider</span>
                        </h2>
                        <p style={{ color: 'var(--muted)', marginBottom: 16, lineHeight: 1.75 }}>
                            Established in 2017 and headquartered in Kigali, Rwanda, TAITA-NUM LTD is an
                            innovative company specializing in advanced IoT solutions. We design, develop, and
                            deploy systems that power smarter infrastructure across East Africa.
                        </p>
                        <p style={{ color: 'var(--muted)', marginBottom: 32, lineHeight: 1.75 }}>
                            From upgrading Rwanda's national Electronic Cargo Tracking System in partnership
                            with the RRA, to deploying prepaid smart meters and speed governors — we are
                            at the forefront of Rwanda's digital transformation.
                        </p>
                        <div className="home-about__badges">
                            {partners.map(p => (
                                <span key={p} className="home-about__partner">
                                    <FiCheckCircle className="home-about__check" /> {p}
                                </span>
                            ))}
                        </div>
                        <Link to="/about" className="btn btn-primary" style={{ marginTop: 32 }}>
                            Our Full Story <FiArrowRight />
                        </Link>
                    </motion.div>
                    <motion.div
                        className="home-about__img-wrap"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <img src="/about_team.png" alt="Team at TAITA-NUM LTD" className="home-about__img" />
                        <div className="home-about__img-badge">
                            <FiCheckCircle style={{ color: 'var(--green)', fontSize: 20 }} />
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 14 }}>RRA Partner</div>
                                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Official since 2022</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ====== SERVICES GRID ====== */}
            <section className="section section-light">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <div className="badge badge-cyan">What We Do</div>
                        <h2 className="heading-lg">Our Core <span className="text-gradient">Services</span></h2>
                        <p className="section-sub">
                            End-to-end IoT solutions engineered for East Africa's growing infrastructure needs.
                        </p>
                    </motion.div>

                    <div className="grid-3" style={{ marginTop: 48 }}>
                        {highlights.map((h, i) => (
                            <motion.div
                                key={h.title}
                                className="card service-card"
                                variants={fadeUp}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <div className="service-card__icon">{h.icon}</div>
                                <h3 className="service-card__title">{h.title}</h3>
                                <p className="service-card__desc">{h.desc}</p>
                                <Link to="/services" className="service-card__link">
                                    Learn More <FiArrowRight size={14} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 48 }}>
                        <Link to="/services" className="btn btn-outline-dark btn-lg">
                            View All 11 Services <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ====== RRA PARTNERSHIP BANNER ====== */}
            <section className="rra-banner">
                <div className="rra-banner__bg">
                    <img src="/rra_partnership.png" alt="RRA Partnership" className="rra-banner__img" />
                    <div className="rra-banner__overlay" />
                </div>
                <div className="container rra-banner__content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="badge badge-green">
                            <FiCheckCircle /> Government Partnership
                        </div>
                        <h2 className="heading-lg" style={{ color: '#fff', marginBottom: 20 }}>
                            Official Partner of the<br />Rwanda Revenue Authority
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.78)', maxWidth: 560, lineHeight: 1.75, marginBottom: 32 }}>
                            TAITA-NUM LTD has successfully partnered with the Rwanda Revenue Authority (RRA)
                            to upgrade and develop the national Electronic Cargo Tracking System (ECTS)
                            and supply certified electronic seals.
                        </p>
                        <Link to="/about" className="btn btn-cyan btn-lg">
                            Read More <FiArrowRight />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ====== FLEET SECTION ====== */}
            <section className="section">
                <div className="container grid-2">
                    <motion.div
                        className="home-fleet__img-wrap"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <img src="/fleet_tracking.png" alt="Fleet tracking system" className="home-fleet__img" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="badge">Fleet & Cargo</div>
                        <h2 className="heading-lg" style={{ marginBottom: 20 }}>
                            Advanced <span className="text-gradient">Fleet & Cargo</span><br />Tracking Solutions
                        </h2>
                        <p style={{ color: 'var(--muted)', marginBottom: 24, lineHeight: 1.75 }}>
                            Our state-of-the-art fleet management and ECTS solutions provide real-time visibility
                            of every vehicle and cargo unit, with tamper-resistant electronic seals and automated alerts.
                        </p>
                        <ul className="home-fleet__list">
                            {['Real-time GPS tracking', 'Electronic cargo seals', 'Fuel level monitoring', 'Maintenance scheduling', 'Driver behavior analytics', 'Fleet maintenance tracking'].map(item => (
                                <li key={item}><FiCheckCircle className="home-fleet__check" /> {item}</li>
                            ))}
                        </ul>
                        <Link to="/services" className="btn btn-primary" style={{ marginTop: 32 }}>
                            Explore Fleet Solutions <FiArrowRight />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ====== CTA ====== */}
            <section className="home-cta section-dark section">
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="badge badge-cyan" style={{ margin: '0 auto 16px' }}>Ready to Start?</div>
                        <h2 className="heading-lg" style={{ color: '#fff', marginBottom: 20 }}>
                            Transform Your Operations<br />
                            <span className="text-gradient-light">with Smart IoT Solutions</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.75 }}>
                            Contact our team today to discuss how TAITA-NUM's IoT solutions can modernize
                            your tracking, monitoring, and automation needs.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                            <Link to="/contact" className="btn btn-cyan btn-lg">
                                Contact Us <FiArrowRight />
                            </Link>
                            <a href="https://wa.me/250785382824" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp size={18} /> WhatsApp Chat
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    )
}
