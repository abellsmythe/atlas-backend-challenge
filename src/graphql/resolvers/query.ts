import type { Context } from '../context';

// Couldn't find a proper typing for the Query resolvers
//  - parent
//  - args
//  - contextValue
//  - info
export const queryResolver = {
  plans: (_parent: unknown, _args: unknown, context: Context) =>
    // Probably there is a better way to structure this, maybe instead of getting
    // the raw prisma client we could get a service or something similar, that
    // wraps the query logic, just to avoid having that logic here
    context.prisma.plan.findMany({ where: { deletedAt: null } }),
  subscriptions: (_parent: unknown, _args: unknown) => [],
};
