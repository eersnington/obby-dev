import { Search } from 'lucide-react';

import { Label } from 'components/ui/label';
import { SidebarInput } from 'components/ui/sidebar';

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
  return (
    <form {...props}>
      <div className="relative">
        <Label className="sr-only" htmlFor="search">
          Search
        </Label>
        <SidebarInput
          className="h-8 pl-7"
          id="search"
          placeholder="Type to search..."
        />
        <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2 size-4 select-none opacity-50" />
      </div>
    </form>
  );
}
