import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase-config'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Signup({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, error: null });
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus({ loading: true, error: null });

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registered:", userCredential.user.email);
      
      setStatus({ loading: false, error: null });
      setIsLoggedIn(true);
      navigate('/');
    } catch (err) {
      setStatus({ 
        loading: false, 
        error: err.message.replace("Firebase: ", "") 
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Create Account</h2>
        <p>Register a new account with Firebase</p>
      </div>

      {status.error && <div className="alert error">{status.error}</div>}

      <form onSubmit={handleSignup}>
        <div className={`form-group ${errors.email ? 'error' : ''}`}>
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={status.loading} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className={`form-group ${errors.password ? 'error' : ''}`}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={status.loading} />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={status.loading} />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" className="submit-btn" disabled={status.loading}>
          {status.loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="form-footer">
        <p>Already have an account? <Link to="/login">Sign in here</Link></p>
      </div>
    </div>
  );
}

export default Signup;