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
} from 'lucide-react';
import CoffeeIcon from '@/components/icons/Coffee';
import CookieIcon from '@/components/icons/Cookie';
import UtensilsIcon from '@/components/icons/Utensils';
import GlassWaterIcon from '@/components/icons/GlassWater';

export const coreServices = [
    {
      icon: <ShieldHalf size={32} />,
      title: 'TrustFix',
      description:
        'Discover top-notch computer and accessories sales, expert repairs, upgrades, and reliable IT support all in one place.',
      link: '/trustfix',
    },
    {
      icon: <LifeBuoy size={32} />,
      title: 'Swift Wheel',
      description:
        'Register your business and file annual returns with ease. We handle CAC processes quickly and professionally.',
      link: '/swiftwheel',
    },
    {
      icon: <Cpu size={32} />,
      title: 'TechLift',
      description:
        'Advance your career with hands-on training in computers, programming, graphics, and digital technologies from certified experts.',
      link: '/techlift',
    },
    {
      icon: <FileUser size={32} />,
      title: 'ApplySmart',
      description:
        'Fast, easy, and reliable Post UTME, admission applications, and online registration for schools and universities.',
      link: '/applysmart',
    },
    {
      icon: <School size={32} />,
      title: 'CoopHub',
      description:
        'Simplify your school and cooperative financial life in one place. Make secure fee payments, manage savings and contributions, and access instant loans, all through our trusted digital cooperative platform for students and parents.',
      link: '/coophub',
    },
    {
      icon: <HandCoins size={32} />,
      title: 'SmartTax Receipts',
      description:
        'Our digital receipt system not only makes receiving receipts more convenient for your customers, it takes the stress out of customers having to hold onto their receipts when tax time rolls around.',
      link: '/smarttax',
    },
  ];
  
  export const professionalServices = [
    {
      icon: <Printer />,
      title: 'Printing & Photocopy',
      description:
        'High-quality document printing, photocopying, and scanning services.',
    },
    {
      icon: <Video />,
      title: 'Church Media',
      description:
        'Audio-visual support, live streaming, and media production for churches.',
    },
    {
      icon: <Headset />,
      title: 'IT User Support',
      description:
        'Technical assistance, troubleshooting, and user training for IT systems.',
    },
    {
      icon: <Laptop />,
      title: 'School Management',
      description:
        'Sales and setup of school management and e-learning software.',
    },
    {
      icon: <Paintbrush />,
      title: 'Graphics Design',
      description:
        'Professional presentations, flyers, banners, and graphic design services.',
    },
    {
      icon: <Code />,
      title: 'Web Development',
      description:
        'Custom websites, web apps, and online solutions for your business.',
    },
    {
      icon: <BookOpen />,
      title: 'Student Research Companion',
      description:
        'Comprehensive research assistance including project topics, materials, and 24/7 support from experienced academic writers.',
    },
    {
      icon: <Map />,
      title: 'Space Rentals & Delivery Services',
      description:
        'We connect students with verified rentals and provide local delivery services across Ibadan.',
    },
  ];

  export const cafeItems = [
    {
      icon: <CoffeeIcon />,
      title: 'Coffee & Tea',
      description: 'Freshly brewed coffee, herbal teas, and hot chocolate.',
    },
    {
      icon: <CookieIcon />,
      title: 'Pastries & Snacks',
      description: 'Croissants, meat pies, doughnuts, chin-chin, and more.',
    },
    {
      icon: <UtensilsIcon />,
      title: 'Meals',
      description: 'Rice dishes, noodles, and light meals for busy days.',
    },
    {
      icon: <GlassWaterIcon />,
      title: 'Cold Drinks',
      description: 'Soft drinks, bottled water, and fresh juices.',
    },
    {
      icon: <Star />,
      title: 'Daily Specials',
      description: 'Ask for our chef\'s special and combo offers.',
    },
    {
      icon: <Star />,
      title: 'Café Experience',
      description: 'Relax, work, or connect with others in our cozy cafe while enjoying our menu.',
    },
  ];
