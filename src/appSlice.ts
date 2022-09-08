import { createSlice } from "@reduxjs/toolkit";

type pageOptions = {page:'movie'|'anime'}
const initialState:pageOptions = {
  page: 'movie'
}
const appSlice = createSlice({
  name: 'App',
  initialState: initialState,
  reducers:{
    toggleState(state, action){
      state.page = action.payload
    }
  }
})

export default appSlice.reducer
export const {toggleState} = appSlice.actions