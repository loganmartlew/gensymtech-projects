import { FC } from 'react';
import ConfirmationDialog from './ConfirmationDialog';

interface Props {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  entity: string;
}

const DeleteDialog: FC<Props> = ({ open, handleClose, onConfirm, entity }) => {
  return (
    <ConfirmationDialog
      open={open}
      handleClose={handleClose}
      onConfirm={onConfirm}
      title={`Delete ${entity}`}
      text={`Are you sure you want to delete the ${entity}? This action cannot be undone and will delete the data forever.`}
      color="red"
      confirmText={`Delete ${entity}`}
    />
  );
};

export default DeleteDialog;
