import { StyleSheet, Text, View,Image } from 'react-native';

import { useContext, useEffect,useState } from 'react';

import { AuthContext } from './Project5/store/auth-context';
import instance from './Project5/utils/axios';



function WelcomeScreen() {
  const [fetchedMessage,setFetchMessage]=useState('');
  const authCtx=useContext(AuthContext);
  const token= authCtx.token;
  const userId=authCtx.userToken;


    
    

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (!userId) return;

        const response = await instance.get(`users/${userId}.json`);
        const name = response?.data?.name;
        console.log(userId)
        

        if (name) {
          setFetchMessage(name);
        } else {
          setFetchMessage('User not found');
        }
      } catch (error) {
        console.error('Failed to fetch user name:', error.response?.data || error.message);
        setFetchMessage('Error fetching user name');
      }
    };

    fetchUserName();
  }, [userId,token]);


  

  return (
    <View style={styles.rootContainer}>
          <Text style={styles.text} >
           Hello {fetchedMessage} <Text style={styles.highlight}>"Khadeeja"</Text> here!
         </Text>
         <Image source={require('./assets/Image/me12.gif')}
         style={styles.gif}/>
   
        
         
       </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  highlight: {
    fontWeight: 'bold',
    color: '#eb1064',
  },
  gif:{
    width:350,
    height:350,
    borderRadius:20,
    margin:12,

    
  },
  text:{
    fontSize:18,
    color:'black',
  
    marginVertical:10
  }
});
