import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAsyncMovies, fetchAsyncShows } from "../../features/movies/movieSlice";
import "./Header.scss";

function Header() {
  const [term, setTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") {
      setShowModal(true);
      return;
    }
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setHasSearched(true);
  };

  const resetSearch = () => {
    setTerm("");
    setHasSearched(false);
    // You can dispatch actions to reset the search results if needed
    // dispatch(resetSearchResults());
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
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

          <div className="search-bar desktop-search">
            <form onSubmit={submitHandler}>
              <input
                type="text"
                value={term}
                placeholder="Search Movies or Shows"
                onChange={(e) => setTerm(e.target.value)}
              />
              <button type="submit"><i className="fa fa-search"></i></button>
              {hasSearched && (
                <button type="button" className="reset-btn" onClick={resetSearch}>
                  <i className="fa fa-times"></i>
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Outside hamburger menu */}
      <div className="mobile-search-container">
        <div className="search-bar mobile-search">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              value={term}
              placeholder="Search Movies or Shows"
              onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit"><i className="fa fa-search"></i></button>
            {hasSearched && (
              <button type="button" className="reset-btn" onClick={resetSearch}>
                <i className="fa fa-times"></i>
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Custom Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Search Required</h3>
              <button className="modal-close" onClick={closeModal}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Please enter a search term to find movies or shows!</p>
            </div>
            <div className="modal-footer">
              <button className="modal-btn" onClick={closeModal}>
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;