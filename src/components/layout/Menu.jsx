import React from "react"
import { useMenuStyles } from "./Menu.styles"

function Menu() {
  const classes = useMenuStyles()

  return (
    <ul className={classes.menu}>
      <li className={classes.menuItem}>
        <a href="/" className={classes.menuItemLink}>
          Images
        </a>
      </li>

      <li className={classes.menuItem}>
        <a href="/breeds" className={classes.menuItemLink}>
          Breeds
        </a>
      </li>

      <li className={classes.menuItem}>
        <a href="/favourites" className={classes.menuItemLink}>
          Favourites
        </a>
      </li>
    </ul>
  )
}

export default Menu
