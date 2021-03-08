//stateful class component
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchForm extends Component {

    //setting state
    state = {
        searchContent: ''
    }

    //method for updating the searchContent state when someone types.
    onSearchChange = event => {
        this.setState({ searchContent: event.target.value });
    }
    
    //method for what to do on submit
    //basically grab the search value create a route path with it
    //push that route to be the current route
    onSubmit = event => {
        event.preventDefault();
        let searchText = this.search.value;
        let path = `/search/${searchText}`;
        this.props.history.push(path);
        this.props.onSearch(this.state.searchContent);
        event.currentTarget.reset();
    }

    //had to bind this for my setup to work.
    render() {
        return (
            <form className="search-form" onSubmit={this.onSubmit.bind(this)}>
                <input type="search"
                    onChange={this.onSearchChange} 
                    name="search" 
                    placeholder="Search" 
                    ref={ (input) => this.search =  input}
                    required />
                <button type="submit" className="search-button">
                    <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </button>
            </form>
        );
    }
}

export default withRouter (SearchForm);