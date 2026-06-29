import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/context/AuthContext';
import { otpService } from '@/app/utils/otpService';
import { validation } from '@/app/utils/validation';
import './Auth.css';
import AuthBg from '@/imports/auth_bg.jpg';
import TopsunLogoImg from '@/imports/TOPSUN png 1.png';

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signin, signup, verifyOTP, currentOTPRequest } = useAuth();
  
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  
  // Login State
  const [lStep, setLStep] = useState<1 | 2>(1);
  const [lPhone, setLPhone] = useState('');
  const [lOtp, setLOtp] = useState(['', '', '', '', '', '']);
  const [lTimer, setLTimer] = useState(30);
  
  // Signup State
  const [sStep, setSStep] = useState<1 | 2>(1);
  const [sName, setSName] = useState('');
  const [sPhone, setSPhone] = useState('');
  const [sOtp, setSOtp] = useState(['', '', '', '', '', '']);
  const [sTimer, setSTimer] = useState(30);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Generate particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer && particlesContainer.childElementCount === 0) {
      for(let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.setProperty('--dx', (Math.random() * 100 - 50) + 'px');
        p.style.animationDuration = (Math.random() * 8 + 6) + 's';
        p.style.animationDelay = (Math.random() * 5) + 's';
        particlesContainer.appendChild(p);
      }
    }
  }, []);

  useEffect(() => {
    let interval: any;
    if (lStep === 2 && lTimer > 0) interval = setInterval(() => setLTimer(t => t - 1), 1000);
    else if (sStep === 2 && sTimer > 0) interval = setInterval(() => setSTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [lStep, lTimer, sStep, sTimer]);

  const handleTabSwitch = (newTab: 'login' | 'signup') => {
    setTab(newTab);
    navigate(newTab === 'login' ? '/signin' : '/signup', { replace: true });
  };

  const loginSend = async () => {
    if (lPhone.length !== 10) return alert('Enter a valid 10-digit number');
    try {
      await signin(lPhone);
      setLStep(2);
      setLTimer(30);
    } catch (e: any) {
      alert(e.message || 'Error sending OTP');
    }
  };

  const signupSend = async () => {
    if (!sName.trim()) return alert('Enter your name');
    if (sPhone.length !== 10) return alert('Enter a valid 10-digit number');
    try {
      await signup(sPhone, sName);
      setSStep(2);
      setSTimer(30);
    } catch (e: any) {
      alert(e.message || 'Error sending OTP');
    }
  };

  const verifyLogin = async () => {
    const code = lOtp.join('');
    if (code.length !== 6) return alert('Enter 6-digit OTP');
    try {
      await verifyOTP(code);
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (e: any) {
      alert('Invalid OTP');
    }
  };

  const verifySignup = async () => {
    const code = sOtp.join('');
    if (code.length !== 6) return alert('Enter 6-digit OTP');
    try {
      await verifyOTP(code);
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (e: any) {
      alert('Invalid OTP');
    }
  };

  const handleOtpInput = (val: string, idx: number, type: 'l' | 's') => {
    const arr = type === 'l' ? [...lOtp] : [...sOtp];
    arr[idx] = val;
    if (type === 'l') setLOtp(arr); else setSOtp(arr);
    
    if (val && idx < 5) {
      const next = document.getElementById(`${type}Otp-${idx + 1}`);
      next?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number, type: 'l' | 's') => {
    if (e.key === 'Backspace' && !(type === 'l' ? lOtp[idx] : sOtp[idx]) && idx > 0) {
      const prev = document.getElementById(`${type}Otp-${idx - 1}`);
      prev?.focus();
    }
  };

  return (
    <div className="page" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Background Image injected via inline style to replicate var b64 */}
      <div className="bg" id="bgEl" style={{ backgroundImage: `url(${AuthBg})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(3px) brightness(0.7)' }}></div>
      <div className="bg-overlay"></div>
      <div className="top-bar"></div>

      <div className="particles" id="particles"></div>

      <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={TopsunLogoImg} alt="TOPSUN" style={{ height: '44px', width: 'auto', objectFit: 'contain' }} />
      </div>

      <div className="left-content">
        <div className="tagline">
          <div className="tagline-line"><h2>Step Into</h2></div>
          <div className="tagline-line"><h2>Your Game.</h2></div>
          <p>Premium sport footwear engineered<br />for champions. Every stride counts.</p>
        </div>
      </div>

      <div className="panel" id="mainPanel">
        <div className="panel-inner">
          <div className="tabs" role="tablist">
            <div className="tab-slider" id="tabSlider" style={{ transform: tab === 'login' ? 'translateX(0)' : 'translateX(100%)' }}></div>
            <button className={`tab-btn ${tab === 'login' ? 'active' : ''}`} onClick={() => handleTabSwitch('login')} role="tab">Sign In</button>
            <button className={`tab-btn ${tab === 'signup' ? 'active' : ''}`} onClick={() => handleTabSwitch('signup')} role="tab">Register</button>
          </div>

          {/* ============ LOGIN ============ */}
          {tab === 'login' && (
            <div className="form-section active" id="login" style={{ animation: 'slideInPanel 0.4s ease forwards' }}>
              {lStep === 1 ? (
                <div id="ls1">
                  <div className="step-dots">
                    <div className="s-dot active"></div>
                    <div className="s-dot idle"></div>
                  </div>
                  <div className="sec-title">Welcome back 👋</div>
                  <div className="sec-sub">Sign in with your phone number — no password needed.</div>

                  <div className="field">
                    <label><div className="lbl-dot"></div>Mobile Number</label>
                    <div className="input-wrap phone">
                      <span className="ico">📱</span>
                      <span className="cc-badge">+91</span>
                      <input type="tel" value={lPhone} onChange={e => setLPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="98765 43210" />
                    </div>
                  </div>

                  <div className="hint-bar" style={{ marginTop: '4px' }}>
                    <span className="hint-icon">🔒</span>
                    <p>Your number is encrypted and never shared with third parties.</p>
                  </div>

                  <button className="send-otp-btn" onClick={loginSend}>
                    Send OTP
                    <svg style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginLeft: '6px', stroke: 'currentColor', fill: 'none', strokeWidth: 2.5 }} viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </button>
                </div>
              ) : (
                <div id="ls2">
                  <div className="step-dots">
                    <div className="s-dot done"></div>
                    <div className="s-dot active"></div>
                  </div>
                  <div className="sec-title">Enter OTP ✨</div>
                  <div className="sec-sub">6-digit code sent to {lPhone}</div>

                  <div className="field" style={{ marginBottom: '4px' }}>
                    <label><div className="lbl-dot"></div>Verification Code</label>
                    <div className="otp-grid">
                      {lOtp.map((val, i) => (
                        <input
                          key={i}
                          id={`lOtp-${i}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          className={`otp-cell ${val ? 'filled' : ''}`}
                          value={val}
                          onChange={e => handleOtpInput(e.target.value.replace(/\D/g, ''), i, 'l')}
                          onKeyDown={e => handleOtpKeyDown(e, i, 'l')}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="otp-timer">
                    Resend in <span className="t-count">{lTimer}s</span> &nbsp;·&nbsp;
                    <span className={`resend-link ${lTimer === 0 ? 'active' : ''}`} onClick={() => lTimer === 0 && loginSend()} style={{ cursor: 'pointer' }}>Resend OTP</span>
                  </div>
                  <button className="btn-main" onClick={verifyLogin}>Verify &amp; Sign In</button>
                  <a className="back-link" onClick={() => setLStep(1)} style={{ cursor: 'pointer' }}>
                    <svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
                    Change number
                  </a>
                </div>
              )}
              <div className="trust">
                <div className="trust-pill"><div className="g-dot"></div>Secure OTP</div>
                <div className="trust-pill"><div className="g-dot"></div>No Password</div>
                <div className="trust-pill"><div className="g-dot"></div>Instant Access</div>
              </div>
            </div>
          )}

          {/* ============ SIGNUP ============ */}
          {tab === 'signup' && (
            <div className="form-section active" id="signup" style={{ animation: 'slideInPanel 0.4s ease forwards' }}>
              {sStep === 1 ? (
                <div id="ss1">
                  <div className="step-dots">
                    <div className="s-dot active"></div>
                    <div className="s-dot idle"></div>
                  </div>
                  <div className="sec-title">Join TOPSUN ✨</div>
                  <div className="sec-sub">Create your account and unlock exclusive drops.</div>

                  <div className="field">
                    <label><div className="lbl-dot"></div>Full Name</label>
                    <div className="input-wrap">
                      <span className="ico">👤</span>
                      <input type="text" value={sName} onChange={e => setSName(e.target.value)} placeholder="Alex Jordan" />
                    </div>
                  </div>

                  <div className="field">
                    <label><div className="lbl-dot"></div>Mobile Number</label>
                    <div className="input-wrap phone">
                      <span className="ico">📱</span>
                      <span className="cc-badge">+91</span>
                      <input type="tel" value={sPhone} onChange={e => setSPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="98765 43210" />
                    </div>
                  </div>

                  <button className="send-otp-btn" onClick={signupSend}>
                    Send OTP
                    <svg style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginLeft: '6px', stroke: 'currentColor', fill: 'none', strokeWidth: 2.5 }} viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </button>
                </div>
              ) : (
                <div id="ss2">
                  <div className="step-dots">
                    <div className="s-dot done"></div>
                    <div className="s-dot active"></div>
                  </div>
                  <div className="sec-title">Verify Number 🔐</div>
                  <div className="sec-sub">6-digit code sent to {sPhone}</div>

                  <div className="field" style={{ marginBottom: '4px' }}>
                    <label><div className="lbl-dot"></div>Verification Code</label>
                    <div className="otp-grid">
                      {sOtp.map((val, i) => (
                        <input
                          key={i}
                          id={`sOtp-${i}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          className={`otp-cell ${val ? 'filled' : ''}`}
                          value={val}
                          onChange={e => handleOtpInput(e.target.value.replace(/\D/g, ''), i, 's')}
                          onKeyDown={e => handleOtpKeyDown(e, i, 's')}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="otp-timer">
                    Resend in <span className="t-count">{sTimer}s</span> &nbsp;·&nbsp;
                    <span className={`resend-link ${sTimer === 0 ? 'active' : ''}`} onClick={() => sTimer === 0 && signupSend()} style={{ cursor: 'pointer' }}>Resend OTP</span>
                  </div>
                  <button className="btn-main" onClick={verifySignup}>Create My Account</button>
                  <a className="back-link" onClick={() => setSStep(1)} style={{ cursor: 'pointer' }}>
                    <svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
                    Change details
                  </a>
                </div>
              )}
              <div className="trust">
                <div className="trust-pill"><div className="g-dot"></div>Free Shipping</div>
                <div className="trust-pill"><div className="g-dot"></div>Easy Returns</div>
                <div className="trust-pill"><div className="g-dot"></div>Exclusive Drops</div>
              </div>
            </div>
          )}
        </div>

        <div className={`success-overlay ${success ? 'show' : ''}`}>
          <div className="success-icon">✓</div>
          <div className="success-msg">Signed In!</div>
          <div className="success-sub">Redirecting to your dashboard…</div>
        </div>
      </div>
    </div>
  );
}
