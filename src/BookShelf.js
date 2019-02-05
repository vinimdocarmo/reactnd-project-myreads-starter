import React, { Component } from "react";
import PropTypes from "prop-types";

import bookType from "./types/book";
import shelfType from "./types/shelf";
import BookItem from "./BookItem";

export default class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(bookType).isRequired,
    shelf: shelfType
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
    const { books, shelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.shelfName(shelf)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <BookItem key={book.id} book={book} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
