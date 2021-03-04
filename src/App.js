import React, { Component } from 'react';
import SearchForm from './components/SearchForm';
import axios from 'axios';
import PhotoList from './components/PhotoList';
import apiKey from './config';

export default class App extends Component {


	constructor() {
		super();
		this.state = {
			gifs: [ ],
			loading: true
		};
	} 

	componentDidMount() {
		this.performSearch();
	}
	// https://www.flickr.com/services/rest/?method=flickr.photos.search?q=${query}&limit=24&api_key=${apiKey}&format=json&nojsoncallback=1
	performSearch = (query = 'Sunset') => {
		axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search?q=${query}&limit=24&api_key=${apiKey}`)
			.then(response => {
				this.setState({
					photos: response.data.data,
				});
		})
		.catch(error => {
		  console.log('Error fetching and parsing data', error);
		});
	}

	render() { 
		console.log(this.state.photos);
		console.log()
		return (
			<div className="container">
			<SearchForm onSearch={this.performSearch} />

			<PhotoList data={this.state.photos} />
			</div>
		);
	}
}
