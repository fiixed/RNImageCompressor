import {FC} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  name: string;
  title: string;
  onPress?: () => void;
}

const SelectorButton: FC<Props> = ({name, title, onPress}): JSX.Element => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Icon style={styles.btnIcon} name={name} />
      <Text style={styles.btnLabel}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C9ADE',
    padding: 10,
    borderRadius: 5,
  },
  btnLabel: {
    color: 'white',
  },
  btnIcon: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
});

export default SelectorButton;
