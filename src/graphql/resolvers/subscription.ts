import type { GraphQLResolveInfo } from 'graphql';
import type { Subscription } from '@prisma/client';

import type { Context } from '../context';

export const subscriptionResolver = {
  plan: (
    parent: Subscription,
    _args: unknown,
    context: Context,
    _info: GraphQLResolveInfo
  ) =>
  // There must be a way to extract the selected fields instead of query the whole row
    context.prisma.plan.findFirst({
      where: { id: parent.planId, deletedAt: null },
    }),
};
