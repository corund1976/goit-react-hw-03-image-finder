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

    paginationPage: 1,
    error: null,

    isLoading: false,

    modalIsHidden: true,
    modalImageURL: '',
    modalImageTags: ''
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.setState({ images: [] }, () => {
        this.loadImages(1);
      });
    }

    if (prevState.images !== this.state.images) {
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
      paginationPage: page,
      error: '',
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
  handleShowModalClick = (largeImageURL, tags) => {
    this.setState({ modalImageURL: largeImageURL });
    this.setState({ modalImageTags: tags });
    this.handleToggleModalStatus();
  };
  // Кноппка LoadMore...
  handleLoadMoreClick = () => {
    this.loadImages(this.state.paginationPage+1);
  };

  render() {
    const { images, isLoading, error, modalImageURL, modalImageTags, modalIsHidden } = this.state;
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
          toggleModalStatus={handleToggleModalStatus}
          modalImageURL={modalImageURL}
          modalImageTags={modalImageTags} />}
        
      </Container>
    );
  }
};

export default App;