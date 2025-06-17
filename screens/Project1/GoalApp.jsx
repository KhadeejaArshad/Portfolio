import {useState} from 'react';
import {StyleSheet, View, Button, FlatList} from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

function GoalApp() {
  const [modalIsVisible, setmodalIsVisible] = useState(false);

  const [courseGoals, setcourseGoal] = useState([]);

  function startAddGoalHandler() {
    setmodalIsVisible(true);
   
  }
  function endAddGoalHandler(){
    setmodalIsVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    setcourseGoal(currentCourseGoals => [
      ...currentCourseGoals,
      {text: enteredGoalText, id: Math.random().toString()},
    ]);
    endAddGoalHandler();
  }
  function deleteGoalItem(id) {
    console.log(id);
    console.log('Delete!!!');

    setcourseGoal(currentCourseGoals => {
      return currentCourseGoals.filter(goal => goal.id !== id);
    });
  }
  return (
    <View style={styles.appContainer}>
      
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
      
      <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} />

      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={itemData => {
            return (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalItem}
              />
            );
          }}
          keyExtractor={item => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}
export default GoalApp;
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a'
  },

  goalsContainer: {
    flex: 5,
  },
});
