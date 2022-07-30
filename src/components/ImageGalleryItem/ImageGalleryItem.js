import PropTypes from 'prop-types';
import './ImageGalleryItem.styled.css';

const ImageGalleryItem = ({ images }) => {
  return images.map(({ id, webformatURL, tags }) => {
    return (
      <li className="ImageGalleryItem" key={id}>
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          data-id={id}
        />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ),
};

export default ImageGalleryItem;