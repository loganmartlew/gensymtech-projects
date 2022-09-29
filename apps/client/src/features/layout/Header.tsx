import { FC } from 'react';
import styled from '@emotion/styled';
import { Container, Title } from '@mantine/core';

const StyledHeader = styled.header`
  border-bottom: thin solid ${({ theme }) => theme.colors['gray'][2]};
`;

const Header: FC = () => {
  return (
    <StyledHeader>
      <Container sx={{ paddingBlock: 15 }}>
        <Title order={1}>GensymTech Projects</Title>
      </Container>
    </StyledHeader>
  );
};

export default Header;
