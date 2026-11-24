export function getSafeRedirectPath(candidate: string | undefined): string {
    if (!candidate || !candidate.startsWith('/') || candidate.startsWith('//') || candidate.includes('\\')) {
        return '/';
    }

    try {
        const destination = new URL(candidate, 'https://olowo.invalid');
        if (destination.origin !== 'https://olowo.invalid') return '/';
        return `${destination.pathname}${destination.search}${destination.hash}`;
    } catch {
        return '/';
    }
}
