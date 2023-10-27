import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SelectorButton from './SelectorButton';
import Slider from '@react-native-community/slider';

interface Props {
  fileSize?: number;
  compressValue?: number;
  compressedPercentage?: number;
  onSelectAnother?: () => void;
  onCaptureAnother?: () => void;
  onSliderChange?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
}

const EditorTools: FC<Props> = ({
  fileSize,
  compressValue,
  compressedPercentage,
  onSelectAnother,
  onCaptureAnother,
  onSliderChange,
  onSlidingComplete,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <SelectorButton
          onPress={onSelectAnother}
          name="folder-open"
          title="Select Another"
        />
        <SelectorButton
          onPress={onCaptureAnother}
          name="camera"
          title="Capture Another"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Compressed to: {compressedPercentage}%</Text>
        <Text style={styles.label}>Image size: {fileSize}KB</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          minimumValue={0.1}
          maximumValue={1}
          value={compressValue}
          minimumTrackTintColor="rgb(108, 154, 222)"
          maximumTrackTintColor="rgb(108, 154, 222, 0.8)"
          thumbTintColor="rgb(108, 154, 222)"
          onValueChange={onSliderChange}
          onSlidingComplete={onSlidingComplete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 7,
    backgroundColor: 'white',
    elevation: 15,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    color: '#272727',
    fontSize: 18,
  },
  sliderContainer: {
    paddingVertical: 10,
  },
});

export default EditorTools;
