import React, { Component } from "react";
import PropTypes from "prop-types";

import bookType from "./types/book";

class BookItem extends Component {
  static propTypes = {
    book: bookType.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  state = {
    selectedShelf: this.props.book.shelf || "none"
  };

  handleShelfChange = event => {
    const newShelf = event.target.value;

    this.setState({ selectedShelf: newShelf });

    this.props.onShelfChange(this.props.book, newShelf);
  };

  backgroundImage = book => {
    try {
      return { backgroundImage: `url("${book.imageLinks.thumbnail}")` };
    } catch (error) {
      return {};
    }
  };

  render() {
    const { book } = this.props;
    const { selectedShelf } = this.state;

    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                ...this.backgroundImage(book)
              }}
            />
            <div className="book-shelf-changer">
              <select onChange={this.handleShelfChange} value={selectedShelf}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{(book.authors || []).join(", ")}</div>
        </div>
      </div>
    );
  }
}

export default BookItem;
