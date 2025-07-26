import { Header } from 'components/app-layout/header';
import { LowProfileFooter } from 'components/landing/low-profile-footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {children}
      <LowProfileFooter />
    </div>
  );
}
