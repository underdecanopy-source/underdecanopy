import React, { useState } from 'react';

/**
 * ImageWithPlaceholder Component
 * 
 * Prevents Cumulative Layout Shift (CLS) by reserving space for images before they load.
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text for accessibility
 * @param {number} aspectRatio - Aspect ratio (height/width), defaults to 0.5625 (16:9)
 * @param {string} className - Additional CSS classes
 * @param {string} placeholderColor - Background color for placeholder, defaults to '#f0f0f0'
 * @param {function} onLoad - Callback when image loads
 * @param {function} onError - Callback when image fails to load
 */
const ImageWithPlaceholder = ({
  src,
  alt,
  aspectRatio = 0.5625, // 16:9 aspect ratio by default
  className = '',
  placeholderColor = '#f0f0f0',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  const paddingTop = `${aspectRatio * 100}%`;

  return (
    <div
      className={`image-with-placeholder ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: placeholderColor,
      }}
    >
      <div style={{ paddingTop }} />
      {!hasError && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          loading="lazy"
          {...props}
        />
      )}
      {!isLoaded && !hasError && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Loading image"
        >
          <div className="loading-skeleton" style={{ width: '100%', height: '100%' }} />
        </div>
      )}
      {hasError && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
            fontSize: '14px',
          }}
        >
          Image failed to load
        </div>
      )}
    </div>
  );
};

export default ImageWithPlaceholder;
