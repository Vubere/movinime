import {createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StateT } from "../../app/Type";


const movieAdapter = createEntityAdapter<StateT>()

const watchListSlice = createSlice({
  name: 'watchList',
  initialState: movieAdapter.getInitialState({
    lsUpdate:{} as any
  }),
  reducers:{
    removeItem(state, action){
      movieAdapter.removeOne(state, action.payload)
      delete state.lsUpdate[action.payload]
      localStorage.removeItem('watchList')
      localStorage.setItem('watchList', JSON.stringify(state.lsUpdate))
      
    },
    addItem(state, {payload}){
     movieAdapter.addOne(state, payload)
    },
    putInLS(state, {payload}){
      state.lsUpdate[payload.id] = payload
      localStorage.setItem('watchList', JSON.stringify(state.lsUpdate))
    },
    addAll: movieAdapter.setAll
  }
})

export default watchListSlice.reducer
export const {addItem, removeItem,addAll, putInLS} = watchListSlice.actions
export const {selectById, selectEntities} = movieAdapter.getSelectors()