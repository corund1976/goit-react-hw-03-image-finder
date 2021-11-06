import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <div className={s.buttonWrapper}>
      <button type="button" className={s.Button} onClick={onLoadMore}>
        Load more...
      </button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};