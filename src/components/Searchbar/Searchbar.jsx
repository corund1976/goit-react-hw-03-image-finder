import { Component } from 'react';
import s from './Searchbar.module.css';

class Searchbar extends Component{
  state = {
    searchString: ''
  };

  handleChange = e => this.setState({ searchString: e.target.value });
    
  handleSubmit = e => {
    e.preventDefault();
    
    const { searchString } = this.state;

    if (searchString.trim() === '') {
      alert("Введите запрос для поиска...");
      return;
    };
    
    this.props.onSubmit(searchString);
    this.resetForm();
  };

  resetForm = () => this.setState({ searchString: '' });

  render() {
    const { handleSubmit, handleChange } = this;
    const { searchString } = this.state;

    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button__label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            value={searchString}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
};

export default Searchbar;