import {Image, StyleSheet, View, Text} from 'react-native';
import OutlinedButton from '../UI/OutlinedButton';
import {Colors} from '../../constants/colors';
import Geolocation from '@react-native-community/geolocation';
import {useContext, useEffect, useState} from 'react';
import {getMapPreview,getAddress} from '../../util/location';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import { PlaceContext } from '../../store/place-context';


function LocationPicker({onPickLocation}) {

  const PlaceCtx=useContext(PlaceContext)
 
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();


  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }

  }, [route, isFocused]);
  useEffect(()=>{
   async function handleLocation(){
     if(pickedLocation){
      const address=await getAddress(pickedLocation.lat,pickedLocation.lng)
      //onPickLocation({...pickedLocation, address:address});
      console.log("hello!!!!",address,pickedLocation.lat, pickedLocation.lng)
      PlaceCtx.Location({...pickedLocation,address:address})



    }
   }
   handleLocation();
   

  },[pickedLocation,onPickLocation])
  function getLocationHandler() {
    Geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      setPickedLocation({
        lat: latitude,
        lng: longitude,
      });
    });
  }
  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  let locationPreview = <Text>No location picked yet</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}}
      />
    );
    
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="user" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="pushpin" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}
export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
