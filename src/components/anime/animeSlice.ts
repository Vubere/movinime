import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";


export const fetchPopular = createAsyncThunk("anime/popular", async () => {
  const response = await fetch(
    `https://api.jikan.moe/v4/top/anime?page=1&filter=bypopularity`
  );
  const data = await response.json()
  return data;
});
export const fetchAnimeJumb = createAsyncThunk("anime/jum", async () => {
  const response = await fetch(
    `https://api.jikan.moe/v4/top/anime?page=1&filter=bypopularity&filter=airing`
  );
  const data = await response.json()
  return data;
});
export const fetchNew = createAsyncThunk("anime/new", async () => {
  const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=1&type=tv&filter=bypopularity&filter=airing`); 
  const data = await response.json()
  return data;
});




const animeSlice = createSlice({
  name: "anime",
  initialState: {
    error: "",
    status: "idle",
    popular: {
      status: "idle",
      data: {}
    },
    new: {
      status: "idle",
      data:{}
    },
    search: {
      status: "idle",
      data:{}
    },
    jum: {
      status: "idle",
      data:{}
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPopular.pending, (state, action) => {
        state.popular.status = "loading";
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.popular.data = action.payload
        state.popular.status = "fulfilled";
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.error = `${action.payload}`;
        state.popular.status = "failed";
      });
    builder
      .addCase(fetchNew.pending, (state, action) => {
        state.new.status = "loading";
      })
      .addCase(fetchNew.fulfilled, (state, action) => {
        state.new.status = "fulfilled";
        state.new.data = action.payload
      })
      .addCase(fetchNew.rejected, (state, action) => {
        state.error = `${action.payload}`;
        state.new.status = "failed";
      });
    builder
      .addCase(fetchAnimeJumb.pending, (state, action) => {
        state.jum.status = "loading";
      })
      .addCase(fetchAnimeJumb.fulfilled, (state, action) => {
        state.jum.status = "succeeded";
        state.jum.data = action.payload
      })
      .addCase(fetchAnimeJumb.rejected, (state, action) => {
        state.error = `${action.payload}`;
        state.jum.status = "failed";
      });
    
  },
});

export default animeSlice.reducer;
