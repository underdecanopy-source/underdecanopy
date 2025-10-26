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
        body: JSON.stringify({ name, email, message, purpose }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSuccess('Your message has been sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setError('There was a problem sending your message.');
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
        }
        label {
          margin-bottom: 0.5rem;
        }
        input, textarea {
          margin-bottom: 1rem;
        }
        .success {
          color: green;
        }
        .error {
          color: red;
        }
      `}</style>
    </form>
  );
};

export default ContactForm;