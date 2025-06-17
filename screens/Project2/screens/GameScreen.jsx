import {View, StyleSheet, Alert, FlatList,useWindowDimensions} from 'react-native';
import Title from '../components/UI/Title';
import {useState, useEffect} from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/UI/PrimaryButton';
import Card from '../components/UI/Card';
import InstructionText from '../components/UI/InstructionText';
import Entypo from '@react-native-vector-icons/entypo';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
  const randNum = Math.floor(Math.random() * (max - min)) + min;
  if (randNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randNum;
  }
}
let minBoundary = 1;
let maxBoundary = 100;
function GameScreen({userNumber, onGameOver}) {
  console.log(userNumber);

  const initialGuess = generateRandomBetween(1, 100, userNumber); //
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const {width , height} = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't Lie!", 'You Know that this is wrong...', [
        {text: 'Sorry!!', style: 'cancel'},
      ]);
      return;
    }
    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRandNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRandNumber);
    setGuessRounds(prevGuessRound => [newRandNumber, ...prevGuessRound]);
  }
  const guessRoundsListLength = guessRounds.length;

  let content=(
  <>
  <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Entypo name="plus" color="#ffff" size={20} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Entypo name="minus" color="#ffff" size={20} />
            </PrimaryButton>
          </View>
        </View>
      </Card>

  </>
  );

  if(width> 500){
    content=(
      <>
     
        
        <View style={styles.buttonContainerWide}>
        <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Entypo name="plus" color="#ffff" size={20} />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Entypo name="minus" color="#ffff" size={20} />
            </PrimaryButton>
          </View>
          
        </View>

      </>
    )
  }
  const marginTopDistance = height < 380 ? 30 : 100;
  return (
    <View style={[styles.screen,{marginTop: marginTopDistance}]}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRounds => <Text key={guessRounds}>{guessRounds}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={itemdata => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemdata.index}
              guess={itemdata.item}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
    alignItems:'center'
  },
  instructionText: {
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer:{
    flex:1,
    padding:16
  },
  buttonContainerWide:{
    flexDirection:'row',
    alignItems: 'center'
  }
});
