import React from "react";
import LoadingGif from "./spinner.svg";

const Loading = props => {
  return (
    <div>
      {/* Copied loader off of random site. Would be cool to have our own custom one?! */}
      <img
        src={LoadingGif}
        height="100px"
        width="100px"
        alt="loading animation"
      />
    </div>
  );
};

export default Loading;
