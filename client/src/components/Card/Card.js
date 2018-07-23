import React from "react";
import CardBtn from "../CardBtn";
import PropTypes from 'prop-types';
import "./Card.css";

class Card extends React.Component {

  render () {
    const { image, recipeName, recipeLink, showCard } = this.props

    return (
      // (!showCard ? "" :
      <div>
        <ul classname="recipeResults">
          <div className="cardtitle">
            {recipeName}
            <br/>
            <a href={recipeLink}>View the full recipe!</a>
          </div>
          
          <div
            className="card"
            style={{
              backgroundImage: image ? `url(${image})` : "none"
            }}
          >

            {!image && <i className="fa fa-spinner fa-spin" aria-hidden="true" />}

          </div>

          <div className="cardbottom">
          <CardBtn
              style={{ opacity: image ? 1 : 0 }}
              // onClick={handleBtnClick}
              dataValue="bookmark"
            />
            <CardBtn
              style={{ opacity: image ? 1 : 0 }}
              // onClick={handleBtnClick}
              dataValue="heart"
            />
          </div>

        </ul>
      </div>
      // )
    );
  }
}

Card.propTypes = {
  image: PropTypes.string,
  recipeName: PropTypes.string,
  recipeLink: PropTypes.string,
  showCard: PropTypes.string
  // handleBtnClick: PropTypes.func
}

export default Card;
