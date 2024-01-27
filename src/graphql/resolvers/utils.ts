import graphqlFields from 'graphql-fields';

import type { GraphQLResolveInfo } from 'graphql';

// Probably there is a better way to handle this 🤔
export const getSelectFields = <T extends Object>(
  info: GraphQLResolveInfo,
  excludedFields: (keyof T | string)[] = []
) => {
  const fields: Record<keyof T, {}> = graphqlFields(
    info,
    {},
    { excludedFields: excludedFields as string[] }
  );

  return Object.keys(fields).reduce((select: Record<keyof T, true>, field) => {
    select[field as keyof T] = true;

    return select;
  }, {} as Record<keyof T, true>);
};
