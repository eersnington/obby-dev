import { Header } from '../header';
import { Pricing } from './pricing';

export default function Page() {
  return (
    <div className="min-h-screen bg-background p-2">
      <Header className="flex w-full items-center" />
      <main>
        <Pricing />
      </main>
    </div>
  );
}
