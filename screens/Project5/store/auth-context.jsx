import { createContext,useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext=createContext({
    token:'',
    userToken:'',
    isAuthenticated:false,
    authenticate:()=>{},
    logout:()=>{}
});

function AuthContextProvider({children}){
    const [authToken,setAuthToken]= useState();
    const [userId,setUsertId]= useState();


    function authenticate(token,userToken){
        setAuthToken(token);
        setUsertId(userToken)
        AsyncStorage.setItem('token',token);
        AsyncStorage.setItem('userId',userToken)
    }
    function logout(){
        setAuthToken(null);
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('userId')
        
    }
    const value={
        token:authToken,
        userToken:userId,
        isAuthenticated: !!authToken,
        authenticate:authenticate,
        logout:logout
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}
export default AuthContextProvider