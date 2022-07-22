import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  moreInformation: () => _t(translations.moreInformation),
  breed: () => _t(translations.breed),
  home: () => _t(translations.home),
  breeds: () => _t(translations.breeds),
  favorites: () => _t(translations.favorites),
  options: () => _t(translations.options),
  loadMore: () => _t(translations.loadMore),
  markFavorite: () => _t(translations.markFavorite),
  notAvailable: () => _t(translations.notAvailable),
  textCopied: () => _t(translations.textCopied),
  catsWithBreedsOnly: () => _t(translations.catsWithBreedsOnly),
  emptyApiToken: () => _t(translations.emptyApiToken),
  emptyResults: () => _t(translations.emptyResults),
  notFound: () => _t(translations.notFound),
  responseError: () => _t(translations.responseError),
  favoriteAdded: () => _t(translations.favoriteAdded),
  favoriteDeleted: () => _t(translations.favoriteDeleted),
};
