import {useCallback, useLayoutEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import IconButton from '../components/UI/IconButtons';

function Map({navigation, route}) {
    const initialLocation=route.params && {
    lat:route.params.initialLat,
    lng:route.params.initialLng
  }

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);


  const region = {
    latitude: initialLocation? initialLocation.lat:24.8607,
    longitude: initialLocation? initialLocation.lng:67.0011,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  function selectLocationHandler(event) {
    if(initialLocation){
      return
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
   

    setSelectedLocation({lat: lat, lng: lng});
  }

  const savePickedLocationHandler = useCallback(() => {
    //console.log(selectedLocation);
    if (!selectedLocation) {
      Alert.alert(
        'No location picked!',
        'You have to pick a location by tapping on the map first!',
      );
      return;
    }

    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if(initialLocation){
      return
    }
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler,initialLocation]);
  // useLayoutEffect(() => {
  //   function savePickedLocationHandler() {
  //     if (!selectedLocation) {
  //       Alert.alert(
  //         'No location picked!',
  //         'You have to pick a location by tapping on the map first!',
  //       );
  //       return;
  //     }

  //     navigation.navigate('AddPlace', {
  //       pickedLat: selectedLocation.lat,
  //       pickedLng: selectedLocation.lng,
  //     });
  //   }

  //   navigation.setOptions({
  //     headerRight: ({tintColor}) => (
  //       <IconButton
  //         icon="save"
  //         size={24}
  //         color={tintColor}
  //         onPress={savePickedLocationHandler}
  //       />
  //     ),
  //   });
  // }, [navigation, selectedLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
