import React from 'react'
import{Loader,Button,Icon,} from 'semantic-ui-react'
import axios from 'axios'
function FavoriteImage({cat,onClickRemoveFavorite}) {
  
    return (
      <div>
        {cat ? (

          <div className="projcard projcard-blue">
            <div className="projcard-innerbox">
              <img className="projcard-img" src={cat.image.url} />
              <div className="projcard-textbox">
                 <Button icon color="teal"  onClick={(e)=>{onClickRemoveFavorite(e,cat.id)}}>
                        <Icon name='heart' />
                            Remove From Favorites
                    </Button>
              </div>
            </div>
            </div>

          ):<>
            <Loader active inline='centered'>Loading</Loader>
          </>}
    </div>
    )
  }

export default FavoriteImage