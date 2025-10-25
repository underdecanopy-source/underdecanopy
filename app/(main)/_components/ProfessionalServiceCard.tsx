
import { type ReactNode } from 'react';

interface ProfessionalServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function ProfessionalServiceCard({ icon, title, description }: ProfessionalServiceCardProps) {
  return (
    <div className="text-center min-h-[200px] flex flex-col">
      <div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-4">
        {/* Placeholder for image if needed */}
      </div>
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500 text-white mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
    </div>
  );
}
