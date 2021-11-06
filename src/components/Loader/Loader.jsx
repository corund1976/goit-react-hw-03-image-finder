import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loader.module.css';

function LoaderSpinner () {
  return (
    <Loader
      className={s.Loader}
      type="MutatingDots"
      color="#3f51b5"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
  );
};

export default LoaderSpinner;