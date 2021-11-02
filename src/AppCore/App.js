import React from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import Tabs from '@mui/material/Tabs';
import { Link } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import * as PATHS from './common/constants';
import Loader from '../widgets/Loader/loader';

/**
 * Renders the application's Layout, wrapping all the rest view elements. Also handles:
 * @param {React.Node} children - The children to wrap.
 * @returns {React.Element}
 */
const App = ({ children }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <header>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <Link to={PATHS.RANDOM_CATS} className="link" ><Tab label="Randoms Cats" /></Link>
        <Link to={PATHS.BREEDS} className="link"><Tab label="Breeds" /></Link>
        <Link to={PATHS.FAVORITES} className="link"><Tab label="Favorites" /></Link>
      </Tabs>
      <Loader />
      {React.Children.map(children, child => React.cloneElement(child))}
    </header>
  )
};

App.propTypes = {
  children: PropTypes.node
};

export default App;
