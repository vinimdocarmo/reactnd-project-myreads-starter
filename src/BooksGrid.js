import React from "react";

import BookItem from "./BookItem";

function BooksGrid({ books }) {
  return (
    <ol className="books-grid">
      {books.map(book => (
        <li key={book.id}>
          <BookItem book={book} />
        </li>
      ))}
    </ol>
  );
}

export default BooksGrid;
