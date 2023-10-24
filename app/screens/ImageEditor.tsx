/* eslint-disable prettier/prettier */
import {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
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

type RouteProps = StackScreenProps<RootStackParamList, 'ImageEditor'>;

interface Props {
  route: RouteProps['route'];
}

const ImageEditor: FC<Props> = ({route}): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const {imageUri} = route.params;

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
  return (
    <View style={styles.container}>
      <ImageEditorHeader />
      <BackgroundImageEditor />
      <View style={styles.imageContainer}>
        <SelectedImage uri={selectedImage || imageUri} />
      </View>
      <EditorTools
        onCaptureAnother={handleCaptureAnotherImage}
        onSelectAnother={handleSelectAnotherImage}
      />
      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure!"
        message="Are you sure because this action will discard all your changes."
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
