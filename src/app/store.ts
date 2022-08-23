import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieslice from '../components/body/features/movieslice';
import watchlistslice from '../components/navbar/watchlistslice';
import searchSlice from '../components/navbar/searchSlice';

export const store = configureStore({
  reducer: {
    movie: movieslice,
    watchlist: watchlistslice,
    searchSlice: searchSlice
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
