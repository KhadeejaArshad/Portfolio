
import {useContext, useEffect, useState} from "react";
import ExpenseOutput from "../components/ExpenseOutput";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpense } from "../utils/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverLay";
import { useDispatch, useSelector } from "react-redux";
import { allExpense } from "../store/redux/expenses";

function RecentExpenses(){
    const [isFetching, setIsFetching]= useState(true);
    const [error,setError]= useState();
    
    //const expensesCtx = useContext(ExpenseContext);
    const expenseRed=useSelector((state)=>state.expenseTracker.expenses);
    const dispatch=useDispatch();
    console.log();
    
  



    useEffect(()=>{
        async function getExpenses(){
            setIsFetching(true);
            try{
                 const expenses=await fetchExpense();
                //  //expensesCtx.setExpenses(expenses)
                dispatch(allExpense(expenses))
                

            }catch(error){
                setError('Could not fetch expenses!!!')

            }
           
            setIsFetching(false)
           
        }
        getExpenses();
    },[])

    if(error && !isFetching){
        return <ErrorOverlay message={error}/>
    }
    if(isFetching){
        return <LoadingOverlay/>
    }
    const recentExpenses=expenseRed.filter((expense) =>{
        const today= new Date();
        const date7DaysAgo= getDateMinusDays(today,7);
        return (expense.date >= date7DaysAgo) && (expense.date <= today)
    })
    return <ExpenseOutput expenses={recentExpenses} expensesPeriod='Last 7 days' fallbackText="No Expense WOHOOO! IN THE LAST 7 DAYS"/>
}
export default RecentExpenses;