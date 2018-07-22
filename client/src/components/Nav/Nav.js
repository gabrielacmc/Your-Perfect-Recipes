import React from "react";


const Nav = () =>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="">
      <img src="/hat.ico" width="30" height="30"
        className="d-inline-block align-top" alt=""/>  Your Perfect Recipes!</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/home">Home
                <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/save-recipes">Save New Recipe</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/saved-recipes">Saved Recipes</a>
          </li>

        </ul>
        <span className="navbar-text">
          "Login Information here?"
        </span>
      </div>
</nav>;
    
    export default Nav;
