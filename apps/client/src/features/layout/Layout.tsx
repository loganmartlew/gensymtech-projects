import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mantine/core';
import Header from './Header';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Container sx={{ paddingTop: 20 }}>
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default Layout;
