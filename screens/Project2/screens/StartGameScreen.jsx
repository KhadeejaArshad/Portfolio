import {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import PrimaryButton from '../components/UI/PrimaryButton';
import Colors from '../constant/colors';
import Title from '../components/UI/Title';
import Card from '../components/UI/Card';
import InstructionText from '../components/UI/InstructionText';
function StartGameScreen({onPickedNumber}) {
  const [enteredNumber, setEntewredNumber] = useState(''); // input always gives string

  const {width, height} = useWindowDimensions();
  function numberInputHandler(enteredNumber) {
    setEntewredNumber(enteredNumber);
  }
  function resetInputHandler() {
    setEntewredNumber('');
  }
  function ConfirmInputHandler() {
    const chooseNumber = parseInt(enteredNumber);

    if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
      Alert.alert('Invalid Number', 'The number should be b/w 0 & 99', [
        {text: 'Okay', style: 'destructive', onPress: resetInputHandler},
      ]);
      return;
    }
    onPickedNumber(chooseNumber);
  }
  const marginTopDistance = height < 380 ? 30 : 100;
  return (

   <ScrollView style={styles.screen}>
    <KeyboardAvoidingView style={styles.screen} behavior='position'>
     <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter A Number</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={numberInputHandler}
          value={enteredNumber} // the input value will equal to entered text
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={ConfirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
   </KeyboardAvoidingView>
   </ScrollView>
  );
}
export default StartGameScreen;

const styles = StyleSheet.create({
  screen:{
    flex:1
  },
  rootContainer: {
    flex: 1,
    //marginTop: 100,
    alignItems: 'center',
  },

  numberInput: {
    height: 65,
    width: 62,
    fontSize: 38,
    borderBottomColor: Colors.accent500,

    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});
