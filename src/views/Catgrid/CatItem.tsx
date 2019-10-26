import React, { useState } from 'react'
import useCatLoverApp from "../../hooks/useCatLoverApp"
import { Link,Location } from "@reach/router";
import { ReactComponent as DefaultImage } from "../../assets/img/default_cat.svg";

const CatItem = (data) => {
  const [imageloaded, isLoaded] = useState(false);

  // const classes = useStyles(makeStyles);

  const handleImageLoaded = () => {
    console.log("sfddsfsdfsdf")
    isLoaded(true)
  }

  let item = data.data
  let { url, id } = data.data

  return (
    <Location>
    {({ location }) => (
    <Link state={{ catitem: item,
      oldLocation: JSON.parse(JSON.stringify(location)), }} draggable to={`/cat/${id}`}>
      <div style={{ display: imageloaded ? 'block' : "none" }} className={"MuiAvatar-root makeStyles-bigAvatar"}>
        <img alt="Remy Sharp" src={url ? url : ''} className="MuiAvatar-img" onLoad={handleImageLoaded} /></div>
      <DefaultImage style={{ display: !imageloaded ? 'block' : "none" }} />
    </Link>
    )}
     </Location>
  );
}
export default CatItem