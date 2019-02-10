import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./App.css";
import MainPage from "./MainPage";
import SearchPage from "./SearchPage";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends Component {
  state = {
    booksByShelf: {}
  };

  componentDidMount = () => {
    BooksAPI.getAll().then(books =>
      this.setState({ booksByShelf: this.booksByShelf(books) })
    );
  };

  handleShelfChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(data => {
      if (!data.error) {
        const updatedBook = { ...book, shelf: newShelf };
        this.updateBookShelf(updatedBook, newShelf);
      }
    });
  };

  booksByShelf = books => {
    const shelfs = {};

    books.forEach(book => {
      shelfs[book.shelf] = shelfs[book.shelf] || [];

      shelfs[book.shelf].push(book);
    });

    return shelfs;
  };

  get shelfByBookId() {
    const { booksByShelf } = this.state;
    const shelfByBookId = {};

    Object.keys(this.state.booksByShelf).forEach(shelf => {
      const books = booksByShelf[shelf] || [];
      books.forEach(book => (shelfByBookId[book.id] = shelf));
    });

    return shelfByBookId;
  }

  updateBookShelf = (updatedBook, newShelf) => {
    const { booksByShelf } = this.state;
    const newBooksByShelf = {};

    // First update create a new shelf ignoring the updated book
    Object.keys(booksByShelf).forEach(shelf => {
      let books = booksByShelf[shelf].filter(
        book => book.id !== updatedBook.id
      );

      newBooksByShelf[shelf] = books;
    });

    if (newShelf !== "none") {
      // Then add the updated book into the correct shelf
      newBooksByShelf[newShelf].push(updatedBook);
    }

    this.setState({ booksByShelf: newBooksByShelf });
  };

  render() {
    const { booksByShelf } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={props => (
            <MainPage
              {...props}
              booksByShelf={booksByShelf}
              onShelfChange={this.handleShelfChange}
            />
          )}
        />

        <Route
          path="/search"
          render={props => (
            <SearchPage
              {...props}
              onShelfChange={this.handleShelfChange}
              shelfByBookId={this.shelfByBookId}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
