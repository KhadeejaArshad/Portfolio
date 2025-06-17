import AuthContent from '../components/Auth/AuthContent';
import {useContext, useState} from 'react';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import {login} from '../utils/auth';
import {Alert} from 'react-native';
import {AuthContext} from '../store/auth-context';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({email, password}) {
    setIsAuthenticating(true);
    try {
      const {token,userId} = await login(email, password);
      authCtx.authenticate(token,userId);
    } catch (error) {
      Alert.alert('Cannot log you in,tryAgain');
      setIsAuthenticating(false);
    }
   
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
