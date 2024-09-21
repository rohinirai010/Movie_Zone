import React from 'react';
import { BrowserRouter as Router , Route , Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import './App.scss';
import TopRatedMoviesPage from './pages/toprated/TopRatedMoviesPage';
import UpcomingMoviesPage from './pages/upcomingmovies/UpcomingMoviesPage';


function App() {
  return (
    <div className="app">
      <Router>
        <Header></Header>
        <div className="container">
          <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/movie/:imdbID" element={<MovieDetails/>} />
          <Route path="/topratedmovies" element={<TopRatedMoviesPage/>} />
          <Route path="/upcomingmovies" element={<UpcomingMoviesPage/>} />
          <Route element={<PageNotFound/>} />
          </Routes>
        </div>
        
        <Footer></Footer>
      </Router>
      
    </div>
  );
}

export default App;
