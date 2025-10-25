import { ReactNode } from 'react';

interface CafeItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function CafeItem({ icon, title, description }: CafeItemProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center min-h-[200px] flex flex-col">
      <div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-4">
        {/* Placeholder for image if needed */}
      </div>
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-500 mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
    </div>
  );
}
