import type { GraphQLResolveInfo } from 'graphql';
import type { Customer, Plan, Subscription } from '@prisma/client';

import { getSelectFields } from './utils';

import type { Context } from '../context';

export const subscriptionResolver = {
  customer: (
    parent: Subscription,
    _args: unknown,
    context: Context,
    info: GraphQLResolveInfo
  ) => (
    context.prisma.customer.findFirst({
      select: getSelectFields<Customer>(info, ['user']),
      where: { id: parent.customerId, deletedAt: null },
    })
  ),
  plan: (
      parent: Subscription,
      _args: unknown,
      context: Context,
      info: GraphQLResolveInfo
  ) => context.prisma.plan.findFirst({
    select: getSelectFields<Plan>(info),
    where: { id: parent.planId, deletedAt: null },
  }),
};
