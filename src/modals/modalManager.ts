import { createSlice } from "@reduxjs/toolkit";

const body = document.querySelector("body") as HTMLBodyElement;

const modalSlice = createSlice({
  name: "modalManager",
  initialState: {
    searchModal: false,
    moviePageModal: false,
    watchListModal: false,
    similarMoviesModal: false,
  },
  reducers: {
    openSearchModal(state, { payload }: { payload: boolean }) {
      if (state.moviePageModal) {
        state.moviePageModal = false;
      }
      if (state.watchListModal) {
        state.watchListModal = false;
      }
      if (state.similarMoviesModal) {
        state.similarMoviesModal = false;
      }
      if (payload) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
      state.searchModal = payload;
    },
    openMoviePageModal(state, { payload }: { payload: boolean }) {
      if (state.searchModal) {
        state.searchModal = false;
      }
      if (state.watchListModal) {
        state.watchListModal = false;
      }
      if (state.similarMoviesModal) {
        state.similarMoviesModal = false;
      }
      if (payload) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
      state.moviePageModal = payload;
    },
    openWatchListModal(state, { payload }: { payload: boolean }) {
      if (state.moviePageModal) {
        state.moviePageModal = false;
      }
      if (state.searchModal) {
        state.searchModal = false;
      }
      if (state.similarMoviesModal) {
        state.similarMoviesModal = false;
      }
      if (payload) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
      state.watchListModal = payload;
    },
    openSimilarMoviesModal(state, { payload }: { payload: boolean }) {
      if (state.moviePageModal) {
        state.moviePageModal = false;
      }
      if (state.searchModal) {
        state.searchModal = false;
      }
      if (state.watchListModal) {
        state.watchListModal = false;
      }
      if (payload) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
      state.similarMoviesModal = payload;
    },
  },
});

export default modalSlice.reducer;
export const { openSearchModal, openMoviePageModal, openWatchListModal, openSimilarMoviesModal } =
  modalSlice.actions;
