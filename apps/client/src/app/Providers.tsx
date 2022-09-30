import { MantineProvider } from '@mantine/core';
import { FC, ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default Providers;
