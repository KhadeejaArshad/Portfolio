import {FlatList, StyleSheet, View, Text} from 'react-native';
import PlaceItem from './PlaceItem';
import {Colors} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

function PlacesList({places}) {
  const navigation = useNavigation();
  console.log('Id issue', places);

  function selectPlaceHandler(id) {
    navigation.navigate('PlaceDetails', {
      placeId: id,
    });
  }
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No Places Added Yet- Start Adding Some!!!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
}
export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
