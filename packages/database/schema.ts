import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const page = pgTable('page', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
});
