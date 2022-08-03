import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import './ImageGallery.styled.css';

const ImageGallery = ({ imageList, imageClick }) => {
    return (
        <ul className="ImageGallery" onClick={imageClick}>
            <ImageGalleryItem images={imageList} />
        </ul>
    );
};

ImageGallery.propTypes = {
    imageList: PropTypes.array.isRequired,
    imageClick: PropTypes.func.isRequired,
};

export default ImageGallery;