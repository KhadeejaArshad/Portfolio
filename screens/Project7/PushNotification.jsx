import React, {useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import notifee, {TriggerType} from '@notifee/react-native';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

const requestUserPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('Notification Permission granted');
  } else {
    console.log('Notification permission denied');
  }
};

// const getToken= async ()=>{
//   try{
//     const token=await messaging().getToken()
//     console.log("FCM TOKEN:", token);

//   }catch(error){
//     console.error("FAILED",error);

//   }

// }
// export const FirebaseNotification=()=>{
//   useEffect(()=>{
//   requestUserPermission()
//   getToken()

// },[])

// }

// export default function PushNotification() {
//   async function onCreateTriggerNotification() {
//     // Request permissions if needed
//     await notifee.requestPermission();

//     // Create channel if not already created
//     const channelId = await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//     });

//     // Schedule trigger 10 seconds from now
//     const trigger = {
//       type: TriggerType.TIMESTAMP,
//       timestamp: Date.now() + 10000, // 10 seconds
//     };
//     await notifee.displayNotification({
//       title: '',
//       body: 'Main body content of the notification',
//       android: {
//         channelId,
//         pressAction: {
//           id: 'default',
//         },
//       },
//     });
//     // Create the trigger notification
//     await notifee.createTriggerNotification(
//       {
//         title: 'Hello',
//         body: '10sec',
//         android: {
//           channelId,
//           pressAction: {
//             id: 'default',
//           },
//         },
//       },
//       trigger,
//     );

//     console.log('Notification scheduled for 10 seconds later');
//   }
//   return (
//     <View style={styles.container}>
//       <Button
//         title="Display notification"
//         onPress={onCreateTriggerNotification}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

export default function PushNotification() {
  async function fetchJoke() {
    try {
      const response = await axios.get(
        'https://official-joke-api.appspot.com/jokes/programming/random',
      );
      const jokeData = response.data[0];
      if (jokeData?.setup && jokeData?.punchline) {
        return jokeData;
      } else {
        return {
          setup: "Here's your daily giggle!",
          punchline: '',
        };
      }
    } catch (error) {
      console.error('Failed to fetch joke:', error.message);
      return {
        setup: 'Oops! No jokes today, but you’re still awesome!',
        punchline: '',
      };
    }
  }

  async function onCreateTriggerNotification() {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    const joke = await fetchJoke();

    // Display the setup immediately
    await notifee.displayNotification({
      title: 'Joke:',
      body: joke.setup,
      android: {
        channelId,
        // smallIcon: 'ic_notification',
        // largeIcon: 'ic_notification',
        pressAction: {
          id: 'default',
        },
      },
    });

    // Schedule the punchline 2 seconds later
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + 5000, // 2 seconds later
    };

    await notifee.createTriggerNotification(
      {
        title: 'Punchline:',
        body: joke.punchline || '...and that’s the punchline!',
        android: {
          channelId,
          // smallIcon: 'ic_notification',
          // largeIcon: 'ic_notification',
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger,
    );

    console.log('Joke setup shown, punchline scheduled');
  }

  return (
    <View style={styles.container}>
      <Button
        title="Display Joke Notification"
        onPress={onCreateTriggerNotification}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
