import React, { Component } from "react";
import PropTypes from "prop-types";

import bookType from "./types/book";
import shelfType from "./types/shelf";
import BooksGrid from "./BooksGrid";

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(bookType).isRequired,
    shelf: shelfType,
    onShelfChange: PropTypes.func.isRequired
  };

  shelfName = shelf => {
    const names = {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
    };

    return names[shelf];
  };

  render() {
    const { books, shelf, onShelfChange } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.shelfName(shelf)}</h2>
        <div className="bookshelf-books">
          <BooksGrid books={books} onShelfChange={onShelfChange} />
        </div>
      </div>
    );
  }
}

export default BookShelf;
