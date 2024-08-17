import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import { sidebarItem } from '../../routes/admin.routes';

const { Sider, Header, Content, Footer } = Layout;

// const items: MenuProps['items'] = [
//   {
//     key: 'Dashboard',
//     label: <NavLink to={'/admin'}>Dashboard</NavLink>,
//   },
//   {
//     key: 'User Management',
//     label: 'User Management',
//     children: [
//       {
//         key: 'Create Admin',
//         label: <NavLink to={'/admin/create-admin'}> Create Admin</NavLink>,
//       },
//       {
//         key: 'Create Faculty',
//         label: <NavLink to={'/admin/create-faculty'}> Create Faculty</NavLink>,
//       },
//       {
//         key: 'Create Student',
//         label: <NavLink to={'/admin/create-student'}> Create Student</NavLink>,
//       },
//     ],
//   },
// ];

const MainLayout = () => {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
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
          items={sidebarItem} //! menu item sidebar use dynamically
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          PH University ©{new Date().getFullYear()} Created by H4K1[\/]
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
