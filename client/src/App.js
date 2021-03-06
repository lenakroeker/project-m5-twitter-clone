import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeFeed from "./pages/HomeFeed";
import Notifications from "./pages/Notifications";
import Bookmarks from "./pages/Bookmarks";
import TweetDetails from "./pages/TweetDetails";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import GlobalStyle from "./pages/GlobalStyles";
import { ErrorPage } from "./pages/ErrorPage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <HomeFeed />
        </Route>
        <Route exact path="/notifications">
          <Notifications />
        </Route>
        <Route exact path="/bookmarks">
          <Bookmarks />
        </Route>
        <Route exact path="/tweet/:tweetId">
          <TweetDetails />
        </Route>
        <Route exact path="/profile/:profileId">
          <Profile />
        </Route>
        <Route path="/error">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
