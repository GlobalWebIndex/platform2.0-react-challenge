import { BaseSyntheticEvent } from 'react';
import { Breed, FetchCatImagesParams } from './theCatApi';

export type FilterSelectionProps = {
  options: { label: string; value: string }[];
  active: string | undefined;
  filterLabel: string;
  handleChange: (e: BaseSyntheticEvent) => void;
};

export type ModalProps = {
  isModalOpen: boolean;
  toggleModal: (e: boolean) => void;
  data: { id: string; url: string; breeds: Breed[] };
};

export type SelectOptions = {
  label: string;
  value: string;
};

export type BreedDetailsProps = {
  breed: Breed;
  url: string;
  padding?: number;
};

export type SharedModalProps = {
  isModalOpen: boolean;
  toggleModal: (param: boolean) => void;
};

export type GalleryFilterProps = {
  order: FetchCatImagesParams['order'];
  breed: string | undefined;
  category: string | undefined;
  type: 'jpg' | 'gif' | undefined;
  setOrder: (e: 'RANDOM' | 'ASC' | 'DESC') => void;
  setBreed: (e: string) => void;
  setCategory: (e: string) => void;
  setType: (e: 'jpg' | 'gif' | undefined) => void;
};

export type SharedDialogFooterProps = {
  imageID: string;
  breedsInfoExist: boolean;
  comesFromImgs: boolean;
  wikiUrl: string;
  comesFromFavs: boolean;
  onClose: (params?: { state: { deletedFavId: string } }) => void;
};

export type ImageListProps = {
  data: {
    id: string;
    url: string;
    breeds?: Breed[];
  };
  handleClick: (id: string) => void;
};

export type SharedDialogHeaderProps = {
  breedsInfoExist: boolean;
  title: string | undefined;
  onClose: (params?: { state: { deletedFavId: string } }) => void;
};
