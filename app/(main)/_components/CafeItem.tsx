import { ReactNode } from 'react';

interface CafeItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function CafeItem({ icon, title, description }: CafeItemProps) {
  return (
    <div className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-orange-500 flex flex-col items-center text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 text-orange-500 mb-5 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-[#1a237e] mb-4 group-hover:text-orange-600 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}
