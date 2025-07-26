import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <div className="relative">
      <div className="absolute bottom-5 left-9">
        <p className="text-sm">
          Made with 💙 by{' '}
          <Link className="hover:underline" href="https://www.workos.com">
            WorkOS
          </Link>
        </p>
      </div>
      <div className="absolute right-9 bottom-5">
        <Link href="https://github.com/workos/b2b-starter-kit">
          <Image
            alt="Find on GitHub"
            height={24}
            src="/logos/github_logo.svg"
            width={24}
          />
        </Link>
      </div>
    </div>
  );
}
