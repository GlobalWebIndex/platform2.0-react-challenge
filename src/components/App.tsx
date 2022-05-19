import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';

import { ToastContainer } from 'react-toastify';

import Navigation from './Navigation';
import PageFooter from './PageFooter';
import { AppContext } from './AppContext';
import { SharedModal } from './Modal';
import { fetchBreedOptions, fetchCategoryOptions } from '../api';

import '../styles/index.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';
import { Category, SelectOptions, Breed } from '../types';

const StyledContainer = withStyles({
  root: {
    backgroundColor: grey[600],
  },
})(Container);

const App: React.FC = () => {
  const [breedOptions, setBreedOptions] = useState<SelectOptions[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<SelectOptions[]>([]);
  const [isModalOpen, toggleModal] = useState<boolean>(false);

  const fetchBreeds = async () => {
    const data: Breed[] = await fetchBreedOptions();
    const options: SelectOptions[] = data?.reduce(
      (acc, cur) => [...acc, { label: cur.name, value: cur.id }],
      []
    );
    setBreedOptions(options);
  };

  const fetchCategories = async () => {
    const data: Category[] = await fetchCategoryOptions();
    const options: SelectOptions[] = data?.reduce(
      (acc, cur) => [...acc, { label: cur.name, value: cur.id.toString() }],
      []
    );
    setCategoryOptions(options);
  };

  useEffect(() => {
    fetchBreeds();
    fetchCategories();
  }, []);

  const orderOptions = [
    { label: 'Ascending', value: 'ASC' },
    { label: 'Descending', value: 'DESC' },
    { label: 'Random', value: 'RANDOM' },
  ];
  const typeOptions = [
    { label: 'All', value: '' },
    { label: 'Static', value: 'jpg' },
    { label: 'Animated', value: 'gif' },
  ];

  return (
    <AppContext.Provider
      value={{
        breedOptions,
        categoryOptions,
        orderOptions,
        typeOptions,
        isModalOpen,
        toggleModal,
      }}
    >
      <Navigation />
      <StyledContainer className="app">
        <Outlet />
      </StyledContainer>
      <PageFooter />
      <ToastContainer />
      <SharedModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </AppContext.Provider>
  );
};

export default App;
