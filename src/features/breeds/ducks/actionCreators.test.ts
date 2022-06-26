import ActionCreators from './actionCreators';
import ActionNames from './actionNames';

describe('Breeds action creators', () => {
  it('will return getBreeds type and paylod', () => {
    expect(ActionCreators.getBreeds({ page: 0, limit: 5 })).toEqual({
      type: ActionNames.FETCH_BREEDS_REQUESTED,
      payload: {
        page: 0,
        limit: 5,
      },
    });
  });

  it('will return breedsSucceeded type and paylod', () => {
    const mockedData = [
      {
        alt_names: '',
        experimental: 0,
        hairless: 0,
        hypoallergenic: 0,
        id: 'abys',
        life_span: '14 - 15',
        name: 'Abyssinian',
        natural: 1,
        origin: 'Egypt',
        rare: 0,
        reference_image_id: null,
        rex: 0,
        short_legs: 0,
        suppressed_tail: 0,
        temperament: 'Active, Energetic, Independent, Intelligent, Gentle',
        weight_imperial: '7  -  10',
        wikipedia_url: 'https://en.wikipedia.org/wiki/Abyssinian_(cat)',
        image: { id: '1', url: 'A_url' },
        description:
          'Intelligent and generous with their affection, a Tonkinese will supervise all activities with curiosity. Loving, social, active, playful, yet content to be a lap cat',
      },
    ];

    expect(
      ActionCreators.breedsSucceeded({ data: mockedData, page: 0 })
    ).toEqual({
      type: ActionNames.FETCH_BREEDS_SUCCEDED,
      payload: { data: mockedData, page: 0 },
    });
  });

  it('will return breedsFailed type and paylod', () => {
    expect(ActionCreators.breedsFailed()).toEqual({
      type: ActionNames.FETCH_BREEDS_FAILED,
      payload: {},
    });
  });

  it('will return getCatsByBreed type and paylod', () => {
    expect(
      ActionCreators.getCatsByBreed({ breedName: 'breed', page: 0, limit: 5 })
    ).toEqual({
      type: ActionNames.FETCH_BREED_CATS_REQUESTED,
      payload: {
        breedName: 'breed',
        page: 0,
        limit: 5,
      },
    });
  });

  it('will return catsByBreedSucceeded type and paylod', () => {
    const mockedData = [{ image: '123', breeds: [], id: '123', url: 'a_url' }];

    expect(
      ActionCreators.catsByBreedSucceeded({ data: mockedData, page: 0 })
    ).toEqual({
      type: ActionNames.FETCH_BREED_CATS_SUCCEDED,
      payload: { data: mockedData, page: 0 },
    });
  });

  it('will return catsByBreedFailed type and paylod', () => {
    expect(ActionCreators.catsByBreedFailed()).toEqual({
      type: ActionNames.FETCH_BREED_CATS_FAILED,
      payload: {},
    });
  });
});
