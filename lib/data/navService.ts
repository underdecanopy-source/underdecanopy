
export const navItems = {
    '/': [
        { href: '/', label: 'Home' },
        { href: '#services', label: 'Our Core Services' },
        { href: '#additional', label: 'Professional Services' },
        { href: '#cafe', label: 'Cafe Experience' },
        { href: '#podcast', label: 'Podcast' },
        { href: '#contact', label: 'Contact' },
    ],
    '/applysmart': [
        { href: '/applysmart', label: 'Home' },
        { href: '#how-it-works', label: 'How It Works' },
        { href: '#admission-calculator', label: 'Admission Calculator' },
        { href: '#scholarships', label: 'Scholarships' },
        { href: '/applysmart/blog', label: 'Blog' },
        { href: '#contact', label: 'Contact' },
    ],
    '/applysmart/blog': [
        { href: '/applysmart', label: 'Home' },
        { href: '/applysmart#how-it-works', label: 'How It Works' },
        { href: '/applysmart#admission-calculator', label: 'Admission Calculator' },
        { href: '/applysmart#scholarships', label: 'Scholarships' },
        { href: '/applysmart/blog', label: 'Blog' },
        { href: '/applysmart#contact', label: 'Contact' },
    ],
    '/coophub': [
        { href: '/coophub', label: 'Home' },
        { href: '#products', label: 'Products' },
        { href: '#features', label: 'Features' },
        { href: '#how-it-works', label: 'How It Works' },
        { href: '#get-started', label: 'Get Started' },
    ],
    '/smarttax': [
        { href: '/smarttax', label: 'Home' },
        { href: '#features', label: 'Features' },
        { href: '#compliance', label: 'Compliance' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#faq', label: 'FAQ' },
        { href: '#demo', label: 'Demo' },
    ],
    '/naijapolis': [
        { href: '/naijapolis', label: 'Home' },
        { href: '#features', label: 'Features' },
        { href: '#analytics', label: 'Analytics' },
        { href: '#contact', label: 'Contact' },
        { href: '/naijapolis/demo', label: 'Demo' },
    ],
    '/naijapolis/demo': [
        { href: '/naijapolis', label: 'NaijaPolis' },
        { href: '/naijapolis#features', label: 'Features' },
        { href: '/naijapolis#analytics', label: 'Analytics' },
        { href: '/naijapolis#contact', label: 'Contact' },
        { href: '/naijapolis/demo', label: 'Demo' },
    ],
    '/swiftwheel': [
        { href: '/swiftwheel', label: 'Home' },
        { href: '#services', label: 'Services' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#faq', label: 'FAQ' },
        { href: '#contact', label: 'Contact' },
    ],
    '/techlift': [
        { href: '/techlift', label: 'Home' },
        { href: '#about', label: 'Why Choose Us' },
        { href: '#courses', label: 'Courses' },
        { href: '#testimonials', label: 'Success Stories' },
        { href: '#contact', label: 'Contact' },
    ],
    '/trustfix': [
        { href: '/trustfix', label: 'Home' },
        { href: '#services', label: 'Our Services' },
        { href: '#how-it-works', label: 'How It Works' },
        { href: '#technicians', label: 'For Technicians' },
        { href: '#contact-form', label: 'Contact' },
    ],
};

export const getNavItems = (pathname: string) => {
    if (pathname in navItems) {
        return navItems[pathname as keyof typeof navItems];
    }
    return navItems['/'];
};
