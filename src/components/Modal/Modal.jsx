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
    if (e.keyCode === 27) {
      this.props.toggleModalStatus();
    }
  };

  handleClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModalStatus();
    }
  };

  render() {
    const {modalImageURL, modalImageTags} = this.props;

    return (
      <div className={s.Overlay} onClick={this.handleClickBackdrop}>
        <div className={s.Modal}>
          <img src={modalImageURL} alt={modalImageTags}/>
        </div>
      </div>
    );
  }
};

export default Modal;

Modal.propTypes = {
  toggleModalStatus: PropTypes.func.isRequired,
  modalImageURL: PropTypes.string.isRequired,
  modalImageTags: PropTypes.string.isRequired
};