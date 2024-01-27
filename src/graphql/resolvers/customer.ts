import type { GraphQLResolveInfo } from 'graphql';
import type { Customer } from '@prisma/client';

import type { Context } from '../context';

export const customerResolver = {
  user: (
    parent: Customer,
    _args: unknown,
    context: Context,
    _info: GraphQLResolveInfo
  ) =>
    // There must be a way to extract the selected fields instead of query the whole row
    context.prisma.user.findFirst({
      where: { id: parent.userId, deletedAt: null },
    }),
};
