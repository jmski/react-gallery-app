import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

export default class Gallery extends React.Component {

    constructor() {
        super();
        this.state = {
            photos: [ ],
        };
    }

    render() {
        const results = this.props.data;

        if (results.length > 0) {
            this.state.photos = results.map(photo =>
                <Photo url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />
            );

        } else {
            this.state.photos = <NotFound />
        }

        return (
            <div className="photo-container">
                <h2>Results</h2>
                    <ul>
                        { this.state.photos }
                    </ul>
            </div>
        );
    }
}
