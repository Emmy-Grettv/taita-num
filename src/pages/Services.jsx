import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    FiTruck, FiPackage, FiShield, FiMapPin, FiDroplet,
    FiEye, FiZap, FiVideo, FiDollarSign, FiWind, FiArrowRight
} from 'react-icons/fi'
import './Services.css'
import './About.css'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' } }),
}

const services = [
    {
        id: 1,
        icon: <FiTruck />,
        title: 'Track & Trace Solutions',
        category: 'Tracking',
        short: 'End-to-end visibility for goods and assets in transit.',
        long: 'Our comprehensive Track & Trace solutions provide real-time visibility across the entire supply chain. From dispatch to delivery, every movement is logged, verified, and accessible via our cloud dashboard. Ideal for logistics companies, manufacturers, and government bodies managing cargo flows.',
        features: ['Real-time GPS location', 'Automated alerts & notifications', 'Historical route playback', 'Multi-vehicle dashboard', 'API integrations'],
        img: '/fleet_tracking.png',
    },
    {
        id: 2,
        icon: <FiPackage />,
        title: 'Electronic Cargo Tracking (ECTS)',
        category: 'Tracking',
        short: 'Advanced national cargo tracking system certified by RRA.',
        long: 'TAITA-NUM designed and upgraded Rwanda\'s Electronic Cargo Tracking System in partnership with the Rwanda Revenue Authority. Our ECTS solution provides end-to-end monitoring of all cargo entering, transiting, or leaving Rwanda, preventing revenue leakage and improving border control efficiency.',
        features: ['ECTS national deployment', 'Border control integration', 'Real-time cargo status', 'Cross-agency data sharing', 'Compliance reporting'],
        img: '/fleet_tracking.png',
    },
    {
        id: 3,
        icon: <FiShield />,
        title: 'Electronic Cargo Seal Dev & Upgrade',
        category: 'Security',
        short: 'Tamper-resistant smart seals for cargo containers.',
        long: 'Our electronic seals are among East Africa\'s most advanced, featuring tamper detection, GPS-enabled location tracking, and real-time status reporting. Supplied to the Rwanda Revenue Authority, these seals are field-proven and can be customized to specific client or regulatory requirements.',
        features: ['Tamper detection', 'GPS-enabled tracking', 'Custom firmware upgrades', 'RRA-certified design', 'Battery-backed resilience'],
        img: '/fleet_tracking.png',
    },
    {
        id: 4,
        icon: <FiMapPin />,
        title: 'Fleet Management & Maintenance Tracking',
        category: 'Fleet',
        short: 'Complete visibility and control over your vehicle fleet.',
        long: 'From small business fleets to enterprise-scale operations, our fleet management system covers GPS tracking, driver behavior analytics, maintenance scheduling, and fuel efficiency monitoring. Reduce downtime, cut costs, and improve safety across your entire fleet.',
        features: ['Live GPS fleet map', 'Driver scoring & reports', 'Maintenance schedule alerts', 'Geofencing & zones', 'Mobile driver app'],
        img: '/fleet_tracking.png',
    },
    {
        id: 5,
        icon: <FiZap />,
        title: 'Fuel Management & Calibration',
        category: 'Fleet',
        short: 'Accurate fuel monitoring and calibration for vehicles and generators.',
        long: 'Fuel theft is a major cost for fleet operators. Our Fuel Management System combines IoT sensors, calibration technology, and cloud analytics to give you accurate fuel consumption data in real time. Detect anomalies, prevent siphoning, and optimize fuel use across your fleet.',
        features: ['Real-time fuel level sensors', 'Theft & siphon detection', 'Fuel calibration services', 'Consumption analytics', 'Generator fuel monitoring'],
        img: '/fleet_tracking.png',
    },
    {
        id: 6,
        icon: <FiVideo />,
        title: 'Media Monitoring Tools',
        category: 'Monitoring',
        short: 'Comprehensive media tracking for brands and organizations.',
        long: 'Our media monitoring tools enable organizations to track broadcasts, mentions, and content across multiple media channels. Designed for regulatory bodies, government agencies, and corporate communications teams who need accurate and timely media intelligence.',
        features: ['Broadcast monitoring', 'Content timestamping', 'Automated recording', 'Compliance reports', 'Multi-channel support'],
        img: '/about_team.png',
    },
    {
        id: 7,
        icon: <FiDollarSign />,
        title: 'Online Gambling Monitoring for Taxation',
        category: 'Monitoring',
        short: 'Tax compliance tools for online gambling platforms.',
        long: 'Our online gambling monitoring platform enables tax authorities and regulatory bodies to accurately track gaming platform revenues, ensuring accurate taxation and regulatory compliance. Integrates directly with gambling platforms to capture and verify financial transactions.',
        features: ['Revenue tracking', 'Real-time transaction capture', 'Automated tax calculation', 'Audit-ready reports', 'Platform-agnostic integration'],
        img: '/about_team.png',
    },
    {
        id: 8,
        icon: <FiDroplet />,
        title: 'Prepaid Smart Water Meters',
        category: 'Smart Meters',
        short: 'IoT water meters with remote monitoring and prepaid billing.',
        long: 'Our smart water meters eliminate manual meter reading with automated remote monitoring. Residents prepay for water credits via mobile money, reducing non-payment risks. Utilities access real-time consumption data, leak detection, and usage analytics through our cloud platform.',
        features: ['Remote meter reading', 'Prepaid mobile money top-up', 'Leak detection alerts', 'Consumption analytics', 'Cloud monitoring platform'],
        img: '/smart_meters.png',
    },
    {
        id: 9,
        icon: <FiWind />,
        title: 'Prepaid Smart Gas Meters',
        category: 'Smart Meters',
        short: 'IoT gas meters with remote monitoring and prepaid billing.',
        long: 'Bringing the same great smart meter technology to LPG and piped gas distribution. Our prepaid smart gas meters provide safe, monitored gas supply with automatic shutoff features, prepaid credit systems, and real-time safety monitoring for both residential and commercial users.',
        features: ['Prepaid gas credit system', 'Automatic safety shutoff', 'Leak sensor integration', 'Remote monitoring', 'Mobile top-up (Mobile Money)'],
        img: '/smart_meters.png',
    },
    {
        id: 10,
        icon: <FiEye />,
        title: 'Speed Governors',
        category: 'Driver Safety',
        short: 'Vehicle speed limiting and monitoring systems.',
        long: 'Our speed governors are professionally installed, tamper-resistant devices that limit and monitor vehicle speed, ensuring driver compliance with road safety regulations. Compatible with all major vehicle types and integrated with our fleet management dashboard for full oversight.',
        features: ['Speed limitation enforcement', 'Tamper-proof installation', 'GPS-verified speed data', 'Fleet dashboard integration', 'Regulatory compliance support'],
        img: '/speed_governor.png',
    },
    {
        id: 11,
        icon: <FiShield />,
        title: 'Smart Driver Behavior Monitoring',
        category: 'Driver Safety',
        short: 'AI-powered in-cabin monitoring for safety and compliance.',
        long: 'Our intelligent in-cabin monitoring systems use computer vision and AI to detect driver drowsiness, prevent vehicle ignition after alcohol or drug consumption, and monitor unsafe behavior in real time. Securely installed and tamper-resistant, designed for commercial fleets and government vehicles.',
        features: ['Drowsiness detection (AI)', 'Alcohol detection ignition lock', 'Drug consumption prevention', 'In-cabin camera monitoring', 'Tamper-resistant installation'],
        img: '/speed_governor.png',
    },
]

