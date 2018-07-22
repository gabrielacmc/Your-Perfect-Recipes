import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SaveRecipes from "./pages/SaveRecipes";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import EdamamSearch from "./pages/Edamam";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import SignInScreen from "./components/Login";


const App = () =>
  <Router>
    <div>
      <Nav />
      <SignInScreen />
      <Jumbotron />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        {/* Can we certain paths only show if person is logged in? */}
        <Route exact path="/save-recipes" component={SaveRecipes} />
        <Route exact path="/recipes/:id" component={Detail} />
        <Route exact path="/edamamrecipes" component={EdamamSearch} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;

