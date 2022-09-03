import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Api_key } from "../../app/apikey";


export const fetchPopular = createAsyncThunk("anime/popular", async () => {
  const response = await fetch(
    "https://kitsu.io/api/edge/categories?page%5Blimit%5D=100"
  );
  const data = response.json()
  return data;
});
export const fetchNew = createAsyncThunk("anime/new", async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${Api_key}&language=en-US&page=1k`
  );
  const data = response.json()
  console.log(data)
  return data;
});
export const fetchSearch = createAsyncThunk("anime/new", async (text:string) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&filter%5Btext%5D=${text}`
  );
  const data = response.json()
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
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPopular.pending, (state, action) => {
        state.popular.status = "loading";
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        console.log(action)
        state.new.data = action.payload
        state.popular.status = "fulfilled";
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        console.log(action)
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
  },
});

export default animeSlice.reducer;
