import {FC} from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {}
const ImageEditor: FC<Props> = (): JSX.Element => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {},
});

export default ImageEditor;
