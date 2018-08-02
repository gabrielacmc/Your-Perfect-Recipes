import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-router-dom";
// import SaveRecipes from "./pages/SaveRecipes";
// import SavedRecipes from "./pages/SavedRecipes";
import YourRecipes from "./pages/YourRecipes";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import EdamamSearch from "./pages/Edamam";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import fire from '../../config/Fire';
import Login from './Login';

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons'

// library.add(faHeart, faBookmark)

class App extends Component {
  constructor() {
    super();
this.state = ({
  user: null,
});
this.authListener = this.authListener.bind(this);
}

componentDidMount() {
  this.authListener();
}

authListener() {
  fire.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      this.setState({ user });
      // User is signed in.
      // var displayName = user.displayName;
      // var email = user.email;
      // var emailVerified = user.emailVerified;
      // var photoURL = user.photoURL;
      // var isAnonymous = user.isAnonymous;
      // var uid = user.uid;
      // var providerData = user.providerData;
      localStorage.setItem('user', user.uid);
    } else {
      this.setState({ user: null });
      localStorage.removeItem('user');
    }
  });
}

render() {
  return (
    <div className="App">
      {this.state.user ? (<Home />) : (<Login />)}
    </div>
  );
}
}

const App = () =>
<Router>
  <div>
    <Nav />
    <Jumbotron />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      {/* Can we certain paths only show if person is logged in? */}
      <Route exact path="/your-recipes" component={YourRecipes} />
      <Route exact path="/recipes/:id" component={Detail} />
      <Route exact path="/edamamrecipes" component={EdamamSearch} />
      <Route component={NoMatch} />
    </Switch>
  </div>
</Router>;

export default App;

