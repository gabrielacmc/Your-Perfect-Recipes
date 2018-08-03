import React from "react";
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Card.css";



class Card extends React.Component {

  render() {
    const { image, recipeName, recipeLink, recipeIngredients, showCard, handleBtnClick, like, save, index } = this.props

    return (
      // fix loading spinner
      <div>
        <ul className={`recipeResults ${index}`}>
          <div className="cardtitle">
            {recipeName}
            <br />
            <a href={recipeLink} target="_blank">View the full recipe!</a>
          </div>

          <div
            className="card"
            style={{
              backgroundImage: image ? `url(${image})` : "none"
            }}
          >
            <ul className="ingredientList">
              <p className="ingredientHeader">Ingredients</p>
              {recipeIngredients.map((ingredients, index) => (
                <li key={index}> {ingredients} </li>
              ))}
            </ul>

            {/* {!image && <i className="fa fa-spinner fa-spin" aria-hidden="true" />} */}

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
  recipeIngredients: PropTypes.array,
  showCard: PropTypes.bool,
  handleBtnClick: PropTypes.func,
  like: PropTypes.string,
  save: PropTypes.string
}

export default Card;
