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

        a: {
          color: 'inherit',
          textDecoration: 'none',
        },

        'ul, ol': {
          margin: 0,
          padding: 0,
          listStyle: 'none',
        },
      })}
    />
  );
};

export default GlobalStyles;
