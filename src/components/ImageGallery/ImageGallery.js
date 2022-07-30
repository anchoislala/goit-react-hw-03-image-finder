import { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import ImageGalleryItem from '../ImageGalleryItem';
import './ImageGallery.styled.css';

export default class ImageGallery extends Component {

    state = {
        error: null,
        status: 'idle',
    }

    componentDidUpdate(prevProps, _) {
        if (prevProps.imageName !== this.props.imageName ||
            prevProps.page !== this.props.page) {

            this.setState({ status: 'pending' });

            fetch(`https://pixabay.com/api/?q=${this.props.imageName}&page=${this.props.page}&key=27699103-8055a76317b5f85044be84666&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    return Promise.reject(
                        new Error(`There is no picture ${this.props.imageName}`)
                    )
                })
                .then(image => {
                    this.setState({ status: 'resolved' });
                    this.props.handleItems(image);
                })
                .catch(error => this.setState({ error, status: 'rejected' }))    
        };
    };

    imageClick = event => {
        if (event.target.nodeName === 'IMG') {
            this.props.onClick(Number(event.target.dataset.id));
        };
    };

    render() {

        const { error, status } = this.state;

        if (status === 'pending') {
            return <Loader />
        };

        if (status === 'rejected') {
            return <h1>{error.message}</h1>
        };

        if (status === 'resolved') {
            return (
                <ul className="ImageGallery" onClick={this.imageClick}>
                    <ImageGalleryItem images={this.props.imageList} />
                </ul>
            );
        };
    };
};

ImageGallery.propTypes = {
    imageName: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    handleItems: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    imageList: PropTypes.array.isRequired,
};



