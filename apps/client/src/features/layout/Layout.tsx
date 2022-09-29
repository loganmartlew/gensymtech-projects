import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mantine/core';
import Header from './Header';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Container>
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default Layout;
