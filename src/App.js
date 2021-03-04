import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import apiKey from './config';
import axios from 'axios';

import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import Nav from './components/Nav';

class App extends Component {

	constructor() {
		super();
		this.state = {
			searchQuery: [ ],
			photosCars: [ ],
			photosDogs: [ ],
			photosToronto: [ ],
			isLoading: true,
			query: ''
		};
	} 

	componentDidMount() {
		this.performSearch();
	}

	componentDidUpdate() {
		console.log(this.props.data);
		console.log(this.props.onSearch);
	 }

	 // does the format matter? Testing
	// https://www.flickr.com/services/rest/?method=flickr.photos.search?q=${query}&limit=24&api_key=${apiKey}&format=json&nojsoncallback=1

	performSearch = (query) => {
		axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cars&per_page=24&format=json&nojsoncallback=1`)
			.then(response => {
				this.setState({
					photosCars: response.data.photos.photo
				});
			})
			.catch(error => {
				console.log('Error fetching and parsing data', error);
			});

		axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
			.then(response => {
				this.setState({
					photosDogs: response.data.photos.photo
				});
			})
			.catch(error => {
				console.log('Error fetching and parsing data', error);
			});
		
		axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=toronto&per_page=24&format=json&nojsoncallback=1`)
			.then(response => {
				this.setState({
					photosToronto: response.data.photos.photo
				});
			})
			.catch(error => {
				console.log('Error fetching and parsing data', error);
			});

		axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags${query}&per_page=24&format=json&nojsoncallback=1`)
			.then(response => {
				this.setState({
					searchQuery: response.data.photos.photo,
					loading: false,
					query: query
				});
			})
			.catch(error => {
				console.log('Error fetching and parsing data', error);
			})
		}

		resetLoading = () => {
			this.setState({
				loading: true
			});
		}

	render() { 
		console.log(this.state.searchQuery);
		return (
			<div className="container">
				<BrowserRouter>
					<SearchForm onSearch={this.performSearch} />
					<Nav />
					{
						(this.state.isLoading)
						? <h1>Loading...</h1>
						:
						<Switch>
							<Route exact path="/search/cars" render={ () => <Gallery data={this.state.photosCars.photos} /> } />
							<Route exact path="/search/dogs" render={ () => <Gallery data={this.state.photosDogs.photos} /> } />
							<Route exact path="/search/toronto" render={ () => <Gallery data={this.state.photosToronto.photos} /> } />
							<Route path="/search/:query" render={ () => <Gallery data={this.state.searchQuery} /> } />
					  </Switch>
					}

				</BrowserRouter>
			</div>
		)
	}
};

export default App;