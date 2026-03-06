import { Link } from 'react-router-dom'
import {
    FiPhone, FiMail, FiMapPin, FiLinkedin,
    FiTwitter, FiFacebook, FiYoutube, FiGithub
} from 'react-icons/fi'
import { FaWhatsapp, FaTelegram, FaSkype } from 'react-icons/fa'
import './Footer.css'

const services = [
    'Track & Trace Solutions',
    'Electronic Cargo Tracking',
    'Fleet Management',
    'Fuel Management',
    'Smart Water Meters',
    'Smart Gas Meters',
    'Speed Governors',
    'Media Monitoring',
]

const socialLinks = [
    { href: 'https://linkedin.com/company/taita-num', icon: <FiLinkedin />, label: 'LinkedIn' },
    { href: 'https://twitter.com/taitanum', icon: <FiTwitter />, label: 'Twitter' },
    { href: 'https://facebook.com/taitanum', icon: <FiFacebook />, label: 'Facebook' },
    { href: 'https://youtube.com/@taitanum', icon: <FiYoutube />, label: 'YouTube' },
    { href: 'https://wa.me/250785382824', icon: <FaWhatsapp />, label: 'WhatsApp' },
    { href: 'https://t.me/taitanum', icon: <FaTelegram />, label: 'Telegram' },
    { href: 'https://github.com/taitanum', icon: <FiGithub />, label: 'GitHub' },
    { href: 'skype:taitanum?call', icon: <FaSkype />, label: 'Skype' },
]

export default function Footer() {
    return (
        <footer className="footer">
            {/* Top gradient bar */}
            <div className="footer__glow-bar" />

            <div className="container footer__inner">
                {/* Brand */}
                <div className="footer__brand">
                    <div className="footer__logo">
                        <div className="footer__logo-icon">TN</div>
                        <div>
                            <div className="footer__logo-main">TAITA-NUM LTD</div>
                            <div className="footer__logo-sub">IoT Solutions Provider</div>
                        </div>
                    </div>
                    <p className="footer__desc">
                        Rwanda's leading IoT solutions provider, pioneering advanced tracking,
                        monitoring, and smart automation systems since 2017.
                    </p>
                    {/* Social Icons */}
                    <div className="footer__socials">
                        {socialLinks.map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                className="footer__social-icon"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                title={s.label}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                    {/* Status */}
                    <div className="footer__status">
                        <div className="pulse-dot" />
                        <span>Website under active development</span>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer__col">
                    <h4 className="footer__heading">Quick Links</h4>
                    <ul className="footer__list">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms &amp; Conditions</a></li>
                    </ul>
                </div>

                {/* Services */}
                <div className="footer__col">
                    <h4 className="footer__heading">Our Services</h4>
                    <ul className="footer__list">
                        {services.map(s => <li key={s}><Link to="/services">{s}</Link></li>)}
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="footer__col">
                    <h4 className="footer__heading">Contact Us</h4>
                    <ul className="footer__contact-list">
                        <li>
                            <FiPhone className="footer__contact-icon" />
                            <a href="tel:+250738388880">+250 738 388 880</a>
                        </li>
                        <li>
                            <FaWhatsapp className="footer__contact-icon footer__contact-icon--whatsapp" />
                            <a href="https://wa.me/250785382824" target="_blank" rel="noopener noreferrer">
                                +250 785 382 824
                            </a>
                        </li>
                        <li>
                            <FiMail className="footer__contact-icon" />
                            <a href="mailto:info@taitanum.com">info@taitanum.com</a>
                        </li>
                        <li>
                            <FiMapPin className="footer__contact-icon" />
                            <span>Kigali, Rwanda</span>
                        </li>
                    </ul>
                    <a
                        href="https://calendly.com/taitanum"
                        className="btn btn-cyan footer__calendly"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Book a Meeting
                    </a>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container footer__bottom-inner">
                    <p>© {new Date().getFullYear()} TAITA-NUM LTD. All rights reserved. Registered in Rwanda.</p>
                    <div className="footer__bottom-links">
                        <a href="/privacy-policy">Privacy Policy</a>
                        <a href="/terms">Terms &amp; Conditions</a>
                        <a href="https://rdb.rw" target="_blank" rel="noopener noreferrer">RDB Registration</a>
                        <a href="https://rra.gov.rw" target="_blank" rel="noopener noreferrer">RRA Partnership</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
