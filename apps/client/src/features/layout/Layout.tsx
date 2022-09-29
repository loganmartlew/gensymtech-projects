import { FC } from 'react';
import { Container } from '@mantine/core';
import Header from './Header';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Container>
        <main>content</main>
      </Container>
    </>
  );
};

export default Layout;
