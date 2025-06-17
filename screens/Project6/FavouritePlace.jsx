
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlaces from "./screens/AddPlaces";
import IconButton from "./components/UI/IconButtons";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import PlaceContextProvider from "./store/place-context";
import { useEffect, useCallback } from "react";
import { createTable } from "./util/database";
import PlaceDetails from "./screens/PlaceDetails";


const Stack=createNativeStackNavigator();


function FavouritePlace() {
const loadDataCallback = useCallback(async () => {
    try {
      
     
      await createTable();
       //await deleteTable();
     
      
      
      
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);


  return (
    <PlaceContextProvider>
       <Stack.Navigator
    screenOptions={{
      headerStyle:{backgroundColor:Colors.primary500},
      headerTintColor:Colors.gray700,
      contentStyle:{backgroundColor:Colors.gray700},
      
    }}>
      <Stack.Screen name="AllPlaces" component={AllPlaces}
      options={({navigation})=>({
        title:'Your Favourite Places',
        headerRight:({tintColor}) =>(
          <IconButton icon='plus' size={24} color={tintColor} onPress={()=> navigation.navigate('AddPlace')}/>
        ),
        headerLeft:({tintColor}) =>(
          <IconButton icon='menu-fold' size={24} color={tintColor} onPress={()=> navigation.toggleDrawer()}/>
        )
      })}
      />
      <Stack.Screen name="AddPlace" component={AddPlaces} options={{
        
        title:'Add a new Place'
      }}/>
      <Stack.Screen name="Map" component={Map}/>
      <Stack.Screen name="PlaceDetails" component={PlaceDetails}options={{
        title:'Loading Place...'
      }}/>
    </Stack.Navigator>

    </PlaceContextProvider>
   
    
  )
}

export default FavouritePlace