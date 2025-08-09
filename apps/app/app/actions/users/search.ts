'use server';

import { getWorkOS, type User, withAuth } from '@repo/auth/server';
import Fuse from 'fuse.js';

const getName = (user: User): string => {
  let name = user.firstName;

  if (name && user.lastName) {
    name = `${name} ${user.lastName}`;
  } else if (!name) {
    name = user.email;
  }

  return name;
};

export const searchUsers = async (
  query: string
): Promise<
  | {
      data: string[];
    }
  | {
      error: unknown;
    }
> => {
  try {
    const { user } = await withAuth();

    if (!user) {
      throw new Error('Not logged in');
    }

    const workos = getWorkOS();

    const usersResponse = await workos.userManagement.listUsers();

    const users = usersResponse.data.map((u) => ({
      id: u.id,
      name: getName(u),
      imageUrl: u.profilePictureUrl,
    }));

    const fuse = new Fuse(users, {
      keys: ['name'],
      minMatchCharLength: 1,
      threshold: 0.3,
    });

    const results = fuse.search(query);
    const data = results.map((result) => result.item.id);

    return { data };
  } catch (error) {
    return { error };
  }
};
