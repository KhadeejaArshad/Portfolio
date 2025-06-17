import {useContext, useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {GlobalStyles} from '../constant/styles';

//import {ExpenseContext} from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import {storeExpense, updateExpense, deleteExpense} from '../utils/http';
import LoadingOverlay from '../UI/LoadingOverlay';
import ErrorOverlay from '../UI/ErrorOverLay';
import { useSelector, useDispatch } from 'react-redux';
import { addExpense,removeExpense,setExpense } from '../store/redux/expenses';

function ManageExpense({route, navigation}) {
  //const expensesCtx = useContext(ExpenseContext);
  const expenseRed= useSelector((state) =>state.expenseTracker.expenses);
  const dispatch= useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, SetError] = useState();

  const editedExpenseId = route.params?.expenseId; // check for if it is undefined
  const isEditing = !!editedExpenseId; // covert this to a boolean value

  const selectedExpense = expenseRed.find(
    expense => expense.id === editedExpenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);
  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      //expensesCtx.deleteExpense(editedExpenseId);
      dispatch(removeExpense({id: editedExpenseId}))

      navigation.goBack();
    } catch (error) {
      SetError("Can't Delete this");
      setIsSubmitting(false)
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
   try{
     if (isEditing) {
      //expensesCtx.updateExpense(editedExpenseId, expenseData);
        dispatch(setExpense({id:editedExpenseId, data:expenseData}))
        await updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      console.log(id);

      //expensesCtx.addExpense({...expenseData, id: id});
      dispatch(addExpense({...expenseData,id:id}))
    }
   
    navigation.goBack();
   
   }
   catch(error){
    SetError("Can't save the data")
    setIsSubmitting(false);
    
   }
    
    
  }


  if(error && !isSubmitting){
    return <ErrorOverlay message={error} />
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContiner}>
          <Ionicons
            name="trash-outline"
            color={GlobalStyles.colors.error500}
            size={24}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}
export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContiner: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
