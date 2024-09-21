import React from "react";
import Slider from "react-slick";
import { settings } from "../../common/settings";
import { useSelector } from "react-redux";
import { 
  getAllMovies, 
  getAllShows, 
  getTopRatedMovies, 
  getTopRatedShows, 
  getUpcomingMovies, 
  getUpcomingShows 
} from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";

function MovieListing({ isTopRated, isUpcoming }) {
  const movies = useSelector(isUpcoming ? getUpcomingMovies : isTopRated ? getTopRatedMovies : getAllMovies);
  const shows = useSelector(isUpcoming ? getUpcomingShows : isTopRated ? getTopRatedShows : getAllShows);

  const currentYear = new Date().getFullYear();

  const upcomingMovies = isUpcoming
    ? movies.Search?.filter(movie => parseInt(movie.Year) > currentYear) 
    : movies.Search;

  const upcomingShows = isUpcoming
    ? shows.Search?.filter(show => parseInt(show.Year) > currentYear) 
    : shows.Search;

  let renderMovies = movies.Response === "True" && upcomingMovies ? (
    upcomingMovies.map((movie, index) => (
      <MovieCard key={index} data={movie} />
    ))
  ) : (
    <div className="movies-error">
      <h3>{movies.Error}</h3>
    </div>
  );

  let renderShows = shows.Response === "True" && upcomingShows ? (
    upcomingShows.map((show, index) => (
      <MovieCard key={index} data={show} />
    ))
  ) : (
    <div className="movies-error">
      <h3>{shows.Error}</h3>
    </div>
  );

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>{isUpcoming ? "Upcoming Movies" : isTopRated ? "Top-Rated Movies" : "Movies"}</h2>
        <div className="movie-container">
          <Slider {...settings}>{renderMovies}</Slider>
        </div>
      </div>
      <div className="show-list">
        <h2>{isUpcoming ? "Upcoming Shows" : isTopRated ? "Top-Rated Shows" : "Shows"}</h2>
        <div className="movie-container">
          <Slider {...settings}>{renderShows}</Slider>
        </div>
      </div>
    </div>
  );
}

export default MovieListing;
