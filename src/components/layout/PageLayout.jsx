import React from "react"
import Menu from "./Menu"
import { usePageLayoutStyles } from "./PageLayout.styles"

function PageLayout({ children }) {
  const classes = usePageLayoutStyles()

  return (
    <div className={classes.pageLayout}>
      <div className={classes.menuWrapper}>
        <Menu />
      </div>
      <div className={classes.contentWrapper}>{children}</div>
    </div>
  )
}

export default PageLayout
