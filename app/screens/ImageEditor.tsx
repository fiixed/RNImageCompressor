/* eslint-disable prettier/prettier */
import {FC, useState, useEffect, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  EventListenerCallback,
  EventMapBase,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import ImageEditorHeader from '../components/ImageEditorHeader';
import BackgroundImageEditor from '../components/BackgroundImageEditor';
import SelectedImage from '../components/SelectedImage';
import EditorTools from '../components/EditorTools';
import {
  selectAndCropImageFromCamera,
  selectAndCropImageFromDevice,
} from '../utils/imageSelector';
import ConfirmModal from '../components/ConfirmModal';
import fsModule from '../modules/fsModule';
import {convertSizeInKb} from '../utils/helper';

type RouteProps = StackScreenProps<RootStackParamList, 'ImageEditor'>;

interface Props {
  route: RouteProps['route'];
}

let canGoBack = false;

const ImageEditor: FC<Props> = ({route}): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [fileSize, setFileSize] = useState<number>(0);
  const [compressValue, setCompressValue] = useState<number>(1);
  const [compressedPercentage, setCompressedPercentage] = useState<number>(100);
  const {imageUri} = route.params;

  const displayConfirmModal = (): void => setShowConfirmModal(true);
  const hideConfirmModal = (): void => setShowConfirmModal(false);

  const handleCaptureAnotherImage = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromCamera();
    if (error) return console.log(error);
    setSelectedImage(path);
  };

  const handleSelectAnotherImage = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromDevice();
    if (error) return console.log(error);

    setSelectedImage(path);
  };

  const preventBack = (e: any) => {
    if (canGoBack) return;

    e.preventDefault();
    displayConfirmModal();
  };

  const getImageSize = async (): Promise<void> => {
    const uri: string = imageUri.split('file:///')[1];
    const size = await fsModule.getSize(uri);
    setFileSize(convertSizeInKb(size));
  };

  // compressing image
  const handleImageCompress = async (value: number): Promise<void> => {
    const compressValue: number = Math.floor(value * 100);
    const uri: string = imageUri.split('file:///')[1];

    const res = await fsModule.compressImage(uri, compressValue);
    setCompressedPercentage(Math.round(value * 100));
  };

  // Handling Back Press Manually
  const handleMoveToBackScreen = (): void => {
    canGoBack = true;
    setShowConfirmModal(false);
    navigation.goBack();
  };

  const updateCompressValue = (value: number): void => setCompressValue(value);

  // Handling the back press
  useEffect(() => {
    navigation.addListener('beforeRemove', preventBack);
    return () => {
      navigation.removeListener('beforeRemove', preventBack);
      canGoBack = false;
    };
  }, [canGoBack]);

  useEffect(() => {
    getImageSize();
  }, []);

  return (
    <View style={styles.container}>
      <ImageEditorHeader />
      <BackgroundImageEditor />
      <View style={styles.imageContainer}>
        <SelectedImage uri={selectedImage || imageUri} />
      </View>
      <EditorTools
        compressValue={compressValue}
        compressedPercentage={compressedPercentage}
        fileSize={fileSize}
        onCaptureAnother={handleCaptureAnotherImage}
        onSelectAnother={handleSelectAnotherImage}
        onSliderChange={handleImageCompress}
        onSlidingComplete={updateCompressValue}
      />
      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure!"
        message="Are you sure because this action will discard all your changes."
        onCancelPress={hideConfirmModal}
        onDiscardPress={handleMoveToBackScreen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageEditor;
