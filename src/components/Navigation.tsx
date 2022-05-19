import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, ButtonGroup } from '@material-ui/core';
import logo from '../assets/logo.svg';

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <ButtonGroup variant="text">
          <Button size="small" onClick={() => navigate('images')}>
            <img src={logo} alt="logo" width="30" height="30" />
            Home
          </Button>
          <Button size="small" onClick={() => navigate('images')}>
            Image Gallery
          </Button>
          <Button size="small" onClick={() => navigate('breeds')}>
            Breeds
          </Button>
          <Button size="small" onClick={() => navigate('favourites')}>
            Favourites
          </Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
