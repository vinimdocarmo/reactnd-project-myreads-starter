import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import BooksGrid from "./BooksGrid";

class SearchPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  state = {
    books: []
  };

  handleSearch = event => {
    const query = event.target.value;

    if (!query) {
      return this.setState({ books: [] });
    }

    BooksAPI.search(query).then(data => {
      if (data.error === "empty query") {
        return this.setState({ books: [] });
      }
      this.setState({ books: data });
    });
  };

  render() {
    const { history } = this.props;
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
          <BooksGrid books={books} />
        </div>
      </div>
    );
  }
}

export default withRouter(SearchPage);
