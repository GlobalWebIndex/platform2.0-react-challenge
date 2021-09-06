import React, { FC } from 'react';
import { Link } from "react-router-dom";


const Header: FC = () => {
  return (
    <ul>
      <li>
        <Link to="/cats">Cats</Link>
      </li>
      <li>
        <Link to="/breeds">Breeds</Link>
      </li>
      <li>
        <Link to="/favorites">Favorites</Link>
      </li>
    </ul>
  );
};

export default Header;