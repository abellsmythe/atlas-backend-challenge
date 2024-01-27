import { customerResolver } from './customer';
import { queryResolver } from './query';
import { subscriptionResolver } from './subscription';

export const resolvers = {
  Customer: customerResolver,
  Query: queryResolver,
  Subscription: subscriptionResolver, 
};
