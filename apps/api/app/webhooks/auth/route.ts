import { analytics } from '@repo/analytics/posthog/server';
import {
  type Organization,
  type OrganizationMembership,
  type User,
  WorkOS,
} from '@repo/auth/server';
import { log } from '@repo/observability/log';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { env } from '@/env';

const workos = new WorkOS(env.WORKOS_API_KEY);

const handleUserCreated = (data: User) => {
  analytics.identify({
    distinctId: data.id,
    properties: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      createdAt: new Date(data.createdAt),
      avatar: data.profilePictureUrl,
      // phoneNumber: data.phoneNumber, // WorkOS does not support phone numbers
    },
  });

  analytics.capture({
    event: 'User Created',
    distinctId: data.id,
  });

  return new Response('User created', { status: 201 });
};

const handleUserUpdated = (data: User) => {
  analytics.identify({
    distinctId: data.id,
    properties: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      createdAt: data.createdAt,
      avatar: data.profilePictureUrl,
      // phoneNumber: data.phoneNumber, // WorkOS does not support phone numbers
    },
  });

  analytics.capture({
    event: 'User Updated',
    distinctId: data.id,
  });

  return new Response('User updated', { status: 201 });
};

const handleUserDeleted = (data: User) => {
  if (data.id) {
    analytics.identify({
      distinctId: data.id,
      properties: {
        deleted: new Date(),
      },
    });

    analytics.capture({
      event: 'User Deleted',
      distinctId: data.id,
    });
  }

  return new Response('User deleted', { status: 201 });
};

const handleOrganizationCreated = (data: Organization) => {
  analytics.groupIdentify({
    groupKey: data.id, // Organization ID is the group key
    groupType: 'company',
    // distinctId: eventId,
    properties: {
      name: data.name,
      // avatar: data.image_url, // WorkOS organizations do not have an image_url
    },
  });

  // WorkOS Organizations do not have a user associated to the creation of the organization
  // if (data.created_by) {
  //   analytics.capture({
  //     event: 'Organization Created',
  //     distinctId: data.created_by,
  //   });
  // }

  return new Response('Organization created', { status: 201 });
};

const handleOrganizationUpdated = (data: Organization) => {
  analytics.groupIdentify({
    groupKey: data.id, // Organization ID is the group key
    groupType: 'company',
    // distinctId: eventId,
    properties: {
      name: data.name,
      // avatar: data.image_url, // WorkOS organizations do not have an image_url
    },
  });

  // WorkOS Organizations do not have a user associated to the creation of the organization
  // if (data.created_by) {
  //   analytics.capture({
  //     event: 'Organization Updated',
  //     distinctId: data.created_by,
  //   });
  // }

  return new Response('Organization updated', { status: 201 });
};

const handleOrganizationMembershipCreated = (data: OrganizationMembership) => {
  analytics.groupIdentify({
    groupKey: data.id,
    groupType: 'company',
    distinctId: data.userId,
  });

  analytics.capture({
    event: 'Organization Member Created',
    distinctId: data.userId,
  });

  return new Response('Organization membership created', { status: 201 });
};

const handleOrganizationMembershipDeleted = (data: OrganizationMembership) => {
  // Need to unlink the user from the group

  analytics.capture({
    event: 'Organization Member Deleted',
    distinctId: data.userId,
  });

  return new Response('Organization membership deleted', { status: 201 });
};

export const POST = async (request: Request): Promise<Response> => {
  if (!env.WORKOS_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Not configured', ok: false });
  }

  // Get the headers
  const headerPayload = await headers();
  const sigHeader = headerPayload.get('workos-signature');

  // If there are no headers, error out
  if (!sigHeader) {
    return new Response('Error occured -- no workos headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = (await request.json()) as object;

  const webhook = await workos.webhooks.constructEvent({
    payload,
    sigHeader,
    secret: env.WORKOS_WEBHOOK_SECRET,
  });

  log.info('Webhook', { webhook });

  const { data, event: eventType } = webhook;

  let response: Response = new Response('', { status: 201 });

  switch (eventType) {
    case 'user.created': {
      response = handleUserCreated(data);
      break;
    }
    case 'user.updated': {
      response = handleUserUpdated(data);
      break;
    }
    case 'user.deleted': {
      response = handleUserDeleted(data);
      break;
    }
    case 'organization.created': {
      response = handleOrganizationCreated(data);
      break;
    }
    case 'organization.updated': {
      response = handleOrganizationUpdated(data);
      break;
    }
    case 'organization_membership.created': {
      response = handleOrganizationMembershipCreated(data);
      break;
    }
    case 'organization_membership.deleted': {
      response = handleOrganizationMembershipDeleted(data);
      break;
    }
    default: {
      break;
    }
  }

  await analytics.shutdown();

  return response;
};
