import {useContext, useState} from 'react';
import AuthContent from '../components/Auth/AuthContent';
import {createUser} from '../utils/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import {Alert} from 'react-native';
import {AuthContext} from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  async function signupHandler({email, password, name}) {
    setIsAuthenticating(true);
    try {
      const {token, userId} = await createUser(email, password, name);
      authCtx.authenticate(token, userId);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Authentication failed!!!',
        'Creation Mode could not be executed!!',
      );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="You are in User Creation Mode" />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
