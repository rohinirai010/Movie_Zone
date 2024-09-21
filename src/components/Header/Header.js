import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAsyncMovies, fetchAsyncShows } from "../../features/movies/movieSlice";
import "./Header.scss";

function Header() {
  const [term, setTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") return alert("Please enter a search term!");
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie Zone</Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span className={menuOpen ? "bar open" : "bar"}></span>
        <span className={menuOpen ? "bar open" : "bar"}></span>
        <span className={menuOpen ? "bar open" : "bar"}></span>
      </div>

      <div className={`pages-container ${menuOpen ? "active" : ""}`}>
        <ul className="pages">
          <li>
            <Link to="/" className="link-item" onClick={toggleMenu}>Popular</Link>
          </li>
          <li>
            <Link to="/topratedmovies" className="link-item" onClick={toggleMenu}>Top Rated</Link>
          </li>
          <li>
            <Link to="/upcomingmovies" className="link-item" onClick={toggleMenu}>Upcoming</Link>
          </li>
        </ul>

        <div className="search-bar">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              value={term}
              placeholder="Search Movies or Shows"
              onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit"><i className="fa fa-search"></i></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Header;
