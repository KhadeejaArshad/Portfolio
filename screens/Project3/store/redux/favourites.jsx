import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice=createSlice({
    name:'favourites',
    initialState:{
        ids:[]
    },
    reducers:{
        addFavorite:(state,action) =>{
            state.ids.push(action.payload.id)

        },
        removeFavourite:(state,action) =>{
            state.ids.splice(state.ids.indexOf(action.payload.id),1)

        }
    }

})
export const addFavorite = favouritesSlice.actions.addFavorite;
export const removeFavourite= favouritesSlice.actions.removeFavourite;
export default favouritesSlice.reducer;