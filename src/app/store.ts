import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieslice from '../components/body/features/movieslice';
import watchlistslice from '../components/navbar/watchlistslice';

export const store = configureStore({
  reducer: {
    movie: movieslice,
    watchlist: watchlistslice
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
