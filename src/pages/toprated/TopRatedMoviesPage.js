import React, { useEffect } from "react";
import MovieListing from "../../components/MovieListing/MovieListing";
import { useDispatch } from "react-redux";
import { fetchAsyncTopRatedMovies, fetchAsyncTopRatedShows } from "../../features/movies/movieSlice";

function TopRatedMoviesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncTopRatedMovies());
    dispatch(fetchAsyncTopRatedShows());
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing isTopRated={true} />
    </div>
  );
}

export default TopRatedMoviesPage;
