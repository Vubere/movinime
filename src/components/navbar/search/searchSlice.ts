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
const initialState:{
  statusMovie:string,
  statusAnime: string,
  error: string,
  result: StateT[]
} = {
    statusMovie: "idle",
    statusAnime: "idle",
    error: "",
    result: []
}

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
export const fetchSearch = createAsyncThunk(
  "anime/search",
  async (text: string) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${text}&limit=25&order_by=popularity`
    );
    const data = await response.json();
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
      .addCase(fetchSearchedMovie.fulfilled, (state, { payload }:any) => {
        state.result = payload.results
        state.statusMovie = "fulfilled";
      })
      .addCase(fetchSearchedMovie.rejected, (state, { payload }: any) => {
        state.statusMovie = "failed";
        state.error = payload.message;
      });
      builder
      .addCase(fetchSearch.pending, (state, action) => {
        state.statusAnime = "loading";
      })
      .addCase(fetchSearch.fulfilled, (state, {payload}:any) => {
        state.result = payload.data
        state.statusAnime = "fulfilled";

      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.error = `${action.payload}`;
        state.statusAnime = "failed";
      });
  },
});

export default searchSlice.reducer;
export const { selectEntities: searchResult } = searchAdapter.getSelectors();
