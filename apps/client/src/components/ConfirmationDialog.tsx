import { FC } from 'react';
import {
  Modal,
  Stack,
  Text,
  Group,
  Button,
  useMantineTheme,
} from '@mantine/core';

interface Props {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  title: string;
  text: string;
  color?: string;
  confirmText?: string;
}

const ConfirmationDialog: FC<Props> = ({
  open,
  handleClose,
  onConfirm,
  title,
  text,
  color,
  confirmText,
}) => {
  const theme = useMantineTheme();

  const close = () => {
    handleClose();
  };

  const confirm = () => {
    onConfirm();
    close();
  };

  return (
    <Modal opened={open} onClose={close} title={title} centered>
      <Stack spacing={theme.spacing.xs}>
        <Text size="sm">{text}</Text>
        <Group spacing={theme.spacing.xs} position="right">
          <Button onClick={close} variant="outline">
            Cancel
          </Button>
          <Button onClick={confirm} color={color}>
            {confirmText || 'Confirm'}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ConfirmationDialog;
