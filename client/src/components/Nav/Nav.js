import React from "react";


const Nav = () =>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    {/* <a class="navbar-brand" href="#"> */}
      {/* <img src="../../client/public/hat.ico" width="30" height="30"
        class="d-inline-block align-top" alt=""> Your Favorite Recipes!</img></a> */}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="">Home
                <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">Saved Recipes</a>
          </li>

        </ul>
        <span className="navbar-text">
          "Login Information here?"
        </span>
      </div>
</nav>;
    
    export default Nav;
