import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/MainComponents/NavBar";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./components/Auth/LoginPage";
import SignupPage from "./components/Auth/SignupPage";
import userService from "./utils/userService";
import VideoList from "./components/MainComponents/VideoList";
import videoService from "./utils/videoService";
import VideoView from "./Pages/VideoView";

class App extends Component {
  state = {
    user: userService.getUser(),
    videos: [],
    term: ""
  };

  handleChange = e => {
    this.setState({
      term: e.target.value
    });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  handleSearch = async (e, query) => {
    e.preventDefault();
    let search = await videoService.searchYoutube(query);
    this.setState({
      videos: search
    });
    console.log(search);
  };

  render() {
    return (
      <div>
        <NavBar
          user={this.state.user}
          handleSearch={this.handleSearch}
          handleChange={this.handleChange}
          term={this.state.term}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <VideoList videos={this.state.videos} />}
          />

          <Route
            exact
            // path={`/videos/:videoId`}
            path="/"
            render={({ videos }) => <VideoView videos={videos} />}
          />

          <Route
            exact
            path="/signup"
            render={({ history }) => (
              <SignupPage history={history} signUp={this.handleSignupOrLogin} />
            )}
          />
          <Route
            exact
            path="/login"
            render={({ history }) => (
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          <Route exact path="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
