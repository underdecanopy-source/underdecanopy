import { ReactNode } from 'react';

interface CafeItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function CafeItem({ icon, title, description }: CafeItemProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center min-h-[200px] flex flex-col" style={{ contain: 'layout' }}>
      <div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-4" style={{ minHeight: '0' }}>
        {/* Placeholder for image if needed */}
      </div>
      <div className="flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mx-auto mb-4 flex-shrink-0" style={{ width: '3rem', height: '3rem' }}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2 min-h-[2.5rem] flex items-center justify-center">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
    </div>
  );
}
