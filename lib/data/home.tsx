import {
    ShieldHalf,
    LifeBuoy,
    Cpu,
    FileUser,
    School,
    HandCoins,
    Printer,
    Video,
    Headset,
    Laptop,
    Paintbrush,
    Code,
    BookOpen,
    Map,
    Star,
    Building2,
} from 'lucide-react';
import CoffeeIcon from '@/components/icons/Coffee';
import CookieIcon from '@/components/icons/Cookie';
import UtensilsIcon from '@/components/icons/Utensils';
import GlassWaterIcon from '@/components/icons/GlassWater';

export const coreServices = [
    {
      icon: <ShieldHalf size={40} />,
      title: 'TrustFix',
      description:
        'Discover top-notch computer and accessories sales, expert repairs, upgrades, and reliable IT support all in one place.',
      link: '/trustfix',
    },
    {
      icon: <LifeBuoy size={40} />,
      title: 'Swiftwheel Services',
      description:
        'Register your business and file annual returns with ease. We handle CAC processes quickly and professionally.',
      link: '/swiftwheel',
    },
    {
      icon: <Cpu size={40} />,
      title: 'TechLift',
      description:
        'Advance your career with hands-on training in computers, programming, graphics, and digital technologies from certified experts.',
      link: '/techlift',
    },
    {
      icon: <FileUser size={40} />,
      title: 'ApplySmart',
      description:
        'A fast, reliable all-in-one platform that simplifies Post UTME and admission applications, helps students find suitable scholarships, and provides timely tips, updates, and educational insights. Submit your preferences today for a personalised admission analysis.',
      link: '/applysmart',
    },
    {
      icon: <School size={40} />,
      title: 'CoopHub',
      description:
        'Simplify your school and cooperative financial life in one place. Make secure fee payments, manage savings and contributions, and access instant loans, all through our trusted digital cooperative platform for students and parents.',
      link: '/coophub',
    },
    {
      icon: <HandCoins size={40} />,
      title: 'SmartTax Receipts',
      description:
        'Our digital receipt system not only makes receiving receipts more convenient for your customers, it takes the stress out of customers having to hold onto their receipts when tax time rolls around.',
      link: '/smarttax',
    },
    {
      icon: <Map size={40} />,
      title: 'NaijaPolis',
      description:
        'A modular, open-source political campaign management platform built for Nigerian electoral conditions. Track analytics, canvassing, and volunteer activities.',
      link: '/naijapolis',
    },
    {
      icon: <Building2 size={40} />,
      title: 'Househood Portals',
      description:
        'A role-based portal experience for residents, managers, and operations teams to coordinate communities, requests, files, and day-to-day tasks from one dashboard.',
      link: '/househood',
    },
  ];
  
  export const professionalServices = [
    {
      icon: <Printer size={32} />,
      title: 'Printing & Photocopy',
      description:
        'High-quality document printing, photocopying, and scanning services.',
    },
    {
      icon: <Video size={32} />,
      title: 'Church Media',
      description:
        'Audio-visual support, live streaming, and media production for churches.',
    },
    {
      icon: <Headset size={32} />,
      title: 'IT User Support',
      description:
        'Technical assistance, troubleshooting, and user training for IT systems.',
    },
    {
      icon: <Laptop size={32} />,
      title: 'School Management',
      description:
        'Sales and setup of school management and e-learning software.',
    },
    {
      icon: <Paintbrush size={32} />,
      title: 'Graphics Design',
      description:
        'Professional presentations, flyers, banners, and graphic design services.',
    },
    {
      icon: <Code size={32} />,
      title: 'Web Development',
      description:
        'Custom websites, web apps, and online solutions for your business.',
    },
    {
      icon: <BookOpen size={32} />,
      title: 'Student Research Companion',
      description:
        'Comprehensive research assistance including project topics, materials, and 24/7 support from experienced academic writers.',
    },
    {
      icon: <Map size={32} />,
      title: 'Rentals & Delivery Services',
      description:
        'We connect students with verified rentals and provide local delivery services across Ibadan.',
    },
  ];

  export const cafeItems = [
    {
      icon: <CoffeeIcon width={32} height={32} />,
      title: 'Coffee & Tea',
      description: 'Freshly brewed coffee, herbal teas, and hot chocolate.',
    },
    {
      icon: <CookieIcon width={32} height={32} />,
      title: 'Pastries & Snacks',
      description: 'Croissants, meat pies, doughnuts, chin-chin, and more.',
    },
    {
      icon: <UtensilsIcon width={32} height={32} />,
      title: 'Meals',
      description: 'Rice dishes, noodles, and light meals for busy days.',
    },
    {
      icon: <GlassWaterIcon width={32} height={32} />,
      title: 'Cold Drinks',
      description: 'Soft drinks, bottled water, and fresh juices.',
    },
    {
      icon: <Star size={32} />,
      title: 'Daily Specials',
      description: 'Ask for our chef\'s special and combo offers.',
    },
    {
      icon: <Star size={32} />,
      title: 'Café Experience',
      description: 'Relax, work, or connect with others in our cozy cafe while enjoying our menu.',
    },
  ];
