// import {Image, StyleSheet, View, Text} from 'react-native';
// import {launchCamera} from 'react-native-image-picker';
// import {Colors} from '../../constants/colors';
// import {useContext} from 'react';
// import OutlinedButton from '../UI/OutlinedButton';
// import { PlaceContext } from '../../store/place-context';

// function ImagePicker({onTakeImage}) {
//   const PlaceCtx=useContext(PlaceContext);
  
//   async function takeImageHandler() {
//      const image = await launchCamera({
//       mediaType: 'photo',
//       quality: 0.5,
//       maxHeight: 800,
//       maxWidth: 800,
//     });
//     PlaceCtx.Image(image?.assets[0]?.uri)
//     onTakeImage(image?.assets[0]?.uri);
   
   
  
//   }

//   let imagePreview = <Text>No image taken yet</Text>;

// if (PlaceCtx.image) {
//   imagePreview = <Image style={styles.image} source={{ uri: PlaceCtx.image }} />;
// }

  
//   return (
//     <View>
//       <View>
//         <View style={styles.imagePreview}>{imagePreview}</View>
//         <OutlinedButton icon='camera' onPress={takeImageHandler}>Take Image</OutlinedButton>
//       </View>
//     </View>
//   );
// }
// export default ImagePicker;
// const styles = StyleSheet.create({
//   imagePreview: {
//     width: '100%',
//     height: 200,
//     marginVertical: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.primary100,
//     borderRadius: 4,
//     overflow:'hidden'
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
// });


import { useContext } from 'react';
import { Image, StyleSheet, View, Text, Alert, Platform, PermissionsAndroid } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import OutlinedButton from '../UI/OutlinedButton';
import { PlaceContext } from '../../store/place-context';
import { Colors } from '../../constants/colors';

function ImagePicker({ onTakeImage }) {
  const PlaceCtx = useContext(PlaceContext);

  async function requestCameraPermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission required', 'Camera access is required to take pictures.');
      return;
    }

    const image = await launchCamera({
      mediaType: 'photo',
      quality: 0.5,
      maxHeight: 800,
      maxWidth: 800,
    });

    const imageUri = image?.assets?.[0]?.uri;

    if (!imageUri) {
      Alert.alert('Error', 'No image was taken.');
      return;
    }

    PlaceCtx.Image(imageUri);
    onTakeImage(imageUri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (PlaceCtx.image) {
    imagePreview = <Image style={styles.image} source={{ uri: PlaceCtx.image }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
