import React from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  let { pathname } = useLocation();
  return (
    <>
      <div>
        <strong>404.</strong>
        <span>That's an error.</span>
      </div>

      <div>
        <strong>
          The requested URL {pathname} was not found on this server.
        </strong>{" "}
        <span>That's all we know.</span>
      </div>
    </>
  );
};

export default NotFound;
