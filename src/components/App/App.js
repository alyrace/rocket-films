import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Router, Link } from "@reach/router";

import { postMDBConfig } from "../../actions/PostMDBConfigAction";
import postMovieGenres from "../../actions/movieActions/postMovieGenres";
import postTVGenres from "../../actions/TVActions/postTVGenres";

import Home from "../Home/Home";
import UserLogIn from "../UserLogIn/UserLogIn";
import UserProfile from "../UserProfile/UserProfile";
import Discover from "../Discover/Discover";

import ItemDetails from "../ItemDetails/ItemDetails";
import SearchResults from "../SearchResults/SearchResults";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

class App extends Component {
  componentDidMount() {
    // fetch genres and api configuration
    this.props.postMDBConfig(
      `https://api.themoviedb.org/3/configuration?api_key=${this.props.apiKey}`
    );
    this.props.postMovieGenres(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.props.apiKey}`
    );
    this.props.postTVGenres(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.props.apiKey}`
    );
  }

  render() {
    return (
      <div className="App">
        <Router>
          <ScrollToTop>
            <Home path="/" />
            <ItemDetails path="/details/:type/:id" />
            <SearchResults path="/search-results/:id" />
            <Discover path="/discover" />
            /* Hanlde routing for authentication */
            <UserLogIn path="/log-in" />
            <UserProfile path="/profile/:status" />
            {!this.props.logInStatus || this.props.session.failure ? (
              <Link to="/profile" to="/log-in" />
            ) : (
              <Link from="/profile" to="/profile/approved" />
            )}
            {!this.props.logInStatus || this.props.session.failure ? (
              <Link from="/profile/approved" to="/log-in" />
            ) : (
              <Link from="/log-in" to="/profile/approved" />
            )}
            {!this.props.logInStatus === "GUEST" ? (
              <Link from="/log-in" to="/profile/guest" />
            ) : (
              <Link from="/profile/guest" to="/log-in" />
            )}
          </ScrollToTop>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  logInStatus: state.toggleLogInStatus.status,
  session: state.getSession
});

const mapDispatcherToProps = dispatch => ({
  postMDBConfig: url => dispatch(postMDBConfig(url)),
  postMovieGenres: url => dispatch(postMovieGenres(url)),
  postTVGenres: url => dispatch(postTVGenres(url))
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(App);
