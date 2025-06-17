import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Entypo from '@react-native-vector-icons/entypo';
import Ionicons from '@react-native-vector-icons/ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ActivityIndicator} from 'react-native';
import AntDesign from '@react-native-vector-icons/ant-design';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from '../WelcomeScreen';
import {Colors} from './constants/style';

import {useContext, useEffect, useState} from 'react';
import {AuthContext} from './store/auth-context';
import IconButton from './components/UI/IconButton';

import GoalApp from '../Project1/GoalApp';
import GuessNumber from '../Project2/GuessNumber';
import MealApp from '../Project3/MealApp';
import ExpenseTracker from '../Project4/ExpenseTracker';
import FavouritePlace from '../Project6/FavouritePlace';
import PushNotification from '../Project7/PushNotification';

import Projects from '../Projects';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#3c0a6b'},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: '#3c0a6b'},
        tabBarActiveTintColor: '#ad81e6',
        tabBarInactiveTintColor: 'white',

        headerShown: false,
      }}>
      <BottomTab.Screen
        name="Home"
        component={WelcomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Projects"
        component={Projects}
        options={{
          title: 'Projects',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="profile" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      })}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#3c0a6b'},
        headerTintColor: 'white',
        drawerActiveBackgroundColor: '#f0e1ff',
        drawerActiveTintColor: '#3c0a6b',
      }}>
      <Drawer.Screen
        name="Welcome"
        component={BottomTabNavigator}
        options={{
          drawerLabel: 'Welcome',
          drawerIcon: ({color, size}) => (
            <AntDesign name="home" color={color} size={size} />
          ),
          headerRight: ({tintColor}) => (
            <IconButton
              icon="exit-outline"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AddGoal"
        component={GoalApp}
        options={{
          drawerIcon: ({color, size}) => (
            <Entypo name="trophy" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="GuessNumber"
        component={GuessNumber}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons
              name="game-controller-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="MealApp"
        component={MealApp}
        options={{
          headerShown: false,
          drawerIcon: ({color, size}) => (
            <Ionicons name="fast-food-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="ExpenseTracker"
        component={ExpenseTracker}
        options={{
          headerShown: false,
          drawerIcon: ({color, size}) => (
            <Entypo name="credit-card" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="FavouritePlace"
        component={FavouritePlace}
        options={{
          headerShown: false,
          drawerIcon: ({color, size}) => (
            <Entypo name="map" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={PushNotification}
        options={{
          drawerIcon: ({color, size}) => (
            <AntDesign name="notification" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
function Root() {
  const [isTryinglogin, setisTryinglogin] = useState(true);

  const authCtx = useContext(AuthContext);

 

  useEffect(() => {
    async function fetchToken() {
      const storedtoken = await AsyncStorage.getItem('token');
      const storeduser=await AsyncStorage.getItem('userId');

      if (storedtoken && storeduser) {
        authCtx.authenticate(storedtoken,storeduser);
      }
      setisTryinglogin(false);
    }
    fetchToken();
  }, []);

  if (isTryinglogin) {
    return <ActivityIndicator size="large" />;
  }
  return <Navigation />;
}
function Navigation() {
  const authCtx = useContext(AuthContext);

  return authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />;
}
export default Root;
