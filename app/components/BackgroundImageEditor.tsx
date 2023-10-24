/* eslint-disable prettier/prettier */
import {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface Props {}

const BackgroundImageEditor: FC<Props> = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={require('../source/background.png')} style={styles.backgroundImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    opacity: 0.1
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  }
});

export default BackgroundImageEditor;
