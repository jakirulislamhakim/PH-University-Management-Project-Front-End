import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { TUserPath } from '../types';

type TSidebarItem =
  | {
      key: string;
      label: ReactNode;
      children?: TSidebarItem[];
    }
  | undefined;

const sidebarItemGenerator = (userPaths: TUserPath[], userBaseRole: string) => {
  const sidebarItem = userPaths.reduce((acc, item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${userBaseRole}/${item.path}`}>{item.name}</NavLink>,
      });
    } else if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child?.name,
              label: (
                <NavLink to={`/${userBaseRole}/${child.path}`}>{child.name}</NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, [] as TSidebarItem[]);

  return sidebarItem;
};

export default sidebarItemGenerator;
