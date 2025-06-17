import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';

function ProjectTile({ title, color, image, onPress }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: '#cccc' }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonpressed : null,
        ]}
        onPress={onPress}>
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}
export default ProjectTile;

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 2;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 200,
    width: 250,
    maxWidth: itemWidth,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flex: 1,
  },
  buttonpressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 6,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});
