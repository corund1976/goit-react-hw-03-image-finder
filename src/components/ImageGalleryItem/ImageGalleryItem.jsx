import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({webformatURL, largeImageURL, tags, onShowModal}) {
  return (
    <li className={s.ImageGalleryItem} onClick={() => onShowModal(largeImageURL, tags)}>
      <img src={webformatURL} alt={tags} className={s.ImageGalleryItem_image} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onShowModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;