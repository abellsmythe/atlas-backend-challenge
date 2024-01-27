import type { GraphQLResolveInfo } from 'graphql';
import type { User, Customer } from '@prisma/client';

import { getSelectFields } from './utils';

import type { Context } from '../context';

export const customerResolver = {
  user: (
    parent: Customer,
    _args: unknown,
    context: Context,
    info: GraphQLResolveInfo
  ) =>
    context.prisma.user.findFirst({
      select: getSelectFields<User>(info),
      where: { id: parent.userId, deletedAt: null },
    }),
};
