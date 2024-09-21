import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async(term) => {
    // const movieText = "Harry";
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=movie`)
    return response.data;
});

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async(term) => {
    // const seriesText = "Friends";
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=series`)
    return response.data;
});

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async(id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`)
    return response.data;
});


export const fetchAsyncTopRatedMovies = createAsyncThunk('movies/fetchAsyncTopRatedMovies', async() => {
    const response = await movieApi.get(`?apiKey=${APIKey}&s=harry&y=2001&type=movie`); // Modify query to fetch top-rated movies
    return response.data;
});

export const fetchAsyncTopRatedShows = createAsyncThunk('movies/fetchAsyncTopRatedShows', async() => {
    const response = await movieApi.get(`?apiKey=${APIKey}&s=friends&type=series`); // Modify query to fetch top-rated shows
    return response.data;
});


export const fetchAsyncUpcomingMovies = createAsyncThunk('movies/fetchAsyncUpcomingMovies', async () => {
    const response = await movieApi.get(`?apiKey=${APIKey}&s=upcoming&type=movie`); // Modify query to fetch upcoming movies
    return response.data;
});

export const fetchAsyncUpcomingShows = createAsyncThunk('movies/fetchAsyncUpcomingShows', async () => {
    const response = await movieApi.get(`?apiKey=${APIKey}&s=upcoming&type=series`); // Modify query to fetch upcoming shows
    return response.data;
});

const initialState = {
    movies: {},
    shows: {},
    topRatedMovies: {},
    topRatedShows: {},
    upcomingMovies: {},
    upcomingShows: {},
    selectMovieOrShow: {}
  };
  
  const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
      removeSelectedMovieOrShow: (state) => {
        state.selectMovieOrShow = {};
      }
    },
    extraReducers: {
      [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
        return { ...state, movies: payload };
      },
      [fetchAsyncShows.fulfilled]: (state, { payload }) => {
        return { ...state, shows: payload };
      },
      [fetchAsyncTopRatedMovies.fulfilled]: (state, { payload }) => {
        return { ...state, topRatedMovies: payload };
      },
      [fetchAsyncTopRatedShows.fulfilled]: (state, { payload }) => {
        return { ...state, topRatedShows: payload };
      },
      [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
        return { ...state, selectMovieOrShow: payload };
      },
      [fetchAsyncUpcomingMovies.fulfilled]: (state, { payload }) => {
        return { ...state, upcomingMovies: payload };
    },
    [fetchAsyncUpcomingShows.fulfilled]: (state, { payload }) => {
        return { ...state, upcomingShows: payload };
    }

    }
  });
  
  export const { removeSelectedMovieOrShow } = movieSlice.actions;
  export const getAllMovies = (state) => state.movies.movies;
  export const getAllShows = (state) => state.movies.shows;
  export const getTopRatedMovies = (state) => state.movies.topRatedMovies;
  export const getTopRatedShows = (state) => state.movies.topRatedShows;
  export const getUpcomingMovies = (state) => state.movies.upcomingMovies;
export const getUpcomingShows = (state) => state.movies.upcomingShows;
  export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
  export default movieSlice.reducer;
  