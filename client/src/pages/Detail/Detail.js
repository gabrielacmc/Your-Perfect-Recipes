import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn, RadioBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      isUpdate: false
    };
  }
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getRecipesID(this.props.match.params.id)
      .then(res => this.setState({ recipe: res.data }))
      .catch(err => console.log(err));
  }

  handleUpdate(isUpdate) {
    this.setState({ isUpdate: isUpdate })
  }

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;

    const updatedRecipe = {...this.state.recipe}
    updatedRecipe[name] = value

    this.setState({
      recipe: updatedRecipe
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.recipe.name && this.state.recipe.ingredients && this.state.recipe.description) {
      API.patchRecipes(this.props.match.params.id, this.state.recipe)
        .then(res => this.setState({isUpdate:false}))
        .catch(err => console.log(err));
    }
  };

  getReadOnly = () => (
    <Container fluid>
      <Row>
        <Col size="md-12">
            <h1>
              {this.state.recipe.name}
            </h1>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <article>
            <h1>ingredients</h1>
            <p>
              {this.state.recipe.ingredients}
            </p>
          </article>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <article>
            <h1>Description</h1>
            <p>
              {this.state.recipe.description}
            </p>
          </article>
        </Col>
      </Row>
      <Row>
        <button onClick={() => this.handleUpdate(true)}>Update</button>
        
      </Row>
    </Container>
  );

  getUpdateform = () => (
    <Container fluid>
      <Row>
        <Col size="md-12">
            <h1>Update Recipe</h1>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <form>
          <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                defaultValue={this.state.recipe.name}

              />
              <TextArea
                value={this.state.ingredients}
                onChange={this.handleInputChange}
                name="ingredients"
                defaultValue={this.state.recipe.ingredients}

              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                defaultValue={this.state.recipe.description}
              />
                <RadioBtn
                  value={this.state.sharable}
                  onChange={this.handleInputChange}
                  name="share"
                  value="share"
                  checked = {this.state.selectedOption }>
                  Share
              </RadioBtn>
                <RadioBtn
                  value={this.state.sharable}
                  onChange={this.handleOptionChange}
                  name="noShare"
                  value="noShare"
                  checked = {this.state.selectedOption }>
                  Do not Share
              </RadioBtn>
            <button onClick={() => this.handleUpdate(false)}>Cancel</button>
            <FormBtn
              disabled={!(this.state.recipe.name && this.state.recipe.ingredients && this.state.recipe.description)}
              onClick={this.handleFormSubmit}
            >
              Submit Recipe
            </FormBtn>
          </form>
        </Col>
      </Row>
    </Container>
  );

  render() {
    if (this.state.isUpdate) return this.getUpdateform();
    else return this.getReadOnly();
  }
}

export default Detail;
