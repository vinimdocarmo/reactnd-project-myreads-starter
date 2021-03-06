import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { debounce } from "throttle-debounce";

import * as BooksAPI from "./BooksAPI";
import BooksGrid from "./BooksGrid";

class SearchPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    shelfByBookId: PropTypes.object.isRequired
  };

  state = {
    books: []
  };

  handleSearch = event => {
    const query = event.target.value;

    this.debouncedSearch(query);
  };

  debouncedSearch = debounce(300, query => {
    if (!query) {
      return this.setState({ books: [] });
    }

    BooksAPI.search(query).then(data => {
      if (data.error === "empty query") {
        return this.setState({ books: [] });
      }

      data.forEach(book => {
        const { shelfByBookId } = this.props;

        if (shelfByBookId[book.id]) {
          book.shelf = shelfByBookId[book.id];
        }
      });

      this.setState({ books: data });
    });
  });

  render() {
    const { history, onShelfChange } = this.props;
    const { books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => history.goBack()}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={books} onShelfChange={onShelfChange} />
        </div>
      </div>
    );
  }
}

export default withRouter(SearchPage);
