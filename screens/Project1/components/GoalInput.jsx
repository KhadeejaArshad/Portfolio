import {StyleSheet, View, TextInput, Button, Modal, Image} from 'react-native';
import {useState} from 'react';

function GoalInput(props) {
  const [enteredGoalText, setenteredGoalText] = useState('');
  function addInputHandler(enteredText) {
    setenteredGoalText(enteredText);
  }
  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);
    setenteredGoalText('');
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require('../asset/Image/goal.png')}
        />
        <TextInput
          style={styles.textInput}
          placeholder="MY GOALS"
          onChangeText={addInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler}  color='#5e0acc'/>
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color='#f31282'/>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#311b6b'
  },
  textInput: {
    borderWidth: 1,
    backgroundColor: '#e4d0ff',
    borderColor: '#e4d0ff',
    color: '#120438',
    borderRadius: 6,
    width: '100%',

    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginTop: 16,
    width: '100',
    marginHorizontal: 8,
  },
});
