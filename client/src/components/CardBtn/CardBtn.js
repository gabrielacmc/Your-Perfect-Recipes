import React from "react";
import PropTypes from 'prop-types';
import "./CardBtn.css";

class CardBtn extends React.Component {

  render () {
    const { onClick, dataValue, style } = this.props

    return (
      <button
        onClick={onClick}
        className={`card-btn ${dataValue}`}
        {...style}
        data-value={dataValue}
      />
    );
  }
}

CardBtn.propTypes = {
  onClick: PropTypes.func,
  dataValue: PropTypes.string,
  style: PropTypes.object
}

export default CardBtn;
