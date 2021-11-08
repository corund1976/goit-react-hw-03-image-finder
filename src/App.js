import { Component } from 'react';
import { getDataServer } from './service/api';
import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';

import './App.css';

class App extends Component {
  state = {
    search: '',

    images: [],

    pagination: 1,
    error: null,

    isLoading: false,

    modalImage: {},
    modalIsHidden: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.setState({ images: [] }, () => {
        this.loadImages(1);
      });
    }

    if (this.state.pagination > 1 & prevState.images !== this.state.images) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  };
  // Получение данных с сервера
  loadImages = page => {
    const { images, search } = this.state;
    this.setState({
      pagination: page,
      error: null,
      isLoading: true
    });
    // Запрос данных с сервера
    getDataServer(search, page)
      .then(( newImages ) => {
        if (newImages.length===0) {
          return Promise.reject(
           new Error(`There is no pictures by ${search} name, please try another request`));
          // this.setState({ error: `There is no pictures by ${search} name, please try another request` });
        } else {
          this.setState({ images: [...(images || []), ...newImages] });
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  // Поиск Searchbar
  handleFormSubmit = (searchString) => {
    this.setState({ search: searchString });
  };
  // Модалка
  handleToggleModalStatus = () => {
    this.setState(({ modalIsHidden }) => ({ modalIsHidden: !modalIsHidden }));
  };
  handleShowModalClick = ({ modalImage }) => {
    this.setState({ modalImage: { ...modalImage } });
    this.handleToggleModalStatus();
  };
  // Кнопка LoadMore...
  handleLoadMoreClick = () => {
    this.loadImages(this.state.pagination + 1);
  };

  render() {
    const { images, isLoading, error, modalImage, modalIsHidden } = this.state;
    const { handleFormSubmit, handleShowModalClick, handleToggleModalStatus, handleLoadMoreClick } = this;
 
    return (
      <Container>

        <Searchbar
          onSubmit={handleFormSubmit} />
        
          {error &&
        <h1>{error.message}</h1>}

        <ImageGallery
          images={images}
          onShowModal={handleShowModalClick} />

          {isLoading &&
        <Loader />}
        
          {!!images.length && !isLoading &&
        <Button
          onLoadMore={handleLoadMoreClick} />}

          {!modalIsHidden && 
        <Modal
          onToggleModalStatus={handleToggleModalStatus}
          modalImage={modalImage} />}
        
      </Container>
    );
  }
};

export default App;