import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiUsers, FiCalendar, FiAward, FiArrowRight, FiLinkedin } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './About.css'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' } }),
}

const values = [
    { icon: <FiAward />, title: 'Innovation', desc: 'Pioneering IoT solutions that address real-world challenges in Rwanda and beyond.' },
    { icon: <FiUsers />, title: 'Partnership', desc: 'Building lasting relationships with government bodies and private sector clients.' },
    { icon: <FiCheckCircle />, title: 'Reliability', desc: 'Delivering tamper-resistant, certified, and continuously monitored systems.' },
    { icon: <FiCalendar />, title: 'Experience', desc: 'Over 7 years of deep industry experience in IoT, tracking, and automation.' },
]

const timeline = [
    { year: '2017', title: 'Company Founded', desc: 'TAITA-NUM LTD registered in Rwanda, beginning its journey in IoT innovation.' },
    { year: '2019', title: 'First Fleet Deployments', desc: 'Successful deployment of fleet management and fuel monitoring systems for early clients.' },
    { year: '2021', title: 'Smart Meters Launch', desc: 'Launched prepaid smart water and gas meter solutions with cloud dashboards.' },
    { year: '2022', title: 'RRA Partnership', desc: 'Partnered with Rwanda Revenue Authority to upgrade ECTS and supply electronic seals.' },
    { year: '2024', title: 'Expanded Services', desc: 'Introduced AI-powered driver behavior monitoring and advanced online gambling tax tools.' },
    { year: '2025+', title: 'Growing Forward', desc: 'Scaling across East Africa with new IoT product lines and international partnerships.' },
]

/* ---- Leadership Card with photo + fallback ---- */
function LeadershipCard({ person, index }) {
    const [imgError, setImgError] = useState(false)

    return (
        <motion.div
            className="card leadership-card"
            variants={fadeUp}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {/* Photo or Initials */}
            <div className="leadership-photo-wrap">
                {!imgError ? (
                    <img
                        src={person.photo}
                        alt={person.name}
                        className="leadership-photo"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="leadership-avatar">
                        <span>{person.initials}</span>
                    </div>
                )}
            </div>

            <div className="leadership-info">
                <h3 className="leadership-name">{person.name}</h3>
                <p className="leadership-role">{person.role}</p>
                <p className="leadership-desc">{person.desc}</p>
                {person.linkedin && (
                    <a
                        href={person.linkedin}
                        className="leadership-linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiLinkedin size={14} /> LinkedIn Profile
                    </a>
                )}
            </div>
        </motion.div>
    )
}

