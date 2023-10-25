/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import UtilityButtons from './UtilityButtons';
import { useNavigation } from '@react-navigation/native';

interface Props {}

const ImageEditorHeader: FC<Props> = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back button */}
      <UtilityButtons name="arrow-left" onPress={navigation.goBack} />

      {/* Save button */}
      <View>
        <UtilityButtons name="file-download" />
        <Text style={styles.btnTitle}>Save</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnTitle: {
    color: '#6C9ADE',
    alignSelf: 'center',
  },
});

export default ImageEditorHeader;
