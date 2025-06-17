
// import { useContext } from "react";
import ExpenseOutput from "../components/ExpenseOutput";
// import { ExpenseContext } from "../store/expenses-context";
import { useSelector,useDispatch } from "react-redux";


function AllExpenses(){
    //const expensesCtx= useContext(ExpenseContext)
const expenseRed= useSelector((state) =>state.expenseTracker.expenses);
 
    return <ExpenseOutput expenses={expenseRed} expensesPeriod="Total" fallbackText="WOHOO NO EXPENSES!!!"/>
}
export default AllExpenses;