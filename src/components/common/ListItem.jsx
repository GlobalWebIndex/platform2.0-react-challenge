import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useListItemStyles } from "./ListItem.styles"

function ListItem({ item, path, component: Component }) {
  const location = useLocation()
  const classes = useListItemStyles()
  return (
    <div className={classes.linkWrapper} data-testid="list-item">
      <Link 
        className={classes.link} 
        to={{
          pathname: `/${path}/${item.id}`,
          state: { background: location }
        }}
      >
        <Component item={item} />
      </Link>
    </div>
  )
}

export default ListItem

