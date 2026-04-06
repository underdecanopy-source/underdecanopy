
import Link from 'next/link';
import { type ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
}

export function ServiceCard({ icon, title, description, link }: ServiceCardProps) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": title,
    "description": description,
    "url": `https://underdecanopy.com${link}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Underdecanopy Hub"
    }
  };

  return (
    <Link 
      href={link} 
      className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-blue-600 cursor-pointer flex flex-col items-center text-center no-underline"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 mb-5 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-[#1a237e] mb-4 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 text-base leading-relaxed">
        {description}
      </p>
    </Link>
  );
}
