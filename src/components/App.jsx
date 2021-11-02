import React, { useEffect, useState } from "react"
import { Route, Switch, withRouter } from "react-router-dom"

import { PageLayout } from "./layout"
import { ImageView, ImageList } from "./images"
import { FavouritesList } from "./favourites"
import { BreedsList, BreedView } from "./breeds"

/**
 * Missing implementation part:
 * - Not Found functionality, and more specifically:
 * -- Invalid path
 * -- Valid path with invalid params (images/:id & breed/:id with invalid ids)
 */

function App({ location }) {
  let isModalOpen = false
  const [prevLocation, setPrevLocation] = useState(location)

  useEffect(() => {
    if(!(location.state && location.state.background)) {
      setPrevLocation(location)
    }
  }, [location])

  if (
    location.state && 
    location.state.background &&
    prevLocation !== location
  ) {
    isModalOpen = true
  }

  return (
    <PageLayout>
      <Switch location={isModalOpen ? prevLocation : location}>
        <Route exact path="/" children={<ImageList />} />
        <Route path="/image/:id" children={<ImageView isModalView={false} />} />
        <Route exact path="/breeds" children={<BreedsList />} />
        <Route exact path="/breed/:id" children={<BreedView isModalView={false} />} />
        <Route exact path="/favourites" children={<FavouritesList/>} />
      </Switch>

      {isModalOpen && <Route path="/image/:id" children={<ImageView isModalView={true} />} />}
      {isModalOpen && <Route path="/breed/:id" children={<BreedView isModalView={true} />} />}
    </PageLayout>
  )
}

export default withRouter(App)
