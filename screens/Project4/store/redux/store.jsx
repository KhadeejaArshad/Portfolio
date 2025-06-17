import { configureStore } from "@reduxjs/toolkit";

import ExpenseReducer from './expenses'

export const store= configureStore({
    reducer:{
        
        expenseTracker:ExpenseReducer

    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
})