const categories = ['All', 'Tracking', 'Security', 'Fleet', 'Monitoring', 'Smart Meters', 'Driver Safety']

export default function Services() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [activeService, setActiveService] = useState(null)

    const filtered = activeCategory === 'All' ? services : services.filter(s => s.category === activeCategory)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* ===== PAGE HERO ===== */}
            <section className="page-hero">
                <div className="page-hero__overlay" />
                <div className="container page-hero__content">
                    <motion.div initial="hidden" animate="visible">
                        <motion.div variants={fadeUp} custom={0} className="badge badge-cyan">Our Expertise</motion.div>
                        <motion.h1 variants={fadeUp} custom={1} className="heading-xl" style={{ color: '#fff' }}>
                            Our <span className="text-gradient-light">IoT Services</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} custom={2} className="page-hero__sub">
                            11 comprehensive IoT solutions engineered for tracking, monitoring, and smart automation
                            across Rwanda and East Africa.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ===== FILTER TABS ===== */}
            <section className="services-filter-bar">
                <div className="container services-filter-inner">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`services-filter-btn ${activeCategory === cat ? 'services-filter-btn--active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* ===== SERVICES GRID ===== */}
            <section className="section">
                <div className="container">
                    <motion.div
                        className="services-grid"
                        layout
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((s, i) => (
                                <motion.div
                                    key={s.id}
                                    className="card srv-card"
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: i * 0.04 }}
                                    onClick={() => setActiveService(s)}
                                >
                                    <div className="srv-card__img-wrap">
                                        <img src={s.img} alt={s.title} className="srv-card__img" />
                                        <div className="srv-card__category">{s.category}</div>
                                    </div>
                                    <div className="srv-card__body">
                                        <div className="srv-card__icon">{s.icon}</div>
                                        <h3 className="srv-card__title">{s.title}</h3>
                                        <p className="srv-card__short">{s.short}</p>
                                        <button className="srv-card__cta" onClick={() => setActiveService(s)}>
                                            Learn More <FiArrowRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ===== SERVICE DETAIL MODAL ===== */}
            <AnimatePresence>
                {activeService && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveService(null)}
                    >
                        <motion.div
                            className="modal"
                            initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 60 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={() => setActiveService(null)}>×</button>
                            <img src={activeService.img} alt={activeService.title} className="modal-img" />
                            <div className="modal-body">
                                <div className="badge">{activeService.category}</div>
                                <div className="modal-icon">{activeService.icon}</div>
                                <h2 className="heading-md" style={{ marginBottom: 16 }}>{activeService.title}</h2>
                                <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 24 }}>{activeService.long}</p>
                                <h4 style={{ fontFamily: 'Outfit', fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Key Features</h4>
                                <ul className="modal-features">
                                    {activeService.features.map(f => (
                                        <li key={f}><span className="modal-check">✓</span> {f}</li>
                                    ))}
                                </ul>
                                <Link to="/contact" className="btn btn-primary" style={{ marginTop: 28 }} onClick={() => setActiveService(null)}>
                                    Get a Quote <FiArrowRight />
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===== CTA ===== */}
            <section className="section section-dark">
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="badge badge-cyan" style={{ margin: '0 auto 16px' }}>Let's Collaborate</div>
                        <h2 className="heading-lg" style={{ color: '#fff', marginBottom: 16 }}>
                            Need a Custom <span className="text-gradient-light">IoT Solution?</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.75 }}>
                            Our team can design and deploy tailored solutions for any tracking, monitoring, or automation challenge.
                        </p>
                        <Link to="/contact" className="btn btn-cyan btn-lg">
                            Discuss Your Project <FiArrowRight />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    )
}
