import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import InfographicDialog from '../components/InfographicDialog';
import HomePage from './HomePage';
import Footer from '../components/Footer';
import QuestionContainer from './QuestionContainer';
import WineShowPage from './WineShowPage';

class App extends Component {
  state = {
    allWineStyles: [],
    openDialogState: false,
    selectedWineStyle: 'bold-red'
  }

  componentDidMount() {
    this.getAllWineStyles()
  }

  getAllWineStyles = () => {
    fetch('https://winemate-api.herokuapp.com/api/v1/wine_styles')
    .then(res => res.json())
    .then(data => {
      this.setState({
        allWineStyles: data
      })
    })
  }

  handleClickDialog = () => {
    this.setState({ openDialogState: !this.state.openDialogState });
  };

  handleSelectWineStyle = (wineStyleSlug) => {
    this.setState({ selectedWineStyle: wineStyleSlug })
  }

  render() {
    return (
      <div>
        <InfographicDialog
          openDialogState={this.state.openDialogState}
          handleClickDialog={this.handleClickDialog}
        />

        <Route exact path="/" render={() => {
          return (<HomePage
            allWineStyles={this.state.allWineStyles}
            handleClickDialog={this.handleClickDialog}
            handleSelectWineStyle={this.handleSelectWineStyle}
            wineStyleToGoTo={this.state.selectedWineStyle}
          />)}}
        />

        <Route exact path="/questionnaire" render={() => {
          return (<QuestionContainer
            allWineStyles={this.state.allWineStyles}
            handleClickDialog={this.handleClickDialog}
          />)}}
        />

        <Route exact path='/winestyles/:slug' render={(props) => {
          let wineStyleSlugInUrl = props.match.params.slug
          let chosenWineStyleObj = this.state.allWineStyles.find(winestyleObj => winestyleObj.slug === wineStyleSlugInUrl )
          return (<WineShowPage
            allWineStyles={this.state.allWineStyles}
            chosenWineStyleObj={chosenWineStyleObj}
            handleClickDialog={this.handleClickDialog}
            handleSelectWineStyle={this.handleSelectWineStyle}
            selectedWineStyle={wineStyleSlugInUrl}
          />)}}
        />

      <Footer />

      </div>
    );
  }
}

export default App;
