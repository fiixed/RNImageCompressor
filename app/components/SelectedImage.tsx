import {FC, ReactNode} from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface Props {
  uri: string;
  children?: ReactNode;
}

const SelectedImage: FC<Props> = ({uri, children}): JSX.Element | null => {
  if (!uri) {
    return null;
  }
  return (
    <View style={styles.container}>
      {children || <Image source={{uri: uri}} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 206,
    height: 265,
    backgroundColor: 'white',
    elevation: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default SelectedImage;
