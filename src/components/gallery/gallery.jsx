import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Tile from './galleryComponents';
import {
  fetchCatsAction,
  clearCatsAction,
  updateModalPropsAction,
} from '../../redux/actions';
import './gallery.css';

class Gallery extends React.Component {
  componentDidMount() {
    const { catsQuery, fetchCats } = this.props;
    fetchCats(catsQuery);
  }

  componentDidUpdate(prevProps) {
    const { catsQuery, clearCats, fetchCats } = this.props;
    if (prevProps.catsQuery !== catsQuery) {
      clearCats();
      fetchCats(catsQuery);
    }
  }

  render() {
    const {
      cats,
      catsQuery,
      fetchCats,
      updateModalProps,
    } = this.props;
    return (
      <div data-testid="cats-list">
        {cats.map((cat) => (
          <Tile
            url={cat.url}
            key={cat.id}
            onClick={() => updateModalProps({ ...cat })}
          />
        ))}
        <button
          style={cats.length ? { display: 'block' } : { display: 'none' }}
          id="load-more"
          type="submit"
          onClick={() => fetchCats(catsQuery)}
        >
          LOAD MORE
        </button>
      </div>
    );
  }
}

Gallery.propTypes = {
  cats: PropTypes.arrayOf(PropTypes.object),
  fetchCats: PropTypes.func.isRequired,
  clearCats: PropTypes.func.isRequired,
  catsQuery: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  updateModalProps: PropTypes.func.isRequired,
};

Gallery.defaultProps = { cats: [] };

const mapStateToProps = (state) => ({
  cats: state.cats,
  catsQuery: state.catsQuery,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCats: (params) => dispatch(fetchCatsAction(params)),
  clearCats: () => dispatch(clearCatsAction()),
  updateModalProps: (modalProps) => dispatch(updateModalPropsAction(modalProps)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
