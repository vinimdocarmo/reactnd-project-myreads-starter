import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import BookShelf from "./BookShelf";

class MainPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    booksByShelf: PropTypes.object.isRequired
  };

  render() {
    const { history, onShelfChange, booksByShelf } = this.props;

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
                onShelfChange={onShelfChange}
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
