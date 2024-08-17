import { ReactNode } from 'react';
import AdminDashboard from '../pages/admin/AdminDashboard';
import CreateAdmin from '../pages/admin/CreateAdmin';
import CreateFaculty from '../pages/admin/CreateFaculty';
import CreateStudent from '../pages/admin/CreateStudent';
import { NavLink } from 'react-router-dom';

type TRoute = {
  path: string;
  element: ReactNode;
};

type TSidebar = {
  key: string;
  label: ReactNode;
  children?: TSidebar[];
};

export const adminPath = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'User Management',
    children: [
      {
        name: 'Create Admin',
        path: 'create-admin',
        element: <CreateAdmin />,
      },
      {
        name: 'Create Faculty',
        path: 'create-faculty',
        element: <CreateFaculty />,
      },
      {
        name: 'Create Student',
        path: 'create-student',
        element: <CreateStudent />,
      },
    ],
  },
  {
    name: 'Course Management',
    children: [
      {
        name: 'Offered Course',
        path: 'offered-course',
        element: <CreateAdmin />,
      },
    ],
  },
];

export const adminRoutes = adminPath.reduce((acc, item) => {
  if (item.children) {
    item.children.forEach(child => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  } else {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }

  return acc;
}, [] as TRoute[]);

// admin sidebarItem
export const sidebarItem = adminPath.reduce((acc, item) => {
  if (item.name && item.path) {
    acc.push({
      key: item.name,
      label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
    });
  } else if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map(child => ({
        key: child.name,
        label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
      })),
    });
  }

  return acc;
}, [] as TSidebar[]);



//! hard cored way
// export const adminPath = [
//   // {
//   //   index: true,
//   //   element: <AdminDashboard />,
//   // },
//   {
//     path: 'dashboard',
//     element: <AdminDashboard />,
//   },
//   {
//     path: 'create-student',
//     element: <CreateStudent />,
//   },
//   {
//     path: 'create-admin',
//     element: <CreateAdmin />,
//   },
//   {
//     path: 'create-faculty',
//     element: <CreateFaculty />,
//   },
// ];
