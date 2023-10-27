import React, {FC} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

interface Props {
  visible?: boolean;
  title?: string;
  message?: string;
  dangerBtnTitle: string;
  primaryBtnTitle: string;
  onPrimaryBtnPress?: () => void;
  onDangerBtnPress?: () => void;
}

const ConfirmModal: FC<Props> = ({
  visible,
  title,
  message,
  primaryBtnTitle,
  dangerBtnTitle,
  onPrimaryBtnPress,
  onDangerBtnPress,
}): JSX.Element => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          <View style={styles.btnContainer}>
            <Pressable
              onPress={onPrimaryBtnPress}
              style={[styles.commonBtnStyle, styles.cancel]}>
              <Text style={{color: '#6C9ADE'}}>{primaryBtnTitle}</Text>
            </Pressable>

            <Pressable
              onPress={onDangerBtnPress}
              style={[styles.commonBtnStyle, styles.discard]}>
              <Text style={styles.discardTitle}>{dangerBtnTitle}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '85%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 7,
  },
  modalTitle: {
    fontWeight: '500',
    fontSize: 18,
    color: '#6C9ADE',
  },
  message: {
    color: '#272727',
    opacity: 0.8,
    lineHeight: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  commonBtnStyle: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  cancel: {
    borderWidth: 1.5,
    borderColor: '#6C9ADE',
  },
  discard: {
    backgroundColor: '#F53649',
    marginLeft: 15,
  },
  discardTitle: {
    color: 'white',
  },
});

export default ConfirmModal;
