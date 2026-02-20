import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()        // stop page reload
    setError(null)
    setSuccess(null)

    // Step 1: Frontend Validation
    if (!form.email || !form.password) {
      setError('All fields are required!')
      return
    }

    // Step 2: Show loading
    setLoading(true)

    // Step 3: Fake API call 
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Step 4: Fake response handling
    if (form.email === 'user@demo.com' && form.password === 'password123') {
      // SUCCESS response
      const fakeResponse = {
        token: 'jwt-token-xyz-123',
        user: { name: 'chetan', email: form.email }
      }
      localStorage.setItem('token', fakeResponse.token)  // save token
      setSuccess(`Welcome back, ${fakeResponse.user.name}! Token saved.`)
    } else {
      // ERROR response
      setError('Invalid email or password!')
    }

    setLoading(false)
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h2 style={styles.title}>🔐 Login</h2>
        <p style={styles.hint}>Use: user@demo.com / password123</p>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div style={styles.group}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="user@demo.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div style={styles.group}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="password123"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Error Message */}
          {error && <p style={styles.error}>❌ {error}</p>}

          {/* Success Message */}
          {success && <p style={styles.success}>✅ {success}</p>}

          {/* Submit Button */}
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <p style={styles.foot}>
          No account? <Link to="/signup" style={styles.link}>Sign up</Link>
        </p>

      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    background: '#0f0f13',
  },
  card: {
    background: '#1a1a24', border: '1px solid #2a2a38',
    borderRadius: '16px', padding: '36px',
    width: '100%', maxWidth: '400px',
  },
  title: { color: '#e2e8f0', marginBottom: '4px' },
  hint: {
    color: '#67e8f9', fontSize: '13px',
    background: 'rgba(6,182,212,0.08)',
    border: '1px solid rgba(6,182,212,0.2)',
    borderRadius: '8px', padding: '8px 12px', marginBottom: '20px'
  },
  group: { marginBottom: '16px' },
  label: { display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' },
  input: {
    width: '100%', padding: '10px 14px',
    background: '#0f0f13', border: '1px solid #2a2a38',
    borderRadius: '8px', color: '#e2e8f0',
    fontSize: '14px', outline: 'none',
  },
  error: {
    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
    color: '#fca5a5', borderRadius: '8px',
    padding: '10px', fontSize: '13px', marginBottom: '12px'
  },
  success: {
    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
    color: '#6ee7b7', borderRadius: '8px',
    padding: '10px', fontSize: '13px', marginBottom: '12px'
  },
  button: {
    width: '100%', padding: '12px',
    background: '#7c3aed', color: '#fff',
    border: 'none', borderRadius: '8px',
    fontSize: '15px', fontWeight: '700', cursor: 'pointer',
  },
  foot: { textAlign: 'center', marginTop: '20px', color: '#64748b', fontSize: '14px' },
  link: { color: '#7c3aed', fontWeight: '700' },
}

export default Login