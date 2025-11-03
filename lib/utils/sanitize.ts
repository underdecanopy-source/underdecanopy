/**
 * Sanitize user input to prevent XSS attacks
 * NOTE: For basic text input only. For HTML content, use sanitizeHtml.
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  // For maximum security, we encode all special characters
  return input
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .slice(0, 10000); // Limit length
}

/**
 * Sanitize HTML content
 * WARNING: This removes ALL HTML tags for safety.
 * For production with user HTML, use a library like DOMPurify on the client side.
 */
export function sanitizeHtml(html: string): string {
  if (typeof html !== 'string') return '';
  
  // Strip all HTML tags and encode special characters for maximum security
  return html
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .slice(0, 50000);
}

/**
 * Sanitize email addresses
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return '';
  
  return email
    .trim()
    .toLowerCase()
    .slice(0, 254); // Max email length per RFC
}

/**
 * Sanitize URLs
 */
export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') return '';
  
  try {
    const parsed = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    
    return parsed.toString().slice(0, 2048); // Limit URL length
  } catch {
    return '';
  }
}

/**
 * Sanitize phone numbers
 */
export function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') return '';
  
  // Remove all non-digit characters except + at the start
  return phone
    .trim()
    .replace(/[^\d+]/g, '')
    .replace(/(?!^)\+/g, '') // Remove + except at the start
    .slice(0, 20);
}

/**
 * Sanitize object - recursively sanitize all string values
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };
  
  for (const key in sanitized) {
    const value = sanitized[key];
    
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value) as T[typeof key];
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value as Record<string, unknown>) as T[typeof key];
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === 'string' ? sanitizeInput(item) : item
      ) as T[typeof key];
    }
  }
  
  return sanitized;
}
