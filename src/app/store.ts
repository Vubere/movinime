import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appSlice from '../appSlice';
import movieslice from '../components/body/features/movieslice';
import watchlistslice from '../components/navbar/watchlistslice';
import searchSlice from '../components/navbar/search/searchSlice';
import animeSlice from '../components/anime/animeSlice';


export const store = configureStore({
  reducer: {
    appState: appSlice,
    movie: movieslice,
    watchlist: watchlistslice,
    searchResult: searchSlice,
    anime: animeSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
