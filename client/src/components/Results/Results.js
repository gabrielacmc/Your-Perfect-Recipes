import React from "react";
import PropTypes from 'prop-types';

class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {

    return (

      <ul className="list-group">
        {this.props.results.map(result =>
          <li className="list-group-item" key={result.id}>
            <img className="img-responsive" src={result.images.original.url} alt="test" />
          </li>
        )}
      </ul>

    );

  }

}

Results.props = {
  results: PropTypes.array
}