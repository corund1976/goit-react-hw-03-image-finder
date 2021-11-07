import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

function ImageGallery({images, onShowModal}) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, ...image }) => {
        return (
          <ImageGalleryItem
            key={id}
            image={image}
            onShowModal={onShowModal}>
          </ImageGalleryItem>
        );
      })}
    </ul>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })).isRequired,
  onShowModal: PropTypes.func.isRequired
};

// id - уникальный идентификатор от Pixabay