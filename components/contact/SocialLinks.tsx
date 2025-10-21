/**
 * SocialLinks Component
 * Consistent social media links across all pages
 * Uses lucide-react icons for consistency
 */

'use client';

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
} from 'lucide-react';
import { CONTACT_CONFIG } from '@/lib/config/contact';

interface SocialLinksProps {
  variant?: 'icons-only' | 'with-labels' | 'full';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showEmail?: boolean;
}

export function SocialLinks({
  variant = 'icons-only',
  size = 'md',
  className = '',
  showEmail = false,
}: SocialLinksProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const socialLinks = [
    {
      name: 'Facebook',
      url: CONTACT_CONFIG.social.facebook,
      icon: Facebook,
      color: 'hover:text-blue-600',
    },
    {
      name: 'Twitter',
      url: CONTACT_CONFIG.social.twitter,
      icon: Twitter,
      color: 'hover:text-blue-400',
    },
    {
      name: 'Instagram',
      url: CONTACT_CONFIG.social.instagram,
      icon: Instagram,
      color: 'hover:text-pink-600',
    },
    {
      name: 'LinkedIn',
      url: CONTACT_CONFIG.social.linkedin,
      icon: Linkedin,
      color: 'hover:text-blue-700',
    },
    {
      name: 'YouTube',
      url: CONTACT_CONFIG.social.youtube,
      icon: Youtube,
      color: 'hover:text-red-600',
    },
  ];

  if (showEmail) {
    socialLinks.push({
      name: 'Email',
      url: CONTACT_CONFIG.getEmailLink(),
      icon: Mail,
      color: 'hover:text-orange-600',
    });
  }

  if (variant === 'icons-only') {
    return (
      <div className={`flex gap-4 ${className}`}>
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${link.name}`}
              className={`transition-colors ${link.color}`}
            >
              <Icon className={sizeClasses[size]} />
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === 'with-labels') {
    return (
      <div className={`flex flex-wrap gap-4 ${className}`}>
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${link.name}`}
              className={`flex items-center gap-2 transition-colors ${link.color}`}
            >
              <Icon className={sizeClasses[size]} />
              <span className="text-sm font-medium">{link.name}</span>
            </a>
          );
        })}
      </div>
    );
  }

  // Full variant with background
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow us on ${link.name}`}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 transition-all hover:bg-gray-200 ${link.color}`}
          >
            <Icon className={sizeClasses[size]} />
            <span className="text-sm font-medium">{link.name}</span>
          </a>
        );
      })}
    </div>
  );
}

