import { withAuth } from '@repo/auth/server';
import { database, sql } from '@repo/database';
import { page } from '@repo/database/schema';
import { notFound, redirect } from 'next/navigation';
import { Header } from '../components/header';

type SearchPageProperties = {
  searchParams: Promise<{
    q: string;
  }>;
};

export const generateMetadata = async ({
  searchParams,
}: SearchPageProperties) => {
  const { q } = await searchParams;

  return {
    title: `${q} - Search results`,
    description: `Search results for ${q}`,
  };
};

const SearchPage = async ({ searchParams }: SearchPageProperties) => {
  const { q } = await searchParams;
  const pages = await database
    .select()
    .from(page)
    .where(sql`${page.name} like ${`%${q}%`}`);

  const { organizationId } = await withAuth({ ensureSignedIn: true });

  if (!organizationId) {
    notFound();
  }

  if (!q) {
    redirect('/');
  }

  return (
    <>
      <Header page="Search" pages={['Building Your Application']} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {pages.map((p) => (
            <div className="aspect-video rounded-xl bg-muted/50" key={p.id}>
              {p.name}
            </div>
          ))}
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
};

export default SearchPage;
