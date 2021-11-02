import React from "react"
import { usePageTitleStyles } from "./PageTitle.styles"

function PageTitle({ title }) {
  const classes = usePageTitleStyles()

  return (
    <h1 className={classes.pageTitle} data-testid="page-title">
      {title}
    </h1>
  )
}

export default PageTitle
