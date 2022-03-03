import React from 'react'
import { Layout, Menu} from 'antd';
import { useRouter } from 'next/router';

const { Header, Content, Footer } = Layout;

export default function MainLayout(props) {
  const router = useRouter()

  const goTo = (path) => {
    router.push(path)
  }
  
  return (
    <Layout className="layout">
      <Header style={{
        minHeight: 60
      }}>
        <div className='logo'>LAWENCON</div>
        <Menu theme="dark" mode="horizontal" style={{
          float: 'right',
        }}>
          <Menu.Item key={"1"} onClick={() => goTo('/')}>Home</Menu.Item>
          <Menu.Item key={"2"} onClick={() => goTo('/coin')}>Coin</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©{ new Date().getFullYear() } Created by Waney Mamahit (Nusantara Software Engineer)</Footer>
    </Layout>
  )
}
