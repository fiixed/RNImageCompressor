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
import BusyLoading from '../components/BusyLoading';

type RouteProps = StackScreenProps<RootStackParamList, 'ImageEditor'>;

interface Props {
  route: RouteProps['route'];
}

let canGoBack = false;

const ImageEditor: FC<Props> = ({route}): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [compressedImage, setCompressedImage] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(false);
  const [fileSize, setFileSize] = useState<number>(0);
  const [compressValue, setCompressValue] = useState<number>(1);
  const [compressedPercentage, setCompressedPercentage] = useState<number>(100);
  const {imageUri} = route.params;

  const resetActivity = (): void => {
    setCompressValue(1);
    setCompressedPercentage(100);
    setCompressedImage('');
  };

  const displayConfirmModal = (): void => setShowConfirmModal(true);
  const hideConfirmModal = (): void => setShowConfirmModal(false);

  const handleCaptureAnotherImage = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromCamera();
    if (error) return console.log(error);
    resetActivity();
    getImageSize(path);
    setSelectedImage(path);
  };

  const handleSelectAnotherImage = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromDevice();
    if (error) return console.log(error);
    resetActivity();
    getImageSize(path);
    setSelectedImage(path);
  };

  const preventBack = (e: any) => {
    if (canGoBack) return;

    e.preventDefault();
    displayConfirmModal();
  };

  const getImageSize = async (imageUri: string): Promise<void> => {
    const uri: string = imageUri.split('file:///')[1];
    const size = await fsModule.getSize(uri);
    setFileSize(convertSizeInKb(size));
  };

  // compressing image
  const handleImageCompress = async (value: number): Promise<void> => {
    const compressValue: number = Math.floor(value * 100);
    const uri: string = selectedImage.split('file:///')[1];

    setBusy(true);
    const res = await fsModule.compressImage(uri, compressValue);
    setBusy(false);
    setCompressedImage(`file:///${res.uri}`);

    setFileSize(convertSizeInKb(res.size));
    setCompressedPercentage(Math.round(value * 100));
  };

  const handleImageSave = async (): Promise<void> => {
    try {
      const name = `pp-${Date.now()}`;
      const desiredCompressValue: number = Math.floor(compressValue * 100);
      const uri: string = compressedImage.split('file:///')[1];
      const res = await fsModule.saveImageToDevice(
        uri,
        name,
        desiredCompressValue,
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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
    if (imageUri && !selectedImage) {
      setSelectedImage(imageUri);
      getImageSize(imageUri);
    }
  }, [imageUri]);

  return (
    <View style={styles.container}>
      <ImageEditorHeader onSavePress={handleImageSave} />
      <BackgroundImageEditor />
      <View style={styles.imageContainer}>
        <SelectedImage uri={compressedImage || selectedImage}>
          {busy && <BusyLoading visible={busy} />}
        </SelectedImage>
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
