import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieslice from '../components/body/features/movieslice';

export const store = configureStore({
  reducer: {
    movie: movieslice
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
