
import Link from 'next/link';
import { type ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
}

export function ServiceCard({ icon, title, description, link }: ServiceCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md min-h-[280px] flex flex-col" style={{ contain: 'layout' }}>
      <div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-4" style={{ minHeight: '0' }}>
        {/* Placeholder for image if needed */}
      </div>
      <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-4">
        <span className="p-3 rounded-full bg-orange-100 text-orange-500 flex-shrink-0" style={{ width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </span>
        <span className="flex-1">{title}</span>
      </h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <Link href={link} className="text-orange-500 font-semibold hover:underline mt-auto inline-block">
        Let&apos;s Go
      </Link>
    </div>
  );
}
