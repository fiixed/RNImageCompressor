/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import {FC} from 'react';
import {StyleSheet, Text, View, NativeModules} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import {NavigationProp} from '@react-navigation/native';

import LargeIconButton from '../components/LargeIconButton';
import {
  selectAndCropImageFromCamera,
  selectAndCropImageFromDevice,
} from '../utils/imageSelector';
import {RootStackParamList} from '../navigation/AppNavigator';
import fsModule from '../modules/fsModule';

interface Props {
  navigation: NavigationProp<RootStackParamList>;
}



const Home: FC<Props> = ({navigation}): JSX.Element => {
  const navigateToImageEditor = (uri: string): void => {
    navigation.navigate('ImageEditor', {imageUri: uri});
  };

  const handleImageCapture = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromCamera();
    if (error) return console.log(error);
    navigateToImageEditor(path);
  };

  const handleImageSelection = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromDevice();
    if (error) return console.log(error);
    navigateToImageEditor(path);
  };

  // const handleOnPress = async (): Promise<void> => {
  //   try {
  //     const message = await fsModule.justGreetMe('Andrew');
  //     console.log(message);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text  style={styles.title}>Choose Your Image</Text>
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
      <LargeIconButton onPress={handleImageSelection} title="Select">
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
