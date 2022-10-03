import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Container, Title, Group, Text, Button } from '@mantine/core';
import { useAuth } from '../auth/authContext';
import LoginModal from '../auth/LoginModal';
import { ApiError } from '@gensymtech-projects/errors';
import { showNotification } from '@mantine/notifications';
import { IconExclamationMark } from '@tabler/icons';

const StyledHeader = styled.header`
  border-bottom: thin solid ${({ theme }) => theme.colors['gray'][3]};
  background-color: ${({ theme }) =>
    theme.colorScheme === 'dark' ? theme.colors['dark'][9] : theme.white};
`;

const Header: FC = () => {
  const [loginModalOpened, setLoginModalOpened] = useState<boolean>(false);
  const { user, login, logout } = useAuth();

  const handleLogin = (email: string, password: string) => {
    try {
      login(email, password);
    } catch (error) {
      if (error instanceof ApiError) {
        showNotification({
          title: 'Error logging in',
          message: !error.message
            ? 'Failed to log in'
            : `${error.errorCode}: ${error.message}`,
          color: 'red',
          icon: <IconExclamationMark size={16} />,
        });
      }

      showNotification({
        title: 'Error logging in',
        message: 'Failed to log in',
        color: 'red',
        icon: <IconExclamationMark size={16} />,
      });
    }
  };

  return (
    <StyledHeader>
      <Container sx={{ paddingBlock: 15 }}>
        <Group align="center" position="apart">
          <Link to="/">
            <Title order={1}>GensymTech Projects</Title>
          </Link>

          <Group align="center">
            {user && <Text>{user.email}</Text>}
            {user ? (
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            ) : (
              <>
                <Button onClick={() => setLoginModalOpened(true)}>Login</Button>
                <LoginModal
                  open={loginModalOpened}
                  handleClose={() => setLoginModalOpened(false)}
                  onConfirm={handleLogin}
                />
              </>
            )}
          </Group>
        </Group>
      </Container>
    </StyledHeader>
  );
};

export default Header;
