import {createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StateT } from "../../app/Type";


const movieAdapter = createEntityAdapter<StateT>()

const watchListSlice = createSlice({
  name: 'watchList',
  initialState: movieAdapter.getInitialState({
    lsKeys: {} as any
  }),
  reducers:{
    removeItem(state, action){
      movieAdapter.removeOne(state, action.payload)
      delete state.lsKeys[action.payload]
      localStorage.removeItem(`${action.payload}`)
      localStorage.setItem('keys', JSON.stringify(state.lsKeys))
    },
    addItem(state, {payload}){
     movieAdapter.addOne(state, payload)
    },
    putInLS(state, {payload}){
      state.lsKeys[payload.id] = payload.id
      localStorage.setItem('keys', JSON.stringify(state.lsKeys))
      localStorage.setItem(`${payload.id}`, JSON.stringify(payload))
    },
    addLsKeys(state, {payload}){
      state.lsKeys[payload] = payload
    },
    complete(state, {payload}){
     movieAdapter.setOne(state, payload)
     localStorage.setItem(`${payload.id}`, JSON.stringify(payload))
    }
  }
})

export default watchListSlice.reducer
export const {addItem, removeItem,addLsKeys, putInLS, complete} = watchListSlice.actions
export const {selectById, selectEntities} = movieAdapter.getSelectors()