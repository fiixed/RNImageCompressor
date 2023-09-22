import {FC} from 'react';
import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LargeIconButton from '../components/LargeIconButton';

interface Props {}
const Home: FC<Props> = (): JSX.Element => {
  const handleImageCapture = async (): Promise<void> => {
    console.log('====================================');
    console.log('test');
    console.log('====================================');
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Choose Your Image</Text>
        <Text style={styles.secondaryText}>
          You can select your image using one of these option which you want to
          convert to passport size.
        </Text>
      </View>
      {/* Image Capture button */}
      <LargeIconButton onPress={handleImageCapture} title="Capture">
        <Icon name="camera" />
      </LargeIconButton>
      {/* Image Select Button */}
      <LargeIconButton title="Select">
        <Icon name="folder-open" />
      </LargeIconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
  },
  title: {
    fontSize: 25,
    color: '#272727',
    fontWeight: '500',
    textAlign: 'center',
  },
  secondaryText: {
    color: '#272727',
    textAlign: 'center',
    opacity: 0.5,
    lineHeight: 20,
    paddingTop: 5,
  },
});

export default Home;
