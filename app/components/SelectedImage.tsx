import {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface Props {
  uri: string;
}

const SelectedImage: FC<Props> = ({uri}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={{uri: uri}} style={styles.image} />
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
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default SelectedImage;
