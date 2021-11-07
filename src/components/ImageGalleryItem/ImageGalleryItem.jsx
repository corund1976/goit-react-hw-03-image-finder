import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ image: { webformatURL, largeImageURL, tags }, onShowModal}) {
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() =>
        onShowModal({
          modalImage: {
            largeImageURL,
            tags
          }
        })
      }>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItem_image} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onShowModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

// webformatURL={webformatURL} // webformatURL - ссылка на маленькое изображение для списка карточек
// largeImageURL={largeImageURL} // largeImageURL - ссылка на большое изображение для модального окна
// tags={tags} // tags - поисковые тэги для изображения на Pixabay