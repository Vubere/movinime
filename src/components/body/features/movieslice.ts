import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Api_key } from "../../../app/apikey";
import { StateT } from "../../../Type";

type similarMovieArgType = {
  page: number;
  movieId: number;
};
export const fetchSimilarMovie = createAsyncThunk<
  StateT[],
  similarMovieArgType
>("movie/fetchSimilar", async ({ page = 1, movieId }) => {
  const api = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${Api_key}&language=en-US&page=${page}`
  );
  const res = await api.json();
  return res.results;
});
export const fetchTopRatedMovie = createAsyncThunk<StateT[], number>(
  "movie/fetchTopRated",
  async (page = 1) => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${Api_key}&language=en-US&page=${page}`
    );
    const res = await api.json();
    return res.results;
  }
);
export const fetchJumMovie = createAsyncThunk<StateT[]>(
  "movie/fetchJum",
  async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${Api_key}&language=en-US`
    );
    const res = await api.json();
    return res.results;
  }
);
export const fetchTopPopularMovie = createAsyncThunk<StateT[], number>(
  "movie/fetchPopularRated",
  async (page = 1) => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=${page}`
    );
    const res = await api.json();
    return res.results;
  }
);
export const fetchLatestMovie = createAsyncThunk<StateT[], number>(
  "movie/fetchLatest",
  async (page = 1) => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${Api_key}&language=en-US&page=${page}`
    );
    const res = await api.json();
    return res.results;
  }
);
export const fetchUpcomingMovie = createAsyncThunk<StateT[], number>(
  "movie/fetchUpcoming",
  async (page = 1) => {
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
    },
    similar: {
      status: "idle",
      error: "",
    },
    jum: {
      status: "idle",
      error: "",
    },
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
        state.entities.topRated = action.payload;
      })
      .addCase(fetchTopRatedMovie.rejected, (state, { payload }: any) => {
        state.topRated.status = "failed";
        state.topRated.error = payload.message;
      });
    builder
      .addCase(fetchTopPopularMovie.pending, (state) => {
        state.topPopular.status = "loading";
      })
      .addCase(fetchTopPopularMovie.fulfilled, (state, action) => {
        state.entities.topPopular = action.payload;
        state.topPopular.status = "succeeded";
      })
      .addCase(fetchTopPopularMovie.rejected, (state, { payload }: any) => {
        state.topPopular.status = "failed";
        state.topPopular.error = payload.message;
      });
    builder
      .addCase(fetchLatestMovie.pending, (state) => {
        state.latest.status = "loading";
      })
      .addCase(fetchLatestMovie.fulfilled, (state, action) => {
        state.entities.latest = action.payload;
        state.latest.status = "succeeded";
      })
      .addCase(fetchLatestMovie.rejected, (state, { payload }: any) => {
        state.latest.status = "failed";
        state.topRated.error = payload.message;
      });
    builder
      .addCase(fetchUpcomingMovie.pending, (state) => {
        state.upcoming.status = "loading";
      })
      .addCase(fetchUpcomingMovie.fulfilled, (state, action) => {
        state.entities.upcoming = action.payload;
        state.upcoming.status = "succeeded";
      })
      .addCase(fetchUpcomingMovie.rejected, (state, { payload }: any) => {
        state.upcoming.status = "failed";
        state.upcoming.error = payload.message;
      });
    builder
      .addCase(fetchSimilarMovie.pending, (state) => {
        state.similar.status = "loading";
      })
      .addCase(fetchSimilarMovie.fulfilled, (state, action) => {
        state.entities.similar = action.payload;
        state.similar.status = "succeeded";
      })
      .addCase(fetchSimilarMovie.rejected, (state, { payload }: any) => {
        state.similar.status = "failed";
        state.similar.error = payload.message;
      });
    builder
      .addCase(fetchJumMovie.pending, (state) => {
        state.jum.status = "loading";
      })
      .addCase(fetchJumMovie.fulfilled, (state, action) => {
        state.entities.jum = action.payload;
        state.jum.status = "succeeded";
      })
      .addCase(fetchJumMovie.rejected, (state, { payload }: any) => {
        state.jum.status = "failed";
        state.jum.error = payload.message;
      });
  },
});

export default movieSlice.reducer;
export const { addMovieList } = movieSlice.actions;
