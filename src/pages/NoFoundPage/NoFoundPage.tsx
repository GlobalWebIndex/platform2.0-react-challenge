import React, { FC } from "react";
import { useLocation } from "react-router-dom";

const NoFoundPage: FC = () => {
  let { pathname } = useLocation();
  return (
    <>
      <strong>
        404&nbsp;
        <span>Error page</span>
      </strong>
      <br></br>
      <div>
        The requested URL <strong>{pathname}</strong> cannot be found.
      </div>
    </>
  );
};

export default NoFoundPage;
