import React from "react";

const Failure = ({ error }) => {
  if (error) {
    // Log to custom service maybe
    console.error("Ooops -- An error occured!", error);
  }

  return (
    <div>
      Oops... something must have gone really wrong!
      <br />
      What could have happened? Hope all the 🐈 are still fine!
    </div>
  );
};

export default Failure;
