import React from "react";
import { Route } from "react-router-dom";

import "./App.css";
import MainPage from "./MainPage";
import SearchPage from "./SearchPage";

function BooksApp() {
  return (
    <div className="app">
      <Route exact path="/" component={MainPage} />

      <Route path="/search" component={SearchPage} />
    </div>
  );
}

export default BooksApp;
