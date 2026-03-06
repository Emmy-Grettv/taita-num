import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiPhone } from 'react-icons/fi'
import './Navbar.css'

const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        setMenuOpen(false)
    }, [location])

    return (
        <motion.header
            className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="navbar__inner container">
                {/* Logo */}
                <Link to="/" className="navbar__logo">
                    <div className="navbar__logo-icon">
                        <span>TN</span>
                    </div>
                    <div className="navbar__logo-text">
                        <span className="navbar__logo-main">TAITA-NUM</span>
                        <span className="navbar__logo-sub">IoT Solutions</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <nav className="navbar__links">
                    {links.map(l => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) =>
                                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                            }
                            end={l.to === '/'}
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </nav>

                {/* CTA */}
                <div className="navbar__cta">
                    <a href="tel:+250738388880" className="navbar__phone">
                        <FiPhone size={15} />
                        <span>+250 738 388 880</span>
                    </a>
                    <Link to="/contact" className="btn btn-primary">
                        Get in Touch
                    </Link>
                </div>

                {/* Mobile burger */}
                <button
                    className="navbar__burger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="navbar__mobile"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {links.map((l, i) => (
                            <motion.div
                                key={l.to}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.07 }}
                            >
                                <NavLink
                                    to={l.to}
                                    className={({ isActive }) =>
                                        `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                                    }
                                    end={l.to === '/'}
                                >
                                    {l.label}
                                </NavLink>
                            </motion.div>
                        ))}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            <a href="tel:+250738388880" className="navbar__mobile-phone">
                                <FiPhone size={15} /> +250 738 388 880
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
