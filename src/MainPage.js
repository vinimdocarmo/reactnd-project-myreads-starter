import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";

class MainPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

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
    const { history } = this.props;
    const { booksByShelf } = this.state;

    return (
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
          <button onClick={() => history.push("/search")}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default withRouter(MainPage);
