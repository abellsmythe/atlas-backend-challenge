import { queryResolver } from './query';
import { subscriptionResolver } from './subscription';

export const resolvers = {
  Query: queryResolver,
  Subscription: subscriptionResolver,
};
