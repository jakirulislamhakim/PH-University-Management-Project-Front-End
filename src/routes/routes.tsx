import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import { routesGenerator } from '../utils/routesGenerator';
import { adminPath } from './admin.routes';
import { facultyPath } from './faculty.routes';
import { studentPath } from './student.routes';
import Register from '../pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <App />,
    children: routesGenerator(adminPath),
  },
  {
    path: '/faculty',
    element: <App />,
    children: routesGenerator(facultyPath),
  },
  {
    path: '/student',
    element: <App />,
    children: routesGenerator(studentPath),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;
