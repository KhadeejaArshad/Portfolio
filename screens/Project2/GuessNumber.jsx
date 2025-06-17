import {StyleSheet, ImageBackground, SafeAreaView,StatusBar} from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import LinearGradient from 'react-native-linear-gradient';
import GameScreen from './screens/GameScreen';
import {useState} from 'react';
import Colors from './constant/colors';

import GameOverScreen from './screens/GameOver';
function GuessNumber() {
  const [userName, setUserName] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  function pickedNumberHandle(pickedNumber) {
    setUserName(pickedNumber);
    setGameIsOver(false);
  }
  function GameOverHandler(numberofRounds) {
    setGameIsOver(true);
    setGuessRounds(numberofRounds);
  }
  function startNewGameHandler() {
    setUserName(null);
    setGuessRounds(0);
  }
  let screen = <StartGameScreen onPickedNumber={pickedNumberHandle} />;
  if (userName) {
    screen = <GameScreen userNumber={userName} onGameOver={GameOverHandler} />;
  }
  if (gameIsOver && userName) {
    screen = (
      <GameOverScreen
        userNumber={userName}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}>
      <ImageBackground
        source={require('./assets/Images/background.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}>
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
    </>
   
  );
}
export default GuessNumber;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
