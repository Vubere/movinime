import {createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StateT } from "../../Type";


const movieAdapter = createEntityAdapter<StateT>()

const watchListSlice = createSlice({
  name: 'watchList',
  initialState: movieAdapter.getInitialState({
    isListItem: false,
    index: 0
  }),
  reducers:{
    removeItem(state, action){
      movieAdapter.removeOne(state, action.payload)
    },
    addItem: movieAdapter.addOne
  }
})

export default watchListSlice.reducer
export const {addItem, removeItem} = watchListSlice.actions
export const {selectById, selectEntities} = movieAdapter.getSelectors()