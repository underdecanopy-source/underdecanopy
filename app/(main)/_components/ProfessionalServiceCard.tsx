
import { type ReactNode } from 'react';

interface ProfessionalServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function ProfessionalServiceCard({ icon, title, description }: ProfessionalServiceCardProps) {
  return (
    <div className="text-center flex flex-col">
      <div className="flex items-center justify-center rounded-full bg-orange-500 text-white mx-auto mb-4 flex-shrink-0" style={{ width: '4rem', height: '4rem' }}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
    </div>
  );
}
