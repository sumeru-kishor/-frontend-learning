import { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
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
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('All fields are required!')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters!')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match!')
      return
    }

    // Step 2: Show loading
    setLoading(true)

    // Step 3: Fake API call (replace with real axios/fetch later)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Step 4: Fake response handling
    if (form.email === 'sumeru@demo.com') {
      // ERROR — email already exists
      setError('Email is already registered!')
    } else {
      // SUCCESS
      const fakeResponse = {
        message: 'Account created successfully!',
        user: { name: form.name, email: form.email }
      }
      setSuccess(`${fakeResponse.message} Welcome, ${fakeResponse.user.name}!`)
      setForm({ name: '', email: '', password: '', confirm: '' }) // reset form
    }

    setLoading(false)
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h2 style={styles.title}>✨ Sign Up</h2>
        <p style={styles.hint}>Try sumeru@demo.com to see "already registered" error</p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div style={styles.group}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Sujan Kumar"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div style={styles.group}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="kishor@example.com"
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
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div style={styles.group}>
            <label style={styles.label}>Confirm Password</label>
            <input
              style={{
                ...styles.input,
                borderColor:
                  form.confirm === ''         ? '#2a2a38' :
                  form.password === form.confirm ? '#10b981' : '#ef4444'
              }}
              type="password"
              name="confirm"
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={handleChange}
            />
            {/* Live match feedback */}
            {form.confirm !== '' && (
              <p style={{ fontSize: '12px', marginTop: '4px',
                color: form.password === form.confirm ? '#10b981' : '#ef4444' }}>
                {form.password === form.confirm ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && <p style={styles.error}>❌ {error}</p>}

          {/* Success Message */}
          {success && <p style={styles.success}>✅ {success}</p>}

          {/* Submit Button */}
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

        </form>

        <p style={styles.foot}>
          Have an account? <Link to="/login" style={styles.link}>Login</Link>
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
    color: '#fcd34d', fontSize: '13px',
    background: 'rgba(245,158,11,0.08)',
    border: '1px solid rgba(245,158,11,0.2)',
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

export default Signup