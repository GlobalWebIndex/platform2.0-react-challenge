import React from "react"
import ListItem from "./ListItem"
import { useListStyles } from "./List.styles"

function List({ listItems, component, path }) {
  const classes = useListStyles()
  return (
    <div className={classes.list} data-testid="list">
      {listItems.map(listItem => (
        <ListItem 
          key={listItem.id} 
          item={listItem} 
          component={component}
          path={path}
        />
      ))}
    </div>
  )
}

export default List