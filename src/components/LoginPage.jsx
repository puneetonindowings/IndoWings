import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  CheckCircle2,
  Mail,
  Lock,
  User,
  Phone,
  RefreshCw,
  Key
} from 'lucide-react';
import { authService, ADMIN_EMAIL, ADMIN_PASSWORD } from '../lib/supabase.js';

export default function LoginPage({ onNavigate }) {
  const cardRef = useRef(null);
  const otpInputRef = useRef(null);

  // Auth Modes: 'signin' | 'signup' | 'forgot-password' | 'set-new-password'
  const [authMode, setAuthMode] = useState('signin');

  // Sign In Step: 'email' (entry screen) | 'password' (password entry)
  const [signInStep, setSignInStep] = useState('email');

  // OTP Verification Step: 'form' | 'otp-verify'
  const [otpStep, setOtpStep] = useState('form');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI Feedback States
  const [loading, setLoading] = useState(false);
  const [authAction, setAuthAction] = useState(''); // 'password' | 'otp' | 'google' | 'temp_pass'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpInfo, setOtpInfo] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 18, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' }
    );
  }, [authMode, signInStep, otpStep]);

  // Auto-focus OTP input when entering OTP verification mode
  useEffect(() => {
    if (otpStep === 'otp-verify') {
      const timer = setTimeout(() => {
        otpInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [otpStep]);

  // Resend Cooldown Timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Switch between Sign In and Sign Up
  const handleSwitchMode = (targetMode) => {
    setAuthMode(targetMode);
    setSignInStep('email');
    setOtpStep('form');
    setError('');
    setSuccess('');
    setOtpInfo('');
    setOtpCode('');
    setPassword('');
    setConfirmPassword('');
  };

  // Helper: Validate email format
  const validateEmail = (val) => {
    const clean = (val || '').trim().toLowerCase();
    if (!clean) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean);
  };

  // ---------------------------------------------------------------------------
  // 1. SEND OTP DISPATCH
  // ---------------------------------------------------------------------------
  const handleSendOtp = async (targetEmail) => {
    const emailToSend = (targetEmail || email).trim().toLowerCase();
    if (!emailToSend || !validateEmail(emailToSend)) {
      setError('Please provide a valid email address.');
      return false;
    }

    setLoading(true);
    setAuthAction('otp');
    setError('');
    setSuccess('');

    try {
      const res = await authService.sendOtp(emailToSend);
      setLoading(false);
      setAuthAction('');

      if (!res.success) {
        setError(res.error || 'Failed to dispatch verification code.');
        return false;
      }

      setOtpStep('otp-verify');
      setResendCooldown(45);
      setOtpInfo(`A 6-digit verification code has been dispatched to ${emailToSend}.`);
      return true;
    } catch (err) {
      setLoading(false);
      setAuthAction('');
      setError('Failed to send OTP. Please check your connection.');
      return false;
    }
  };

  // ---------------------------------------------------------------------------
  // 2. VERIFY OTP AND COMPLETE AUTH
  // ---------------------------------------------------------------------------
  const handleVerifyOtp = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError('');
    setSuccess('');

    if (!otpCode || otpCode.trim().length < 6) {
      setError('Please enter the full 6-digit verification code.');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.verifyOtp(email, otpCode.trim());
      setLoading(false);

      if (res.error) {
        setError(res.error);
        return;
      }

      // If completing a new user sign up with profile info
      if (authMode === 'signup') {
        await authService.signUp({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password: password,
          role: 'candidate'
        });
      }

      setSuccess('Verification successful. Redirecting...');
      window.dispatchEvent(new Event('auth_state_changed'));

      const isTargetAdmin = email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() || res.isAdmin;
      setTimeout(() => {
        if (onNavigate) {
          onNavigate(isTargetAdmin ? 'admin-career' : 'career');
        }
      }, 500);
    } catch (err) {
      setLoading(false);
      setError('Invalid or expired verification code.');
    }
  };

  // ---------------------------------------------------------------------------
  // 3. SIGN IN FLOW: PROCEED WITH PASSWORD
  // ---------------------------------------------------------------------------
  const handleProceedWithPassword = () => {
    setError('');
    if (!email.trim() || !validateEmail(email)) {
      setError('Please enter a valid email address first.');
      return;
    }
    setSignInStep('password');
  };

  // ---------------------------------------------------------------------------
  // 4. SIGN IN FLOW: PROCEED WITH EMAIL OTP
  // ---------------------------------------------------------------------------
  const handleProceedWithOtp = async () => {
    setError('');
    if (!email.trim() || !validateEmail(email)) {
      setError('Please enter a valid email address first.');
      return;
    }
    await handleSendOtp(email);
  };

  // ---------------------------------------------------------------------------
  // 5. SIGN IN WITH PASSWORD SUBMISSION (INTERCEPTS TEMP PASSWORD)
  // ---------------------------------------------------------------------------
  const handlePasswordSignIn = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password) {
      setError('Please enter both your email and password.');
      return;
    }

    setLoading(true);
    setAuthAction('password');
    try {
      const res = await authService.signInWithEmail(email, password);
      setLoading(false);
      setAuthAction('');

      if (res.error) {
        setError(res.error);
        if (cardRef.current) {
          gsap.fromTo(cardRef.current, { x: -6 }, { x: 0, duration: 0.35, ease: 'elastic.out(1, 0.3)' });
        }
        return;
      }

      // Mandatory Interception: If user signed in with temporary password, prompt new permanent password!
      if (res.requiresPasswordReset) {
        setAuthMode('set-new-password');
        setPassword('');
        setConfirmPassword('');
        setSuccess('Temporary password accepted! Please set your new permanent password below.');
        return;
      }

      setSuccess('Authentication successful. Redirecting...');
      window.dispatchEvent(new Event('auth_state_changed'));

      const isTargetAdmin = res.isAdmin || email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
      setTimeout(() => {
        if (onNavigate) {
          onNavigate(isTargetAdmin ? 'admin-career' : 'career');
        }
      }, 500);
    } catch (err) {
      setLoading(false);
      setAuthAction('');
      setError('Invalid credentials.');
    }
  };

  // ---------------------------------------------------------------------------
  // 6. FORGOT PASSWORD: SEND TEMPORARY PASSWORD TO EMAIL
  // ---------------------------------------------------------------------------
  const handleSendTemporaryPassword = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !validateEmail(email)) {
      setError('Please enter a valid email address to receive your temporary password.');
      return;
    }

    setLoading(true);
    setAuthAction('temp_pass');
    try {
      const res = await authService.generateTemporaryPassword(email);
      setLoading(false);
      setAuthAction('');

      if (!res.success) {
        setError(res.error || 'Failed to dispatch temporary password.');
        return;
      }

      // Transition to sign in password step with clean prompt
      setAuthMode('signin');
      setSignInStep('password');
      setPassword('');
      setSuccess(`A temporary password has been dispatched to ${email}. Enter it below to sign in.`);
    } catch (err) {
      setLoading(false);
      setAuthAction('');
      setError('Failed to dispatch temporary password. Please try again.');
    }
  };

  // ---------------------------------------------------------------------------
  // 7. SET NEW PERMANENT PASSWORD (MANDATORY AFTER TEMP PASS LOGIN)
  // ---------------------------------------------------------------------------
  const handleSaveNewPassword = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError('');
    setSuccess('');

    if (!password || password.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password confirmation.');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.updatePermanentPassword(email, password);
      setLoading(false);

      if (!res.success) {
        setError(res.error || 'Failed to update password.');
        return;
      }

      setSuccess('Your new permanent password has been saved! Redirecting to your dashboard...');
      window.dispatchEvent(new Event('auth_state_changed'));

      const isTargetAdmin = email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() || res.isAdmin;
      setTimeout(() => {
        if (onNavigate) {
          onNavigate(isTargetAdmin ? 'admin-career' : 'career');
        }
      }, 700);
    } catch (err) {
      setLoading(false);
      setError('Failed to save new password. Please try again.');
    }
  };

  // ---------------------------------------------------------------------------
  // 8. SIGN UP SUBMISSION (DISPATCHES OTP)
  // ---------------------------------------------------------------------------
  const handleSignUpSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your contact phone number.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password confirmation.');
      return;
    }

    // Send OTP to user's email for verification before completing registration
    await handleSendOtp(email);
  };

  // ---------------------------------------------------------------------------
  // 9. GOOGLE SSO LOGIN
  // ---------------------------------------------------------------------------
  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    setAuthAction('google');
    try {
      const res = await authService.signInWithGoogle();
      if (res?.user) {
        setSuccess('Google authorization successful. Redirecting...');
        window.dispatchEvent(new Event('auth_state_changed'));
        setTimeout(() => {
          if (onNavigate) onNavigate('career');
        }, 500);
      }
    } catch (err) {
      setError('Google Sign-In was cancelled or failed.');
    } finally {
      setLoading(false);
      setAuthAction('');
    }
  };

  return (
    <div className="ebolt-universe">
      
      {/* Background: Majestic aerospace night atmosphere & celestial orbital arc */}
      <div className="ebolt-sky-backdrop" />
      <div className="ebolt-orbital-ring" />
      <div className="ebolt-aurora-glow" />

      {/* Centerpiece Frosted Glass Card */}
      <div ref={cardRef} className="ebolt-card">

        {/* Top Floating Action Pill with Arrow [ → ] */}
        <div className="ebolt-top-icon-pill">
          <div className="ebolt-icon-box">
            <ArrowRight size={18} className="ebolt-icon-arrow" />
          </div>
        </div>

        {/* Headline & Subtitle */}
        <h1 className="ebolt-title">
          {otpStep === 'otp-verify'
            ? 'Verify your email'
            : authMode === 'forgot-password'
              ? 'Reset your password'
              : authMode === 'set-new-password'
                ? 'Set New Password'
                : authMode === 'signup'
                  ? 'Create your account'
                  : signInStep === 'password'
                    ? 'Enter your password'
                    : 'Sign in with email'}
        </h1>
        <p className="ebolt-subtitle">
          {otpStep === 'otp-verify'
            ? `Enter the 6-digit authentication code sent to ${email}`
            : authMode === 'forgot-password'
              ? 'Enter your email address and we will send you a temporary password.'
              : authMode === 'set-new-password'
                ? `Create a new secure permanent password for ${email}`
                : authMode === 'signup'
                  ? 'Join the IndoWings aerospace talent network for career opportunities.' 
                  : signInStep === 'password'
                    ? `Signing in as ${email}`
                    : 'Enter your email to continue with password or receive an OTP.'}
        </p>

        {/* Feedback Alerts */}
        {error && (
          <div className="ebolt-alert error">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="ebolt-alert success">
            <CheckCircle2 size={16} className="flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}
        {otpInfo && !error && (
          <div className="ebolt-alert info">
            <CheckCircle2 size={16} className="flex-shrink-0" />
            <span>{otpInfo}</span>
          </div>
        )}

        {/* =====================================================================
            SCREEN 1: OTP CODE VERIFICATION SCREEN (CLEAN, NO OVERLAPPING ICON)
            ===================================================================== */}
        {otpStep === 'otp-verify' ? (
          <form onSubmit={handleVerifyOtp} className="ebolt-form">
            {/* High-Tech 6-Segment Digital PIN Slots */}
            <div 
              className="ebolt-otp-slots-wrap" 
              onClick={() => otpInputRef.current?.focus()}
              role="button"
              tabIndex={0}
              aria-label="Click to enter 6-digit verification code"
            >
              {[0, 1, 2, 3, 4, 5].map((slotIdx) => {
                const digit = (otpCode || '')[slotIdx] || '';
                const isFilled = Boolean(digit);
                const isCurrent = slotIdx === Math.min((otpCode || '').length, 5);
                return (
                  <div 
                    key={slotIdx}
                    className={`ebolt-otp-digit-slot ${isFilled ? 'is-filled' : ''} ${isCurrent && !isFilled ? 'is-active' : ''}`}
                  >
                    {isFilled ? (
                      <span className="ebolt-otp-digit-char">{digit}</span>
                    ) : isCurrent ? (
                      <span className="ebolt-otp-cursor" />
                    ) : (
                      <span className="ebolt-otp-placeholder-dot" />
                    )}
                  </div>
                );
              })}

              {/* Native invisible input overlay for universal keyboard & paste capture */}
              <input
                ref={otpInputRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                maxLength={6}
                value={otpCode}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setOtpCode(cleaned);
                  if (error) setError('');
                }}
                className="ebolt-otp-invisible-input"
                autoComplete="one-time-code"
                autoFocus
              />
            </div>
            <div className="ebolt-otp-actions-row">
              <button
                type="button"
                disabled={resendCooldown > 0 || loading}
                onClick={() => handleSendOtp(email)}
                className="ebolt-resend-btn"
              >
                <RefreshCw size={12} className={loading && authAction === 'otp' ? 'animate-spin' : ''} />
                <span>
                  {resendCooldown > 0 
                    ? `Resend code in ${resendCooldown}s` 
                    : 'Resend code'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOtpStep('form');
                  setSignInStep('email');
                  setError('');
                }}
                className="ebolt-resend-btn"
              >
                Change email
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || otpCode.length < 6}
              className="ebolt-submit-btn"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin text-white" />
              ) : (
                <span>Verify OTP &amp; Proceed</span>
              )}
            </button>
          </form>
        ) : authMode === 'forgot-password' ? (
          /* =====================================================================
              SCREEN 2: FORGOT PASSWORD (REQUEST TEMPORARY PASSWORD)
              ===================================================================== */
          <form onSubmit={handleSendTemporaryPassword} className="ebolt-form">
            <div className="ebolt-input-group">
              <Mail size={17} className="ebolt-input-icon" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your registered email"
                className="ebolt-input"
                autoComplete="email"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="ebolt-submit-btn"
            >
              {loading && authAction === 'temp_pass' ? (
                <Loader2 size={18} className="animate-spin text-white" />
              ) : (
                <span>Send Temporary Password</span>
              )}
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.1rem' }}>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  setSignInStep('password');
                  setError('');
                }}
                className="ebolt-link-action-btn is-muted"
              >
                ← Back to Sign In
              </button>
            </div>
          </form>
        ) : authMode === 'set-new-password' ? (
          /* =====================================================================
              SCREEN 3: MANDATORY SET NEW PASSWORD (AFTER TEMP PASSWORD LOGIN)
              ===================================================================== */
          <form onSubmit={handleSaveNewPassword} className="ebolt-form">
            {/* New Password */}
            <div className="ebolt-input-group has-eye">
              <Lock size={17} className="ebolt-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password (min. 6 characters)"
                className="ebolt-input"
                autoComplete="new-password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="ebolt-eye-btn"
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Confirm New Password */}
            <div className="ebolt-input-group has-eye">
              <Lock size={17} className="ebolt-input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new permanent password"
                className="ebolt-input"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(prev => !prev)}
                className="ebolt-eye-btn"
                tabIndex={-1}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="ebolt-submit-btn"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin text-white" />
              ) : (
                <span>Save New Password &amp; Continue</span>
              )}
            </button>
          </form>
        ) : authMode === 'signup' ? (
          /* =====================================================================
              SCREEN 4: SIGN UP FORM
              ===================================================================== */
          <form onSubmit={handleSignUpSubmit} className="ebolt-form">
            {/* Full Name */}
            <div className="ebolt-input-group">
              <User size={17} className="ebolt-input-icon" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="ebolt-input"
                autoComplete="name"
              />
            </div>

            {/* Email Address */}
            <div className="ebolt-input-group">
              <Mail size={17} className="ebolt-input-icon" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="ebolt-input"
                autoComplete="email"
              />
            </div>

            {/* Contact Phone */}
            <div className="ebolt-input-group">
              <Phone size={17} className="ebolt-input-icon" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile phone number"
                className="ebolt-input"
                autoComplete="tel"
              />
            </div>

            {/* Password */}
            <div className="ebolt-input-group has-eye">
              <Lock size={17} className="ebolt-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password (min. 6 characters)"
                className="ebolt-input"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="ebolt-eye-btn"
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="ebolt-input-group has-eye">
              <Lock size={17} className="ebolt-input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="ebolt-input"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(prev => !prev)}
                className="ebolt-eye-btn"
                tabIndex={-1}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="ebolt-submit-btn"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin text-white" />
              ) : (
                <span>Create Account &amp; Send OTP</span>
              )}
            </button>
          </form>
        ) : signInStep === 'email' ? (
          /* =====================================================================
              SCREEN 5: SIGN IN STEP 1 (EMAIL ENTRY + DIRECT OPTIONS BELOW)
              ===================================================================== */
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleProceedWithPassword();
            }} 
            className="ebolt-form"
          >
            <div className="ebolt-input-group">
              <Mail size={17} className="ebolt-input-icon" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your email address"
                className="ebolt-input"
                autoComplete="email"
                autoFocus
              />
            </div>

            {/* Dynamic action options below email */}
            <div className="ebolt-actions-stack">
              <button
                type="button"
                disabled={loading}
                onClick={handleProceedWithPassword}
                className="ebolt-submit-btn"
              >
                <Lock size={16} />
                <span>Login with Password</span>
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleProceedWithOtp}
                className="ebolt-secondary-action-btn"
              >
                {loading && authAction === 'otp' ? (
                  <Loader2 size={16} className="animate-spin text-orange-400" />
                ) : (
                  <>
                    <Mail size={16} />
                    <span>Login with Email OTP</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* =====================================================================
              SCREEN 6: SIGN IN STEP 2 (PASSWORD ENTRY AFTER CHOOSING PASSWORD)
              ===================================================================== */
          <form onSubmit={handlePasswordSignIn} className="ebolt-form">
            {/* Selected Email Display with Change Button */}
            <div className="ebolt-input-group is-readonly">
              <Mail size={17} className="ebolt-input-icon" />
              <input
                type="email"
                value={email}
                readOnly
                className="ebolt-input"
              />
              <button
                type="button"
                onClick={() => {
                  setSignInStep('email');
                  setPassword('');
                  setError('');
                }}
                className="ebolt-change-email-inline-btn"
                title="Change email"
              >
                Change
              </button>
            </div>

            {/* Password Input with Eye Visibility Toggle */}
            <div className="ebolt-input-group has-eye">
              <Lock size={17} className="ebolt-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password or temporary passkey"
                className="ebolt-input"
                autoComplete="current-password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="ebolt-eye-btn"
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Forgot Password Row */}
            <div className="ebolt-forgot-row">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('forgot-password');
                  setError('');
                  setSuccess('');
                }}
                className="ebolt-forgot-btn"
              >
                Forgot password?
              </button>
            </div>

            {/* Radiant Orange Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="ebolt-submit-btn"
            >
              {loading && authAction === 'password' ? (
                <Loader2 size={18} className="animate-spin text-white" />
              ) : (
                <span>Sign In</span>
              )}
            </button>

            {/* Seamless helper switcher under password */}
            <div className="ebolt-switch-action-row">
              <button
                type="button"
                disabled={loading}
                onClick={handleProceedWithOtp}
                className="ebolt-link-action-btn"
              >
                <Mail size={13} />
                <span>Sign in with Email OTP instead</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSignInStep('email');
                  setPassword('');
                  setError('');
                }}
                className="ebolt-link-action-btn is-muted"
              >
                <span>← Back to Email</span>
              </button>
            </div>
          </form>
        )}

        {/* Divider: 'Or sign in with' (Only shown on primary entry screens) */}
        {otpStep === 'form' && authMode !== 'set-new-password' && (
          <>
            <div className="ebolt-divider">
              <span>Or sign in with</span>
            </div>

            {/* ONLY GOOGLE BUTTON */}
            <div className="ebolt-google-wrap">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="ebolt-google-btn"
                title="Continue with Google"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0">
                  <path fill="#EA4335" d="M12 5c1.7 0 3 .6 4 1.5l3-3C17.1 1.8 14.8 1 12 1 7.4 1 3.6 3.6 1.8 7.3l3.7 2.9C6.4 7.3 8.9 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
                  <path fill="#FBBC05" d="M5.5 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.8 7.3C.7 9.6 0 11.2 0 12.5s.7 2.9 1.8 5.2l3.7-2.9z"/>
                  <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.6-2.3-6.5-5.2L1.8 17C3.6 20.7 7.4 24 12 24z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </>
        )}

        {/* Minimal Mode Switcher Footer */}
        {authMode !== 'set-new-password' && (
          <div className="ebolt-footer">
            {authMode === 'signup' ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('signin')}
                  className="ebolt-switch-btn"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('signup')}
                  className="ebolt-switch-btn"
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
