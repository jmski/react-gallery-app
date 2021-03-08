//stateful class component
import React, { Component } from 'react';
import './css/index.css';
import axios from 'axios';
import apiKey from './config';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

//importing components
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';

export default class App extends Component {
  
  constructor(props) {
    //binding this keyword to this class
    super(props);
    //setting state to make a place for the Flickr data to go
    this.state = {
      photos: [],
      queryContent: '',
      loading: true
    }
  }

  //method to search the Flickr API from the search form in SearchBar.js
  //creating it as an arrow function to auto bind this keyword.
  search = (query) => {
    //storing the call in a variable to make it cleaner
    const apiLink = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;

    //api call
    axios.get(apiLink)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          queryContent: query,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data: ', error);
      });

    //resetting loading to true so that loading... shows on any API call load.
    this.setState({loading: true});
  }

  render() {
	  console.log(this.state.queryContent);
    return (
      <HashRouter>
        <div className="container">
          <SearchForm onSearch={this.search} loading={this.state.loading} />
          <Nav fetchData={this.search} />
          <Switch>
            <Route exact path="/" render={ () => <Redirect to="/taco" />} />
            <Route exact path="/search/:searchtext" render={ (props) => <Gallery {...props} data={this.state.photos} query={this.state.queryContent} loading={this.state.loading} fetchData={this.search} />} />
            <Route path="/(taco|tattoo|toronto)" render={ (props) => <Gallery {...props} data={this.state.photos} query={this.state.queryContent} loading={this.state.loading} fetchData={this.search} />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}