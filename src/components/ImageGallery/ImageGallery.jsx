import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

function ImageGallery({images, onShowModal}) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id} // id - уникальный идентификатор
            webformatURL={webformatURL} // webformatURL - ссылка на маленькое изображение для списка карточек
            largeImageURL={largeImageURL} // largeImageURL - ссылка на большое изображение для модального окна
            tags={tags} // tags - поисковые тэги для изображения на Pixabay
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
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })).isRequired,
  onShowModal: PropTypes.func.isRequired
};