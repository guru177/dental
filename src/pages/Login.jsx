import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (email === 'admin@gmail.com' && password === 'admin123') {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <img src="/login_hero.png" alt="Welcome Hero" className="login-hero-img" />
          <div className="login-hero-text">
            <h2>EXPLORE.<br />LEARN. GROW.</h2>
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-container">
            <div className="login-logo">
              <Building2 size={32} color="#0f172a" />
              <span>DENTAL MASTER</span>
            </div>

            <div className="login-header">
              <h1>WELCOME BACK</h1>
              <p>Enter your email and password to access your account</p>
            </div>

            {error && <div className="login-error">{error}</div>}

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group-login">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group-login">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">Forgot Password</a>
              </div>

              <button type="submit" className="btn-signin">Sign In</button>

              <button type="button" className="btn-google">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" />
                Sign in with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
