import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { StateT } from "../../../Type";
import { Api_key } from "../../../app/apikey";

interface fsmParamType {
  page: number;
  search: string;
}
interface thunkReturn {
  pafe: number;
  results: StateT[];
  total_pages: number;
  total_results: number;
}

const searchAdapter = createEntityAdapter<StateT>();
const initialState = searchAdapter.getInitialState({
  status: "idle",
  error: "",
});

export const fetchSearchedMovie = createAsyncThunk<thunkReturn, fsmParamType>(
  "movie/searchedMovie",
  async ({ page = 1, search }) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&query=${search}&language=en-US&page=${page}`
    );
    const data = await res.json();
    return data;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSearchedMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchedMovie.fulfilled, (state, { payload }) => {
        searchAdapter.setAll(state, payload.results)
        state.status = "fulfilled";
      })
      .addCase(fetchSearchedMovie.rejected, (state, { payload }: any) => {
        state.status = "failed";
        state.error = payload.message;
      });
  },
});

export default searchSlice.reducer;
export const { selectEntities: searchResult} = searchAdapter.getSelectors();
