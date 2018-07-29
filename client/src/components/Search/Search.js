import React from "react";
import PropTypes from 'prop-types';

class Search extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  render () {
    const { handleInputChange, search, handleFormSubmit } = this.props
    return (
      <form>
        <div className="form-group">
          <label htmlFor="search">Search:</label>
          <input
            onChange={handleInputChange}
            value={search}
            name="search"
            type="text"
            className="form-control"
            placeholder="Search for a Gif"
            id="search"
          />
          <button onClick={handleFormSubmit} className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
    );
  }
}

Search.props = {
  handleFormSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
  search: PropTypes.string
}