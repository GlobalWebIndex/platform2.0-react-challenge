import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchBreedsAction, updateSearchParamsAction } from '../../redux/actions';
import './breeds.css';

class Breeds extends React.Component {
  componentDidMount() {
    const { fetchBreeds } = this.props;
    fetchBreeds();
  }

  render() {
    const { breeds, updateSearchParams } = this.props;
    const allBreeds = { id: 'all', name: 'ALL' };
    if (breeds && breeds.length) {
      return (
        <div data-testid="breeds">
          <p id="breeds-title">BREEDS FILTER</p>
          {[allBreeds, ...breeds].map((breed) => (
            <button
              data-testid="breed"
              className="breed-button"
              type="button"
              key={breed.id}
              onClick={() => updateSearchParams({
                breed_id: breed.id !== 'all' ? breed.id : null,
              })}
            >
              {breed.name}
            </button>
          ))}
        </div>
      );
    }
    return null;
  }
}

Breeds.propTypes = {
  breeds: PropTypes.arrayOf(PropTypes.object),
  fetchBreeds: PropTypes.func.isRequired,
  updateSearchParams: PropTypes.func.isRequired,
};

Breeds.defaultProps = { breeds: [] };

const mapStateToProps = (state) => ({
  breeds: state.breeds,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBreeds: () => dispatch(fetchBreedsAction()),
  updateSearchParams: (params) => dispatch(updateSearchParamsAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
