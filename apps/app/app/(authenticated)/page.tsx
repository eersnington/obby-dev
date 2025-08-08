import { auth } from '@repo/auth/server';
import { database } from '@repo/database';
import { page } from '@repo/database/schema';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Header } from './components/header';

const title = 'Acme Inc';
const description = 'My application.';

export const metadata: Metadata = {
  title,
  description,
};

const App = async () => {
  const pages = await database.select().from(page);
  const { orgId } = await auth();

  if (!orgId) {
    notFound();
  }

  return (
    <>
      <Header page="Data Fetching" pages={['Building Your Application']} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {pages.map((pageRow) => (
            <div
              className="aspect-video rounded-xl bg-muted/50"
              key={pageRow.id}
            >
              {pageRow.name}
            </div>
          ))}
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
};

export default App;
