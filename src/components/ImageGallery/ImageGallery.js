import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import './ImageGallery.styled.css';

const ImageGallery = ({ imageList, onClick }) => {

    const imageClick = event => {
        if (event.target.nodeName === 'IMG') {
            onClick(Number(event.target.dataset.id));
        };
    };

    return (
        <ul className="ImageGallery" onClick={imageClick}>
            <ImageGalleryItem images={imageList} />
        </ul>
    );
};

ImageGallery.propTypes = {
    imageList: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ImageGallery;