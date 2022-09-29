import { MantineProvider } from '@mantine/core';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      {children}
    </MantineProvider>
  );
};

export default Providers;
