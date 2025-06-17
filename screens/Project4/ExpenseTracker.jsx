import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import {GlobalStyles} from './constant/styles';

import AntDesign from '@react-native-vector-icons/ant-design';
import IconButton from './UI/IconButton';
import ExpenseContextProvider from './store/expenses-context';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabOverview() {
  return (
    <BottomTab.Navigator
      screenOptions={({navigation})=>({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary400},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary400},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerLeft:({tintColor})=>(
          <IconButton icon="menu-fold" size={24} color={tintColor}
          onPress={()=>{
            navigation.toggleDrawer()
          }}/>
        ),
        headerRight: ({tintColor}) => (
          <IconButton
            icon="plus"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("Manage Expense")
            }}
          />
        ),
      })}>
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="hourglass" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="calendar" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function ExpenseTracker() {
  return (
   
   <Provider store={store}>
      <Stack.Navigator screenOptions={{
      headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
      headerTintColor:'white'
    }}>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabOverview}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Manage Expense" component={ManageExpense}options={{
        presentation:'modal'
      }} />
    </Stack.Navigator>
   </Provider>
  
  );
}
export default ExpenseTracker;
