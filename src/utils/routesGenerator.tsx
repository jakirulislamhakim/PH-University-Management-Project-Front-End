import { ReactNode } from 'react';
import { TUserPath } from '../types';

type TRoute = {
  path: string;
  element: ReactNode;
};

export const routesGenerator = (userPaths: TUserPath[]) => {
  const routes = userPaths.reduce((acc, item) => {
    if (item.children) {
      item.children.forEach(child => {
        acc.push({
          path: child.path as string,
          element: child.element,
        });
      });
    } else {
      acc.push({
        path: item.path as string,
        element: item.element,
      });
    }

    return acc;
  }, [] as TRoute[]);

  return routes;
};