export default function About() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* ===== PAGE HERO ===== */}
            <section className="page-hero about-hero">
                <div className="page-hero__overlay" />
                <div className="container page-hero__content">
                    <motion.div initial="hidden" animate="visible">
                        <motion.div variants={fadeUp} custom={0} className="badge badge-cyan">Our Story</motion.div>
                        <motion.h1 variants={fadeUp} custom={1} className="heading-xl" style={{ color: '#fff' }}>
                            About <span className="text-gradient-light">TAITA-NUM LTD</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} custom={2} className="page-hero__sub">
                            Rwanda-registered since 2017, we are a pioneering IoT company transforming how
                            businesses track, monitor, and automate their critical infrastructure.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ===== MISSION ===== */}
            <section className="section">
                <div className="container grid-2">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="badge">Who We Are</div>
                        <h2 className="heading-lg" style={{ marginBottom: 20 }}>
                            An Innovative <span className="text-gradient">IoT Solutions</span> Provider
                        </h2>
                        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 18 }}>
                            TAITA-NUM LTD is a Rwanda-registered company established in <strong>2017</strong>. We specialize
                            in advanced IoT solutions including tracking, monitoring, and smart automation systems
                            that power modern infrastructure across Rwanda and East Africa.
                        </p>
                        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 32 }}>
                            Our technology integrates seamlessly with existing infrastructure, providing real-time
                            data insights and actionable intelligence for governments, enterprises, and utilities.
                        </p>
                        <div className="about-highlights">
                            {['Rwanda-registered company', 'Est. 2017', '11+ core IoT services', 'RRA official partner', 'Kigali HQ'].map(item => (
                                <div key={item} className="about-highlight-tag">
                                    <FiCheckCircle className="about-highlight-icon" /> {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="about-img-stack"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <img src="/about_team.png" alt="TAITA-NUM team" className="about-img-main" />
                        <div className="about-img-badge">
                            <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 28, color: 'var(--blue)' }}>7+</div>
                            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Years of Innovation</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== LEADERSHIP ===== */}
            <section className="section section-light">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <div className="badge">Our Leadership</div>
                        <h2 className="heading-lg">Meet the <span className="text-gradient">Team</span></h2>
                    </motion.div>

                    <div className="leadership-grid">
                        {[
                            {
                                name: 'Mr. Gavin Peter',
                                role: 'Chief Executive Officer (CEO)',
                                desc: 'Visionary leader driving TAITA-NUM\'s strategy and expansion across East Africa with deep expertise in IoT and technology integration.',
                                // ➜ Used the newly uploaded profile photo
                                photo: '/profile.jpg',
                                initials: 'GP',
                                linkedin: 'https://linkedin.com/in/gavin-peter',
                            },
                            {
                                name: 'Mrs. Bajeneza Gereldine',
                                role: 'Managing Director',
                                desc: 'Operations expert overseeing TAITA-NUM\'s day-to-day management, government partnerships, and client relationships.',
                                // ➜ Used the newly uploaded profile photo
                                photo: '/profile1.jpg',
                                initials: 'BG',
                                linkedin: 'https://linkedin.com/in/bajeneza-gereldine',
                            },
                        ].map((person, i) => (
                            <LeadershipCard key={person.name} person={person} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CORE VALUES ===== */}
            <section className="section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <div className="badge">What Drives Us</div>
                        <h2 className="heading-lg">Our Core <span className="text-gradient">Values</span></h2>
                    </motion.div>
                    <div className="grid-3" style={{ marginTop: 48 }}>
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                className="card value-card"
                                variants={fadeUp}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <div className="value-icon">{v.icon}</div>
                                <h3 className="value-title">{v.title}</h3>
                                <p className="value-desc">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TIMELINE ===== */}
            <section className="section section-dark">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <div className="badge badge-cyan">Our Journey</div>
                        <h2 className="heading-lg" style={{ color: '#fff' }}>
                            A Timeline of <span className="text-gradient-light">Growth</span>
                        </h2>
                    </motion.div>

                    <div className="timeline" style={{ marginTop: 60 }}>
                        {timeline.map((item, i) => (
                            <motion.div
                                key={item.year}
                                className="timeline-item"
                                variants={fadeUp}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <div className="timeline-year">{item.year}</div>
                                <div className="timeline-dot" />
                                <div className="timeline-body">
                                    <h4 className="timeline-title">{item.title}</h4>
                                    <p className="timeline-desc">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== RRA PARTNERSHIP DETAIL ===== */}
            <section className="section">
                <div className="container grid-2">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="badge badge-green"><FiCheckCircle /> Government Partnership</div>
                        <h2 className="heading-lg" style={{ marginBottom: 20 }}>
                            Our <span className="text-gradient">RRA</span> Partnership
                        </h2>
                        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 18 }}>
                            TAITA-NUM LTD has successfully partnered with the <strong>Rwanda Revenue Authority (RRA)</strong> to
                            upgrade and develop the national Electronic Cargo Tracking System (ECTS).
                        </p>
                        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 32 }}>
                            This partnership demonstrates our ability to deliver mission-critical government infrastructure,
                            including supplying certified electronic seals that are tamper-resistant and fully monitored in real time.
                        </p>
                        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
                            {['ECTS Development', 'Electronic Seals Supply', 'System Upgrades', 'Ongoing Support'].map(tag => (
                                <div key={tag} className="rra-tag">
                                    <FiCheckCircle style={{ color: 'var(--green)' }} /> {tag}
                                </div>
                            ))}
                        </div>
                        <a href="https://rra.gov.rw" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            Visit RRA Website <FiArrowRight />
                        </a>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <img src="/rra_partnership.png" alt="RRA Partnership" className="about-rra-img" />
                    </motion.div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="section" style={{ background: 'var(--light)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-lg" style={{ marginBottom: 20 }}>
                            Ready to Partner <span className="text-gradient">with Us?</span>
                        </h2>
                        <p style={{ color: 'var(--muted)', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.75 }}>
                            Contact our team to learn how we can deploy the right IoT solution for your organization.
                        </p>
                        <Link to="/contact" className="btn btn-primary btn-lg">
                            Get in Touch <FiArrowRight />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    )
}
