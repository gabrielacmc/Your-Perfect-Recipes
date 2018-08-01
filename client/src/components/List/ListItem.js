import React from "react";
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./listItem.css";
import DeleteBtn from "../../components/DeleteBtn";





class ListItem extends React.Component {


  render () {
    const { image, recipeName, recipeLink, deleteRecipe } = this.props

    return (
      // fix loading spinner
        <ul className="recipeResults">
          <div className="cardtitle">
            {recipeName}
            <DeleteBtn onClick={deleteRecipe} />
            <br/>
            <a href={recipeLink}>View the full recipe!</a>
          </div>
          
          <div
            className="card"
            style={{
              backgroundImage: image ? `url(${image})` : "none"
            }}
          >
            
            {/* {!image && <i className="fa fa-spinner fa-spin" aria-hidden="true" />} */}

          </div>

        </ul>
      // )
    );
  }
}

ListItem.propTypes = {
  image: PropTypes.string,
  recipeName: PropTypes.string,
  recipeLink: PropTypes.string,
  showCard: PropTypes.string,
  deleteRecipe: PropTypes.func
}

export default ListItem;
