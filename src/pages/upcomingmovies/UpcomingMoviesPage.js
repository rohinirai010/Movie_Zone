import React, { useEffect } from "react";
import MovieListing from "../../components/MovieListing/MovieListing";
import { useDispatch } from "react-redux";
import { fetchAsyncUpcomingMovies, fetchAsyncUpcomingShows } from "../../features/movies/movieSlice";

function UpcomingMoviesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncUpcomingMovies());
    dispatch(fetchAsyncUpcomingShows());
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing isUpcoming={true} />
    </div>
  );
}

export default UpcomingMoviesPage;
