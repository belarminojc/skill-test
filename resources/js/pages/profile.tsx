import { Head } from '@inertiajs/react';
import { useState } from 'react';

type FloatingHeart = {
    id: number;
    left: number;
    delay: number;
    duration: number;
    size: number;
};

export default function Profile() {
    const [hearts] = useState<FloatingHeart[]>(() =>
        Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 4 + Math.random() * 5,
            size: 10 + Math.random() * 22,
        })),
    );

    return (
        <>
            <Head title="Christian Love Linzel">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=playfair-display:400,700,900i&family=cormorant-garamond:300,400,600i"
                    rel="stylesheet"
                />
                <style>{`
                    @keyframes floatUp {
                        0%   { transform: translateY(0) rotate(-8deg); opacity: 0; }
                        10%  { opacity: 0.75; }
                        90%  { opacity: 0.5; }
                        100% { transform: translateY(-110vh) rotate(8deg); opacity: 0; }
                    }
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50%       { transform: scale(1.12); }
                    }
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(36px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes shimmer {
                        0%   { background-position: -200% center; }
                        100% { background-position:  200% center; }
                    }
                    @keyframes sparkle {
                        0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
                        50%       { opacity: 1; transform: scale(1) rotate(180deg); }
                    }
                    @keyframes sway {
                        0%, 100% { transform: rotate(-3deg); }
                        50%       { transform: rotate(3deg); }
                    }

                    .heart-float {
                        position: fixed;
                        bottom: -50px;
                        animation: floatUp linear infinite;
                        pointer-events: none;
                        z-index: 0;
                        color: #f9a8c9;
                    }
                    .big-heart {
                        animation: pulse 2s ease-in-out infinite;
                        display: inline-block;
                        filter: drop-shadow(0 0 32px rgba(219, 39, 119, 0.55));
                    }
                    .shimmer-text {
                        font-family: 'Playfair Display', serif;
                        font-weight: 900;
                        font-style: italic;
                        background: linear-gradient(135deg, #be185d, #ec4899, #f9a8d4, #be185d);
                        background-size: 200% auto;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        animation: shimmer 3s linear infinite;
                    }
                    .sparkle {
                        position: absolute;
                        animation: sparkle 2.2s ease-in-out infinite;
                    }
                    .sway {
                        display: inline-block;
                        animation: sway 3s ease-in-out infinite;
                    }
                `}</style>
            </Head>

            <div
                style={{
                    minHeight: '100vh',
                    background: 'radial-gradient(ellipse at 25% 25%, #fce7f3 0%, #fdf2f8 45%, #fff1f5 75%, #ffffff 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    padding: '2rem',
                }}
            >
                {/* Floating hearts */}
                {hearts.map((h) => (
                    <div
                        key={h.id}
                        className="heart-float"
                        style={{
                            left: `${h.left}%`,
                            animationDelay: `${h.delay}s`,
                            animationDuration: `${h.duration}s`,
                            fontSize: `${h.size}px`,
                        }}
                    >
                        ♥
                    </div>
                ))}

                {/* Corner flourishes */}
                {[
                    { top: 20, left: 20, transform: 'none' },
                    { top: 20, right: 20, transform: 'scaleX(-1)' },
                    { bottom: 20, left: 20, transform: 'rotate(180deg) scaleX(-1)' },
                    { bottom: 20, right: 20, transform: 'rotate(180deg)' },
                ].map((s, i) => (
                    <div key={i} style={{ position: 'fixed', fontSize: 26, color: '#f9a8d4', opacity: 0.45, zIndex: 1, ...s }}>❧</div>
                ))}

                {/* Main card */}
                <div
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        background: 'rgba(255,255,255,0.88)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(236,72,153,0.18)',
                        borderRadius: '2.5rem',
                        padding: '4rem 3rem',
                        maxWidth: 520,
                        width: '100%',
                        textAlign: 'center',
                        boxShadow: '0 24px 80px rgba(236,72,153,0.2), 0 2px 20px rgba(236,72,153,0.08)',
                        animation: 'fadeInUp 1s ease both',
                    }}
                >
                    {/* Sparkles */}
                    <span className="sparkle" style={{ top: 22, left: 28, fontSize: 16, color: '#ec4899', animationDelay: '0s' }}>✦</span>
                    <span className="sparkle" style={{ top: 28, right: 36, fontSize: 11, color: '#db2777', animationDelay: '0.7s' }}>✦</span>
                    <span className="sparkle" style={{ bottom: 36, left: 44, fontSize: 13, color: '#f9a8d4', animationDelay: '1.4s' }}>✦</span>
                    <span className="sparkle" style={{ bottom: 55, right: 28, fontSize: 19, color: '#be185d', animationDelay: '0.4s' }}>✦</span>
                    <span className="sparkle" style={{ top: '45%', left: 18, fontSize: 10, color: '#ec4899', animationDelay: '1s' }}>✦</span>
                    <span className="sparkle" style={{ top: '45%', right: 18, fontSize: 10, color: '#ec4899', animationDelay: '1.8s' }}>✦</span>

                    {/* Big heart */}
                    <div className="big-heart" style={{ fontSize: 88, color: '#db2777', marginBottom: '1.2rem' }}>
                        ♥
                    </div>

                    {/* KIAN */}
                    <div
                        className="shimmer-text"
                        style={{ fontSize: 'clamp(3rem, 12vw, 5.5rem)', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: '0.2rem' }}
                    >
                        CHRISTIAN
                    </div>

                    {/* LOVES */}
                    <div
                        style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontStyle: 'italic',
                            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                            color: '#9d174d',
                            letterSpacing: '0.3em',
                            margin: '0.4rem 0',
                            fontWeight: 300,
                        }}
                    >
                        ── loves ──
                    </div>

                    {/* JESSEL */}
                    <div
                        className="shimmer-text"
                        style={{ fontSize: 'clamp(3rem, 12vw, 5.5rem)', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: '1.8rem' }}
                    >
                        LINZEL
                    </div>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.6rem' }}>
                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #f9a8d4)' }} />
                        <span style={{ color: '#ec4899', fontSize: 20 }}>♥</span>
                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #f9a8d4)' }} />
                    </div>

                    {/* Message */}
                    <p
                        style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontSize: '1.2rem',
                            color: '#831843',
                            lineHeight: 1.9,
                            fontWeight: 300,
                            fontStyle: 'italic',
                            animation: 'fadeInUp 1s ease 0.6s both',
                        }}
                    >
                        Some love stories are written in the stars —<br />
                        yours is written in every heartbeat. 🌹
                    </p>

                    {/* Footer hearts */}
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: 14 }}>
                        {[
                            { size: 18, delay: '0s', color: '#f9a8d4' },
                            { size: 30, delay: '0.2s', color: '#ec4899' },
                            { size: 18, delay: '0.4s', color: '#f9a8d4' },
                        ].map((h, i) => (
                            <span
                                key={i}
                                style={{
                                    fontSize: h.size,
                                    color: h.color,
                                    display: 'inline-block',
                                    animation: `pulse 1.8s ease-in-out infinite`,
                                    animationDelay: h.delay,
                                }}
                            >
                                ♥
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
