import { Layout, Menu } from 'antd';
import { adminPath } from '../../routes/admin.routes';
import sidebarItemGenerator from '../../utils/sidebarItemGenerator';
import { facultyPath } from '../../routes/faculty.routes';
import { studentPath } from '../../routes/student.routes';
import { useAppSelector } from '../../redux/hooks';
import { currentUser } from '../../redux/features/auth/authSlice';

const { Sider } = Layout;

const USER_ROLE = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student',
};

const Sidebar = () => {
  const user = useAppSelector(currentUser);

  const role = user!.userRole;
  let sidebarItem;

  switch (role) {
    case USER_ROLE.ADMIN:
      sidebarItem = sidebarItemGenerator(adminPath, USER_ROLE.ADMIN);
      break;
    case USER_ROLE.FACULTY:
      sidebarItem = sidebarItemGenerator(facultyPath, USER_ROLE.FACULTY);
      break;
    case USER_ROLE.STUDENT:
      sidebarItem = sidebarItemGenerator(studentPath, USER_ROLE.STUDENT);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: '100vh', overflow: 'auto', position: 'sticky', top: '0px', left: '0px' }}
    >
      <div
        style={{
          color: 'white',
          height: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2> Ph University</h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={sidebarItem} //* menu item sidebar use dynamically by user role
      />
    </Sider>
  );
};

export default Sidebar;
