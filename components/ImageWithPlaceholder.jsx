import React from 'react';

/**
 * ImageWithPlaceholder - A reusable React component for preventing CLS
 * Reserves aspect ratio space to prevent layout shifts during image loading
 * 
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {number} props.width - Image width (used for aspect ratio calculation)
 * @param {number} props.height - Image height (used for aspect ratio calculation)
 * @param {string} [props.className] - Optional CSS classes
 * @param {string} [props.loading="lazy"] - Loading strategy (lazy or eager)
 */
export const ImageWithPlaceholder = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  loading = 'lazy',
  ...props 
}) => {
  const aspectRatio = (height / width) * 100;
  
  return (
    <div 
      className={`relative w-full ${className}`}
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className="absolute top-0 left-0 w-full h-full object-cover"
        {...props}
      />
    </div>
  );
};

export default ImageWithPlaceholder;
