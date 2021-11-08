import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyEsc);
  }

  handleKeyEsc = e => {
    if (e.code === 'Escape') {           //e.keyCode === 27
      this.props.onToggleModalStatus();
    }
  };

  handleClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onToggleModalStatus();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.modalImage;

    return (
      <div className={s.Overlay} onClick={this.handleClickBackdrop}>
        <div className={s.Modal}>
          <img src={largeImageURL} alt={tags}/>
        </div>
      </div>
    );
  }
};

export default Modal;

Modal.propTypes = {
  onToggleModalStatus: PropTypes.func.isRequired,
  modalImage: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired
  }).isRequired
};