import { Image, ScrollView, StyleSheet, Text,View } from "react-native"

import OutlinedButton from "../components/UI/OutlinedButton"
import { Colors } from "../constants/colors"
import { useEffect, useState } from "react";
import { getPlaceDetails } from "../util/database";

function PlaceDetails({ route, navigation }) {
  const selectedPlaceId = route.params.placeId;
  const [fetchPlace, setFetchPlace] = useState();

  useEffect(() => {
    async function loadPlaceData() {
      const place = await getPlaceDetails(selectedPlaceId);
      console.log('One Place', place);
      setFetchPlace(place);

      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId, navigation]);

  if (!fetchPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Place Data....</Text>
      </View>
    );
  }

  function showOnMapHandler() {
    navigation.navigate('Map',{
      initialLat:fetchPlace.lat,
      initialLng:fetchPlace.lng
    })
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchPlace.address}</Text>
        </View>
        <OutlinedButton icon="pushpin" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}



export default PlaceDetails

const styles=StyleSheet.create({
  fallback:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },


  image:{
    height:'35%',
    minHeight:300,
    width:'100%'
  },
  locationContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  addressContainer:{
    padding:20
  },
  address:{
    color:Colors.primary500,
    textAlign:'center',
    fontWeight:'bold',
    fontSize:16,
  }
})