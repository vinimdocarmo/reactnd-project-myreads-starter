import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class SearchPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    const { history } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => history.goBack()}>
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
    );
  }
}

export default withRouter(SearchPage);
