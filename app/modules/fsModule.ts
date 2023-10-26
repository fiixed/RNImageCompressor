import {NativeModules} from 'react-native';

const {fsModule} = NativeModules;

interface FSModuleInterface {
  justGreetMe(name: string): Promise<string>;
  getSize(uri: string): Promise<number>;
  compressImage(
    uri: string,
    compressValue: number,
  ): Promise<{uri: string; size: number}>;
}

export default fsModule as FSModuleInterface;
