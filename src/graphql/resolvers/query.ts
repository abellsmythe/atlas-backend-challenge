import type { GraphQLResolveInfo } from 'graphql';
import type { Plan, Subscription } from '@prisma/client';

import { getSelectFields } from './utils';

import type { Context } from '../context';

// Couldn't find a proper typing for the Query resolvers
//  - parent
//  - args
//  - contextValue
//  - info
export const queryResolver = {
  plans: (
    _parent: unknown,
    _args: unknown,
    context: Context,
    info: GraphQLResolveInfo
  ) =>
    // Probably there is a better way to structure this, maybe instead of getting
    // the raw prisma client we could get a service or something similar, that
    // wraps the query logic, just to avoid having that logic here
    context.prisma.plan.findMany({
      select: getSelectFields<Plan>(info),
      where: { deletedAt: null },
    }),
  subscriptions: (
    _parent: unknown,
    args: { customerId: number },
    context: Context,
    info: GraphQLResolveInfo
  ) =>
    // Probably there is a better way to structure this, maybe instead of getting
    // the raw prisma client we could get a service or something similar, that
    // wraps the query logic, just to avoid having that logic here
    context.prisma.subscription.findMany({
      select: getSelectFields<Subscription>(info),
      where: { customerId: args.customerId, deletedAt: null },
    }),
};
