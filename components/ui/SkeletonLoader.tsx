import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  width?: string;
  height?: string;
  variant?: 'text' | 'title' | 'image' | 'card';
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className = '',
  width,
  height,
  variant = 'text'
}) => {
  const baseClasses = 'skeleton animate-pulse bg-gray-200 rounded';

  const variantClasses = {
    text: 'skeleton-text',
    title: 'skeleton-title',
    image: 'skeleton-image',
    card: 'skeleton min-h-[200px] p-4'
  };

  const style = {
    ...(width && { width }),
    ...(height && { height })
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`skeleton card min-h-[200px] p-6 rounded-lg ${className}`}>
    <SkeletonLoader variant="title" className="mb-4" />
    <SkeletonLoader variant="text" className="mb-2" />
    <SkeletonLoader variant="text" className="mb-2" />
    <SkeletonLoader variant="text" className="w-3/4" />
  </div>
);

export const SkeletonGrid: React.FC<{
  count: number;
  className?: string;
  itemClassName?: string;
}> = ({ count, className = '', itemClassName = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
    {Array.from({ length: count }, (_, i) => (
      <SkeletonCard key={i} className={itemClassName} />
    ))}
  </div>
);
