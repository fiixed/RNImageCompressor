import {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {}
const Home: FC<Props> = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Choose Your Image</Text>
        <Text style={styles.secondaryText}>
          You can select your image using one of these option which you want to
          convert to passport size.
        </Text>
      </View>
      {/* Image Capture button */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button}>
          <Icon style={styles.icon} name="camera" />
        </TouchableOpacity>
        <Text style={styles.btnLabel}>Capture</Text>
      </View>

      {/* Image Select Button */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button}>
          <Icon style={styles.icon} name="folder-open" />
        </TouchableOpacity>
        <Text style={styles.btnLabel}>Select</Text>
      </View>
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
  btnContainer: {
    width: 120,
    height: 120,
    marginVertical: 25,
  },
  button: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderColor: '#6C9ADE',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLabel: {
    textAlign: 'center',
    fontWeight: '500',
  },
  icon: {
    color: '#6C9ADE',
    fontSize: 55,
  },
});

export default Home;
