import {createSlice} from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    removeExpense: (state, action) => {
      state.expenses.splice(state.expenses.indexOf(action.payload.id), 1);
    },
    setExpense: (state, action) => {
      const {id, data} = action.payload;
      const index = state.expenses.findIndex(expense => expense.id === id);
      if (index !== -1) {
        state.expenses[index] = {...state.expenses[index], ...data};
      }
    },
    allExpense:(state,action)=>{
        state.expenses=action.payload.reverse();
    }
  },
});
export const addExpense = expenseSlice.actions.addExpense;
export const removeExpense = expenseSlice.actions.removeExpense;
export const setExpense=expenseSlice.actions.setExpense;
export const allExpense=expenseSlice.actions.allExpense;
export default expenseSlice.reducer;
