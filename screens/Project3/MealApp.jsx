import {StyleSheet, StatusBar, Pressable} from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverview';
import MealDetailScreen from './screens/MealDetailScreen';
import AntDesign from '@react-native-vector-icons/ant-design';
import Entypo from '@react-native-vector-icons/entypo';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavouriteScreen from './screens/FavouriteScreen';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
// import FavouritesContextProvider from './store/context/favourites-context';
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#351401'},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: '#351401'},
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#e4baa1',
        sceneStyle: {backgroundColor: '#3f2f25'},
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'All Categories',
          tabBarIcon: ({color, size}) => (
            <Entypo name="menu" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favourites"
        component={FavouriteScreen}
        options={{
          title: 'Favourites',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="star" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function MealApp() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      {/* <FavouritesContextProvider> */}
      <Provider store={store}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#351401'},
            headerTintColor: 'white',
            contentStyle: {backgroundColor: '#3f2f25'},
          }}>
          <Stack.Screen
            name="Meal Categories"
            component={BottomTabNavigator}
            options={({navigation}) => ({
              headerLeft: () => (
                <Entypo
                  name="menu"
                  color="white"
                  size={24}
                  style={{marginRight: 8}}
                  onPress={() => navigation.toggleDrawer()}
                />
              ),
            })}
          />
          <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
          <Stack.Screen
            name="MealDetail"
            component={MealDetailScreen}
            options={{
              title: 'About the Meal',
            }}
          />
        </Stack.Navigator>
        {/* </FavouritesContextProvider> */}
      </Provider>
    </>
  );
}
export default MealApp;

const styles = StyleSheet.create({});
