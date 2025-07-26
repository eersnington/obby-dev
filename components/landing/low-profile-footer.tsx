import Link from 'next/link';

const footerLinks = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Refund', href: '/refund' },
  {
    label: 'GitHub',
    href: 'https://github.com/eersnington/obby-dev',
    newTab: true,
  },
];

export function LowProfileFooter() {
  return (
    <footer className="mt-auto pt-8 pb-6">
      <div className="flex items-center justify-center">
        <nav className="flex items-center gap-1 text-muted-foreground text-sm">
          {footerLinks.map((link, index) => (
            <div className="flex items-center gap-1" key={link.href}>
              {link.newTab ? (
                <a
                  className="rounded-md px-2 py-1 transition-colors hover:bg-accent/50 hover:text-foreground"
                  href={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  className="rounded-md px-2 py-1 transition-colors hover:bg-accent/50 hover:text-foreground"
                  href={link.href}
                >
                  {link.label}
                </Link>
              )}
              {index < footerLinks.length - 1 && (
                <span className="text-muted-foreground/50">|</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
