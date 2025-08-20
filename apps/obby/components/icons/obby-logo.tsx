import Image from 'next/image';

type Props = {
  className?: string;
};

export function ObbyLogo({ className }: Props) {
  return (
    <Image
      alt="Obby Logo"
      className={className}
      height={24}
      src="/obby-logo-min.webp"
      width={24}
    />
  );
}
