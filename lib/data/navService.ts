
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
        { href: '#blog', label: 'Blog' },
        { href: '#contact', label: 'Contact' },
    ],
    '/coophub': [
        { href: '/coophub', label: 'Home' },
        { href: '#features', label: 'Features' },
        { href: '#how-it-works', label: 'How It Works' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#contact', label: 'Contact' },
    ],
    '/smarttax': [
        { href: '/smarttax', label: 'Home' },
        { href: '#features', label: 'Features' },
        { href: '#compliance', label: 'Compliance' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#faq', label: 'FAQ' },
        { href: '#demo', label: 'Demo' },
    ],
    '/swiftwheel': [
        { href: '/swiftwheel', label: 'Home' },
        { href: '#services', label: 'Services' },
        { href: '#how-it-works', label: 'How It Works' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#contact', label: 'Contact' },
    ],
    '/techlift': [
        { href: '/techlift', label: 'Home' },
        { href: '#about', label: 'About Us' },
        { href: '#curriculum', label: 'Curriculum' },
        { href: '#outcomes', label: 'Career Outcomes' },
        { href: '#apply', label: 'How to Apply' },
        { href: '#contact', label: 'Contact' },
    ],
    '/trustfix': [
        { href: '/trustfix', label: 'Home' },
        { href: '#services', label: 'Services' },
        { href: '#why-choose-us', label: 'Why Choose Us' },
        { href: '#process', label: 'Our Process' },
        { href: '#contact', label: 'Contact' },
    ],
};

export const getNavItems = (pathname: string) => {
    if (pathname in navItems) {
        return navItems[pathname as keyof typeof navItems];
    }
    return navItems['/'];
};
