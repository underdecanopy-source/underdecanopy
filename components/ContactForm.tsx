'use client';

import { useState } from 'react';

interface ContactFormProps {
  purpose: string;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ purpose, className }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message, purpose, path: typeof window !== 'undefined' ? window.location.href : '' }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || 'Network response was not ok');
      }

      setSuccess('Your message has been sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError('There was a problem sending your message.');
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        label {
          display: flex;
          flex-direction: column;
          font-weight: 600;
        }
        input, textarea {
          margin-top: 0.5rem;
          padding: 0.5rem 0.75rem;
          border: 1px solid #e3e3e3;
          border-radius: 6px;
          font-size: 1rem;
        }
        textarea { min-height: 120px; resize: vertical; }
        button {
          padding: 0.75rem 1rem;
          background: #2c5530;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .success { color: #2c5530; background: #e8f5e9; padding: 0.75rem; border-radius: 6px; }
        .error { color: #c62828; background: #ffebee; padding: 0.75rem; border-radius: 6px; }
      `}</style>
    </form>
  );
};

export default ContactForm;