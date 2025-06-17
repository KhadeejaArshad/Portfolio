import {StyleSheet, View} from 'react-native';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';
import { GlobalStyles } from '../constant/styles';
import { Text } from 'react-native';



function ExpenseOutput({expenses, expensesPeriod,fallbackText}) {
  let content= <Text style={styles.infoText}>{fallbackText}</Text>
  if(expenses.length >0){
    content=<ExpenseList expenses={expenses}/>
  }
  return (
    <View style={styles.container}>
      <ExpenseSummary  expenses={expenses} periodName={expensesPeriod}/>
      {content}
    </View>
  );
}
export default ExpenseOutput;
const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingBottom:0,
        paddingHorizontal:24,
        paddingTop:24,
        backgroundColor:GlobalStyles.colors.primary700,

    },
    infoText:{
      color:'white',
      fontSize: 16,
      textAlign:'center',
      marginTop: 32

    }
})
