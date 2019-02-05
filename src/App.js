import React from "react";
import { Route } from "react-router-dom";

import "./App.css";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";

class BooksApp extends React.Component {
  state = {
    booksByShelf: {}
  };

  componentDidMount = () => {
    BooksAPI.getAll().then(books =>
      this.setState({ booksByShelf: this.booksByShelf(books) })
    );
  };

  booksByShelf = books => {
    const shelfs = {};

    books.forEach(book => {
      shelfs[book.shelf] = shelfs[book.shelf] || [];

      shelfs[book.shelf].push(book);
    });

    return shelfs;
  };

  render() {
    const { booksByShelf } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          component={({ history }) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {Object.keys(booksByShelf).map(shelf => (
                    <BookShelf
                      key={shelf}
                      shelf={shelf}
                      books={booksByShelf[shelf]}
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => history.push("/search")}>
                  Add a book
                </button>
              </div>
            </div>
          )}
        />

        <Route
          path="/search"
          component={({ history }) => (
            <div className="search-books">
              <div className="search-books-bar">
                <button
                  className="close-search"
                  onClick={() => history.goBack()}
                >
                  Close
                </button>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid" />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
