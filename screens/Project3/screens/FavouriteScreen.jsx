import { View,Text,StyleSheet } from "react-native";

import MealsList from "../componets/MealsList/MealsList"

import { MEALS } from "../data/dummy";
import { useSelector } from "react-redux";

function FavouriteScreen(){
    //const favouriteMealCtx= useContext(FavouritesContext);
    const favouriteMealIds = useSelector(state => state.favouriteMeals.ids);
    const favouriteMeals=MEALS.filter((meal) => favouriteMealIds.includes(meal.id))
    if(favouriteMeals.length ===0){
        return <View style={styles.rootContainer}>
            <Text style={styles.text}> 
                You have no favourite meals yet.
            </Text>
        </View>
    }
    return <MealsList items={favouriteMeals}/>


}
export default FavouriteScreen;
const styles=StyleSheet.create({
    rootContainer:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    text:{
        fontSize:18,
        fontWeight:'bold',
        color:'white',
    }

});