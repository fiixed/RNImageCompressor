import {PermissionsAndroid} from 'react-native';

export const convertSizeInKb = (size: number): number => {
  // 20732 / 1000 => 20.732
  // Math.floor => 20 kb // rejected because it is above 20kb
  // Math.round => 21 kb
  // Math.toFixed(2) => 20.73 kb
  return parseFloat((size / 1000).toFixed(2));
};

// checking for permission
export const checkCameraPermission = async (): Promise<boolean> => {
  return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
};

export const takeReadAndWritePermissions = async (): Promise<boolean> => {
  const res = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ]);

  const writePermission = res['android.permission.WRITE_EXTERNAL_STORAGE'];
  const readPermission = res['android.permission.READ_EXTERNAL_STORAGE'];

  // if (writePermission !== 'granted' && readPermission !== 'granted') {
  //   return false;
  // }
  if (writePermission !== 'granted') {
    return false;
  }
  return true;
};
