import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {appendRandomCatsAction, requestRandomCatsAction} from '../../actions/catLoversActions';
import { catLoversRandomCatsSelector } from "../../selectors/catLoversSelectors";
import { openModalAction } from '../../widgets/Modal/modalActions';
import RandomCatModal from './randomCatsModal';
import AddAsFavoriteSuccessModal from './addAsFavoriteSuccessModal';
import { navigate } from '../../common/navigationUtils';

/**
 * Renders the content of the random cats page
 * @param requestRandomCats Function that requesting random catds
 * @param randomCats Array containing the random cats
 * @param openRandomCatModal Function that opens a random cat modal
 * @param appendRandomCats Function that appends to random cats
 * @returns {React.Element}
 */
const RandomCats = ({ requestRandomCats, randomCats, appendRandomCats, match, openRandomCatModal }) => {
    useEffect(() => {
      requestRandomCats()
    }, [requestRandomCats]);
      return (
          <React.Fragment>
            <ImageList sx={{ width: '100%', height: 800 }} cols={4} rowHeight={400}>
              {randomCats.map((item) => (
                    <ImageListItem key={item.id}>
                      <img
                          src={`${item.url}?w=${item.width}&h=${item.height}&fit=crop&auto=format`}
                          srcSet={`${item.url}?w=${item.width}&h=${item.height}&fit=crop&auto=format&dpr=2 2x`}
                          style={{ cursor: 'pointer' }}
                          alt={item.id}
                          loading="lazy"
                          onClick={() => openRandomCatModal(match.url, item.url, item.breeds, item.id)}
                      />
                      <Route
                          path={`${match.url}/${item.id}`}
                          render={() => {
                            return (
                              <RandomCatModal
                                stateIdentifier="randomCatModal"
                                catImage={item.url}
                                catBreed={item.breeds && item.breeds[0]}
                                catImageId={item.id}
                              />
                            );
                          }}
                      />
                    </ImageListItem>
              ))}
              <AddAsFavoriteSuccessModal />
            </ImageList>
            <Button style={{ position: 'absolute' }} variant="contained" onClick={appendRandomCats}>
              Load More
            </Button>
          </React.Fragment>
      );
};

RandomCats.propTypes = {
  requestRandomCats: PropTypes.func,
  openRandomCatModal: PropTypes.func,
  appendRandomCats: PropTypes.func
};

const mapStateToProps = state => ({
  randomCats: catLoversRandomCatsSelector(state)
});

const mapDispatchToProps = dispatch => ({
  requestRandomCats: () => dispatch(requestRandomCatsAction()),
  openRandomCatModal: (url, catImg, catBreed, catImgId) => {
    dispatch(openModalAction('randomCatModal'));
    navigate(
        `${url}/${catImgId}`, { catImg, catBreed, catImgId }
    )
  },
  appendRandomCats: () => dispatch(appendRandomCatsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(RandomCats)