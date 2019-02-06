import React from "react";
import PropTypes from "prop-types";

import BookItem from "./BookItem";
import bookType from "./types/book";

function BooksGrid({ books, onShelfChange }) {
  return (
    <ol className="books-grid">
      {books.map(book => (
        <li key={book.id}>
          <BookItem book={book} onShelfChange={onShelfChange} />
        </li>
      ))}
    </ol>
  );
}

BooksGrid.propTypes = {
  books: PropTypes.arrayOf(bookType).isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default BooksGrid;
