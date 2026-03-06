import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    FiPhone, FiMail, FiMapPin, FiSend, FiCheckCircle, FiCalendar
} from 'react-icons/fi'
import { FaWhatsapp, FaTelegram, FaSkype, FaLinkedin } from 'react-icons/fa'
import './Contact.css'
import './About.css'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' } }),
}

const contactChannels = [
    { icon: <FiPhone />, label: 'Phone', value: '+250 738 388 880', href: 'tel:+250738388880', color: 'var(--blue)' },
    { icon: <FaWhatsapp />, label: 'WhatsApp', value: '+250 785 382 824', href: 'https://wa.me/250785382824', color: '#25D366' },
    { icon: <FiMail />, label: 'Email', value: 'info@taitanum.com', href: 'mailto:info@taitanum.com', color: 'var(--cyan)' },
    { icon: <FiMapPin />, label: 'Location', value: 'Kigali, Rwanda', href: 'https://maps.google.com/?q=Kigali,Rwanda', color: 'var(--green)' },
]

const socialChannels = [
    { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com/company/taita-num', color: '#0A66C2' },
    { icon: <FaWhatsapp />, label: 'WhatsApp Business', href: 'https://wa.me/250785382824', color: '#25D366' },
    { icon: <FaTelegram />, label: 'Telegram', href: 'https://t.me/taitanum', color: '#0088cc' },
    { icon: <FaSkype />, label: 'Skype', href: 'skype:taitanum?call', color: '#00AFF0' },
    { icon: <FiCalendar />, label: 'Book a Meeting', href: 'https://calendly.com/taitanum', color: 'var(--blue)' },
]

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setSubmitted(true)
        }, 1500)
    }

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
                        <motion.div variants={fadeUp} custom={0} className="badge badge-cyan">Reach Out</motion.div>
                        <motion.h1 variants={fadeUp} custom={1} className="heading-xl" style={{ color: '#fff' }}>
                            Contact <span className="text-gradient-light">TAITA-NUM LTD</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} custom={2} className="page-hero__sub">
                            Get in touch with our team to discuss IoT solutions, partnerships, or any inquiries.
                            We're always ready to listen and help.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ===== CONTACT CHANNELS ===== */}
            <section className="section section-light">
                <div className="container">
                    <div className="contact-channels">
                        {contactChannels.map((ch, i) => (
                            <motion.a
                                key={ch.label}
                                href={ch.href}
                                className="contact-channel-card card"
                                target={ch.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                variants={fadeUp}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <div className="contact-channel-icon" style={{ color: ch.color }}>
                                    {ch.icon}
                                </div>
                                <div className="contact-channel-label">{ch.label}</div>
                                <div className="contact-channel-value">{ch.value}</div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FORM + SIDEBAR ===== */}
            <section className="section">
                <div className="container contact-main">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="badge">Send a Message</div>
                        <h2 className="heading-lg" style={{ marginBottom: 8 }}>
                            We'd Love to <span className="text-gradient">Hear From You</span>
                        </h2>
                        <p style={{ color: 'var(--muted)', marginBottom: 36, lineHeight: 1.7 }}>
                            Fill in the form below and we'll respond within 24 hours on business days.
                        </p>

                        {submitted ? (
                            <motion.div
                                className="contact-success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <FiCheckCircle className="contact-success-icon" />
                                <h3>Message Sent Successfully!</h3>
                                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                                <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}>
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="contact-form-row">
                                    <div className="contact-form-group">
                                        <label className="contact-label">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            className="contact-input"
                                            placeholder="Your full name"
                                            required
                                        />
                                    </div>
                                    <div className="contact-form-group">
                                        <label className="contact-label">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="contact-input"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="contact-form-row">
                                    <div className="contact-form-group">
                                        <label className="contact-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            className="contact-input"
                                            placeholder="+250 7XX XXX XXX"
                                        />
                                    </div>
                                    <div className="contact-form-group">
                                        <label className="contact-label">Subject *</label>
                                        <select
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            className="contact-input"
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option>Fleet Management</option>
                                            <option>Cargo Tracking / ECTS</option>
                                            <option>Smart Meters</option>
                                            <option>Driver Monitoring</option>
                                            <option>Partnership Inquiry</option>
                                            <option>General Information</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="contact-form-group">
                                    <label className="contact-label">Your Message *</label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        className="contact-input contact-textarea"
                                        placeholder="Tell us about your requirements or project..."
                                        rows={6}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg contact-submit" disabled={loading}>
                                    {loading ? (
                                        <span className="contact-spinner" />
                                    ) : (
                                        <><FiSend /> Send Message</>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        className="contact-sidebar"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        {/* About Card */}
                        <div className="card contact-info-card">
                            <h3 className="contact-info-title">TAITA-NUM LTD</h3>
                            <p className="contact-info-sub">IoT Solutions Provider · Est. 2017</p>
                            <div className="contact-info-row">
                                <FiMapPin className="contact-info-icon" />
                                <span>Kigali, Rwanda</span>
                            </div>
                            <div className="contact-info-row">
                                <FiPhone className="contact-info-icon" />
                                <a href="tel:+250738388880">+250 738 388 880</a>
                            </div>
                            <div className="contact-info-row">
                                <FaWhatsapp className="contact-info-icon contact-info-icon--wa" />
                                <a href="https://wa.me/250785382824" target="_blank" rel="noopener noreferrer">
                                    +250 785 382 824
                                </a>
                            </div>
                            <div className="contact-info-row">
                                <FiMail className="contact-info-icon" />
                                <a href="mailto:info@taitanum.com">info@taitanum.com</a>
                            </div>
                            <div className="contact-info-hours">
                                <strong>Business Hours</strong>
                                <span>Mon – Fri: 8:00 AM – 5:00 PM (CAT)</span>
                            </div>
                        </div>

                        {/* Connect Online */}
                        <div className="card contact-social-card">
                            <h4 className="contact-social-title">Connect Online</h4>
                            <div className="contact-social-list">
                                {socialChannels.map(s => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        className="contact-social-item"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ '--hover-color': s.color }}
                                    >
                                        <span className="contact-social-icon" style={{ color: s.color }}>{s.icon}</span>
                                        <span>{s.label}</span>
                                        <FiCheckCircle style={{ marginLeft: 'auto', color: 'transparent', fontSize: 14 }} className="contact-social-check" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Map embed */}
                        <div className="contact-map-wrap card">
                            <iframe
                                title="TAITA-NUM LTD Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19261544754!2d30.01745!3d-1.9440727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0xf32b36a5411d0bc8!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                                width="100%"
                                height="200"
                                style={{ border: 0, display: 'block', borderRadius: 12 }}
                                allowFullScreen=""
                                loading="lazy"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    )
}
