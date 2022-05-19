import React, { createContext, SetStateAction } from 'react';
import { SelectOptions } from '../types';

export type AppContextType = {
  breedOptions: SelectOptions[];
  categoryOptions: SelectOptions[];
  orderOptions: SelectOptions[];
  typeOptions: SelectOptions[];
  isModalOpen: boolean;
  toggleModal: (e: boolean) => void;
};

export const AppContext = createContext({
  isModalOpen: false,
  toggleModal: (e: boolean): SetStateAction<boolean> => e,
  breedOptions: [],
  categoryOptions: [],
  orderOptions: [],
  typeOptions: [],
});
