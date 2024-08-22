import { Button, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { logoutUser } from '../../redux/features/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';

const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sidebar />
      <Layout>
        <Header
          style={{
            padding: 0,
          }}
        >
          <Button type="default" onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        <Content
          style={{
            margin: '20px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {/*  dynamically show content */}
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
