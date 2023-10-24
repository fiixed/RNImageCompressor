/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  name: string;
  onPress?: () => void; 
}

const UtilityButtons: FC<Props> = ({name, onPress}): JSX.Element => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Icon name={name} style={styles.icon} />
    </Pressable>
  );
};

export default UtilityButtons;

const buttonDim = 45;
const styles = StyleSheet.create({
  button: {
    height: buttonDim,
    width: buttonDim,
    backgroundColor: 'white',
    borderRadius: buttonDim / 2,
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    color: '#6C9ADE',
  },
});
