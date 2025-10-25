import { subscribeToNewsletter, NewsletterState } from '../newsletter';

describe('Newsletter Subscription Action', () => {
  const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

  afterEach(() => {
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  describe('subscribeToNewsletter', () => {
    it('should accept valid email', async () => {
      const formData = new FormData();
      formData.append('email', 'user@example.com');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.message).toBe('Thank you for subscribing!');
      expect(result.errors).toBeUndefined();
    });

    it('should log email to console', async () => {
      const formData = new FormData();
      formData.append('email', 'user@example.com');

      await subscribeToNewsletter({}, formData);

      expect(mockConsoleLog).toHaveBeenCalledWith(
        'New newsletter subscription:',
        'user@example.com'
      );
    });

    it('should reject missing email', async () => {
      const formData = new FormData();

      const result = await subscribeToNewsletter({}, formData);

      expect(result.errors?.email).toBeDefined();
      expect(result.message).toContain('Validation failed');
    });

    it('should reject invalid email format', async () => {
      const formData = new FormData();
      formData.append('email', 'invalid-email');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.errors?.email).toBeDefined();
      expect(result.errors?.email?.[0]).toContain('valid email');
      expect(result.message).toContain('Validation failed');
    });

    it('should reject email without domain', async () => {
      const formData = new FormData();
      formData.append('email', 'user@');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.errors?.email).toBeDefined();
    });

    it('should reject email without local part', async () => {
      const formData = new FormData();
      formData.append('email', '@example.com');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.errors?.email).toBeDefined();
    });

    it('should accept email with plus addressing', async () => {
      const formData = new FormData();
      formData.append('email', 'user+newsletter@example.com');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.message).toBe('Thank you for subscribing!');
      expect(result.errors).toBeUndefined();
    });

    it('should accept email with dots in local part', async () => {
      const formData = new FormData();
      formData.append('email', 'user.name@example.com');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.message).toBe('Thank you for subscribing!');
      expect(result.errors).toBeUndefined();
    });

    it('should accept international domain extensions', async () => {
      const formData = new FormData();
      formData.append('email', 'user@example.co.uk');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.message).toBe('Thank you for subscribing!');
      expect(result.errors).toBeUndefined();
    });

    it('should handle empty string email', async () => {
      const formData = new FormData();
      formData.append('email', '');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.errors?.email).toBeDefined();
    });

    it('should handle whitespace-only email', async () => {
      const formData = new FormData();
      formData.append('email', '   ');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.errors?.email).toBeDefined();
    });

    it('should handle email with spaces', async () => {
      const formData = new FormData();
      formData.append('email', 'user @example.com');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.errors?.email).toBeDefined();
    });

    it('should accept uppercase email', async () => {
      const formData = new FormData();
      formData.append('email', 'USER@EXAMPLE.COM');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.message).toBe('Thank you for subscribing!');
      expect(result.errors).toBeUndefined();
    });

    it('should accept mixed case email', async () => {
      const formData = new FormData();
      formData.append('email', 'User@Example.Com');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.message).toBe('Thank you for subscribing!');
      expect(result.errors).toBeUndefined();
    });

    it('should reject email with multiple @ symbols', async () => {
      const formData = new FormData();
      formData.append('email', 'user@@example.com');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.errors?.email).toBeDefined();
    });

    it('should reject email with special characters in domain', async () => {
      const formData = new FormData();
      formData.append('email', 'user@exam!ple.com');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.errors?.email).toBeDefined();
    });

    it('should preserve previous state if provided', async () => {
      const prevState: NewsletterState = {
        message: 'Previous message',
        errors: { email: ['Previous error'] },
      };

      const formData = new FormData();
      formData.append('email', 'user@example.com');

      const result = await subscribeToNewsletter(prevState, formData);

      // New submission should override previous state
      expect(result.message).toBe('Thank you for subscribing!');
      expect(result.errors).toBeUndefined();
    });

    it('should handle very long email address', async () => {
      const longEmail = 'a'.repeat(50) + '@example.com';
      const formData = new FormData();
      formData.append('email', longEmail);

      const result = await subscribeToNewsletter({}, formData);

      expect(result.message).toBe('Thank you for subscribing!');
      expect(result.errors).toBeUndefined();
    });

    it('should handle email with numbers', async () => {
      const formData = new FormData();
      formData.append('email', 'user123@example456.com');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.message).toBe('Thank you for subscribing!');
      expect(result.errors).toBeUndefined();
    });

    it('should handle email with hyphens in domain', async () => {
      const formData = new FormData();
      formData.append('email', 'user@example-domain.com');

      const result = await subscribeToNewsletter({}, formData);

      expect(result.message).toBe('Thank you for subscribing!');
      expect(result.errors).toBeUndefined();
    });
  });

  describe('Newsletter State Type', () => {
    it('should have correct NewsletterState type structure', async () => {
      const formData = new FormData();
      formData.append('email', 'user@example.com');

      const result = await subscribeToNewsletter({}, formData);

      expect(typeof result).toBe('object');
      expect('message' in result || 'errors' in result).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should return consistent error messages', async () => {
      const formData1 = new FormData();
      formData1.append('email', 'invalid');

      const formData2 = new FormData();
      formData2.append('email', 'also-invalid');

      const result1 = await subscribeToNewsletter({}, formData1);
      const result2 = await subscribeToNewsletter({}, formData2);

      expect(result1.errors?.email).toBeDefined();
      expect(result2.errors?.email).toBeDefined();
      expect(result1.message).toBe(result2.message);
    });
  });
});

