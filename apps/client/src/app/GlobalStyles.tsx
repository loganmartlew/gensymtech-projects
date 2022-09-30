import { FC } from 'react';
import { Global } from '@mantine/core';

const GlobalStyles: FC = () => {
  return (
    <Global
      styles={(theme) => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },

        body: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors['dark'][7]
              : theme.colors['gray'][1],
        },
      })}
    />
  );
};

export default GlobalStyles;
