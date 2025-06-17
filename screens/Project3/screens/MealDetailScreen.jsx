import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useLayoutEffect} from 'react';
import {MEALS} from '../data/dummy';
import MealDetails from '../componets/MealDetails';
import Subtitle from '../componets/MealDetail/Subtitle';
import List from '../componets/MealDetail/List';
import IconButton from '../componets/IconButtons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite,removeFavourite } from '../store/redux/favourites';
// import {FavouritesContext} from '../store/context/favourites-context';

function MealDetailScreen({route, navigation}) {
  // const favouriteMealCtx = useContext(FavouritesContext);
  const favouriteMealIds= useSelector((state) =>state.favouriteMeals.ids);
  const dispatch= useDispatch();

  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find(meal => meal.id === mealId);
  const mealIsFavourite = favouriteMealIds.includes(mealId);

  function changeFavouriteStatus() {
    if( mealIsFavourite){
      // favouriteMealCtx.removeFavourite(mealId);
      dispatch(removeFavourite({id: mealId}));
    }else{
      // favouriteMealCtx.addFavourite(mealId);
      dispatch(addFavorite({id: mealId}));
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavourite ? 'star' : 'star-outline'}
            color="white"
            onPress={changeFavouriteStatus}
          />
        );
      },
    });
  }, [navigation, changeFavouriteStatus]);
  return (
    <ScrollView style={styles.root}>
      <Image style={styles.image} source={{uri: selectedMeal.imageUrl}} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        affordability={selectedMeal.affordability}
        complexity={selectedMeal.complexity}
        textStyle={styles.mealsText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  root: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  mealsText: {
    color: 'white',
  },
  listContainer: {
    width: '80%',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
});
