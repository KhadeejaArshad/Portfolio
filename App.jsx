import {NavigationContainer} from '@react-navigation/native';

import BootSplash from 'react-native-bootsplash';

import AuthContextProvider from './screens/Project5/store/auth-context';
import Root from './screens/Project5/Authentication';



export default function App() {

  
  return (
    //################ DRAWER NAVIGATOR #################################

    <AuthContextProvider>
      <NavigationContainer
        onReady={() => {
          BootSplash.hide();
        }}>
        <Root />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
