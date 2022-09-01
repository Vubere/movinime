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
  page: number;
  results: StateT[];
  total_pages: number;
  total_results: number;
}

const searchAdapter = createEntityAdapter<StateT>();
const initialState = searchAdapter.getInitialState({
  statusMovie: "idle",
  statusAnime: "idle",
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
export const fetchSearchedAnime = createAsyncThunk<any, string>(
  "movie/searchedAnime",
  async (search) => {
    const res = await fetch(
      `https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&filter%5Btext%5D=${search}&sort=-popularityRank`
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
        state.statusMovie = "loading";
      })
      .addCase(fetchSearchedMovie.fulfilled, (state, { payload }) => {
        searchAdapter.setAll(state, payload.results)
        state.statusMovie = "fulfilled";
      })
      .addCase(fetchSearchedMovie.rejected, (state, { payload }: any) => {
        state.statusMovie = "failed";
        state.error = payload.message;
      });
      builder.addCase(fetchSearchedAnime.pending, (state)=>{
        state.statusAnime = 'loading'
      })
      .addCase(fetchSearchedAnime.fulfilled, (state, action)=>{
        state.statusAnime = 'fulfilled'
        searchAdapter.setAll(state, action.payload)
      })
  },
});

export default searchSlice.reducer;
export const { selectEntities: searchResult} = searchAdapter.getSelectors();
