import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Api_key } from "../../../app/apikey";
import { StateT } from "../../../Type";

export const fetchTopRatedMovie = createAsyncThunk<StateT[], number>(
  "movie/fetchTopRated",
  async (page=1) => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${Api_key}&language=en-US&page=${page}`
    );
    const res = await api.json();
    return res.results;
  }
);
export const fetchTopPopularMovie = createAsyncThunk<StateT[], number>(
  "movie/fetchPopularRated",
  async (page=1) => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page${page}`
    );
    const res = await api.json();
    return res.results;
  }
);
export const fetchLatestMovie = createAsyncThunk<StateT[]>(
  "movie/fetchLatest",
  async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/latest?api_key=${Api_key}&language=en-US`
    );
    const res = await api.json();
    return res.results;
  }
);
export const fetchUpcomingMovie = createAsyncThunk<StateT[], number>(
  "movie/fetchUpcoming",
  async (page=1) => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_key}&language=en-US&page=${page}`
    );
    const res = await api.json();
    return res.results;
  }
);

const movieAdapter = createEntityAdapter();

const movieSlice = createSlice({
  name: "movie",
  initialState: movieAdapter.getInitialState({
    topRated: {
      status: "idle",
      error: "",
    },
    topPopular: {
      status: "idle",
      error: "",
    },
    latest: {
      status: "idle",
      error: "",
    },
    upcoming: {
      status: "idle",
      error: "",
    }
  }),
  reducers: {
    addMovieList(state) {},
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTopRatedMovie.pending, (state) => {
        state.topRated.status = "loading";
      })
      .addCase(fetchTopRatedMovie.fulfilled, (state, action) => {
        state.topRated.status = "succeeded";
        /*  movieAdapter.setAll(state,action.payload) */
        state.entities.topRated = action.payload;
      })
      .addCase(fetchTopRatedMovie.rejected, (state, action) => {
        state.topRated.status = "failed";
      });
    builder
      .addCase(fetchTopPopularMovie.pending, (state) => {
        state.topPopular.status = "loading";
      })
      .addCase(fetchTopPopularMovie.fulfilled, (state, action) => {
        state.entities.topPopular = action.payload;
        state.topPopular.status = "succeeded";
      })
      .addCase(fetchTopPopularMovie.rejected, (state) => {
        state.topPopular.status = "failed";
      });
    builder
      .addCase(fetchLatestMovie.pending, (state) => {
        state.latest.status = "loading";
      })
      .addCase(fetchLatestMovie.fulfilled, (state, action) => {
        state.entities.latest = action.payload;
        state.latest.status = "succeeded";
        console.log(action.payload)
      })
      .addCase(fetchLatestMovie.rejected, (state) => {
        state.latest.status = "failed";
      });
    builder
      .addCase(fetchUpcomingMovie.pending, (state) => {
        state.upcoming.status = "loading";
      })
      .addCase(fetchUpcomingMovie.fulfilled, (state, action) => {
        state.entities.upcoming = action.payload;
        state.upcoming.status = "succeeded";
        console.log(action.payload)
      })
      .addCase(fetchUpcomingMovie.rejected, (state,action) => {
        state.upcoming.status = "failed";
        console.log(action.payload)
      });
  },
});
//const g = movieAdapter.getSelectors();
export default movieSlice.reducer;
export const { addMovieList } = movieSlice.actions;
