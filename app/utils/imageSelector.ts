import {PermissionsAndroid, Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export const requestCameraPermission = async (): Promise<void> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message:
          'You have to accept the permission. Only then you will be able to take the picture',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    // const {NEVER_ASK_AGAIN, DENIED} = PermissionsAndroid.RESULTS;
    // if (granted === NEVER_ASK_AGAIN)
    //   return Alert.alert(
    //     'Failed to open camera',
    //     "It's looks like you have disabled the camera permission for this app! Please change the setting first.",
    //   );

    // if (granted === DENIED)
    //   return Alert.alert(
    //     'Failed to open camera',
    //     'Sorry but to use this feature you have to accept the CAMERA PERMISSION!',
    //   );
  } catch (error) {
    console.log('Fail to open camera, error inside camera permission', error);
  }
};

type imageResultType = {path: string; error: unknown | null};

export const selectAndCropImageFromCamera = async (
  width: number = 413,
  height: number = 531,
): Promise<imageResultType> => {
  try {
    await requestCameraPermission();
    // open the camera
    const {path} = await ImagePicker.openCamera({
      width,
      height,
      cropping: true,
    });

    return {path, error: null};
  } catch (error) {
    // https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
    return {path: '', error};
  }
};

export const selectAndCropImageFromDevice = async (
  width: number = 413,
  height: number = 531,
): Promise<imageResultType> => {
  try {
    // await requestCameraPermission();
    // open the picker (gallery)
    const {path} = await ImagePicker.openPicker({
      width,
      height,
      cropping: true,
    });

    return {path, error: null};
  } catch (error) {
    // https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
    return {path: '', error};
  }
};
