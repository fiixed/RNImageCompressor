import {FC} from 'react';
import {Linking} from 'react-native';
import ConfirmModal from './ConfirmModal';

interface Props {
  title: string;
  message: string;
  visible: boolean;
  onClose: () => void;
}

const PermissionWarning: FC<Props> = ({
  visible,
  title,
  message,
  onClose,
}): JSX.Element => {
  const handleOpenSettings = (): void => {
    onClose();
    Linking.openSettings();
  };

  return (
    <ConfirmModal
      visible={visible}
      primaryBtnTitle="Open Settings"
      dangerBtnTitle="I Will Not!"
      title={title}
      message={message}
      onDangerBtnPress={onClose}
      onPrimaryBtnPress={handleOpenSettings}
    />
  );
};

export default PermissionWarning;
