import {PermissionsAndroid, Alert} from 'react-native';

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

    const {NEVER_ASK_AGAIN, DENIED} = PermissionsAndroid.RESULTS;
    if (granted === NEVER_ASK_AGAIN)
      return Alert.alert(
        'Failed to open camera',
        "It's looks like you have disabled the camera permission for this app! Please change the setting first.",
      );

    if (granted === DENIED)
      return Alert.alert(
        'Failed to open camera',
        'Sorry but to use this feature you have to accept the CAMERA PERMISSION!',
      );
  } catch (error) {
    console.log('Fail to open camera, error inside camera permission', error);
  }
};
