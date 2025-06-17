import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
const BACKEND_URL = 'https://expensetracker-1e805-default-rtdb.firebaseio.com';


export async function storeExpense(expenseData) {
    const token = await AsyncStorage.getItem('token');
     
  const response=await axios.post(BACKEND_URL + `/expenses.json?auth=`+token, expenseData);
  console.log(response);
  
  const id=response.data.name;
  return id
}
export async function fetchExpense() {
     const token = await AsyncStorage.getItem('token');
     console.log(token);
   const response=await axios.get(BACKEND_URL + `/expenses.json?auth=`+token);

   const expenses=[];
   for (const key in response.data){
    const expenseObj={
        id:key,
        amount: response.data[key].amount,
        date:new Date(response.data[key].date),
        description:response.data[key].description
    };
    expenses.push(expenseObj);
   }
   return expenses

}
export async function updateExpense(id, expenseData){
     const token = await AsyncStorage.getItem('token');
    return axios.put(BACKEND_URL +`/expenses/${id}.json?auth=`+token,expenseData)
}
export async function deleteExpense(id){
     const token = await AsyncStorage.getItem('token');
    return axios.delete(BACKEND_URL +`/expenses/${id}.json?auth=`+token)
}