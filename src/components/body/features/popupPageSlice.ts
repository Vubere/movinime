import { createSlice } from "@reduxjs/toolkit";
import { StateT } from "../../../Type";

type iS = {
  [key: string]: {
    open: boolean;
    history: StateT[];
  };
};
const initialState: iS = {
  moviePage: {
    open: false,
    history: [],
  },
  similarPage: {
    open: false,
    history: [],
  },
  searchPage: {
    open: false,
    history: [],
  },
};

const pageSlice = createSlice({
  name: "page",
  initialState: initialState,
  reducers: {
    moviePage(
      state,
      { payload }: { payload: { open: boolean; data?: StateT } }
    ) {
      state.moviePage.open = payload.open;
      payload.data !== undefined
        ? state.moviePage.history.push(payload.data)
        : state.moviePage.history.pop();
    },
    searchPage(state, { payload }: { payload: boolean }) {
      state.searchPage.open = payload;
    },
    similarPage(state, { payload }: { payload: boolean }) {
      state.similarPage.open = payload;
    },
    reset(state) {
      state.moviePage.history = [];
    },
    back(state){
      state.moviePage.history.pop()
    }
  },
});

export default pageSlice.reducer;

export const { moviePage, similarPage, searchPage, reset, back } = pageSlice.actions;
