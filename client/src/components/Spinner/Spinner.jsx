import React from "react";

import { CirclesWithBar } from "react-loader-spinner";
const Spinner = () => {
  return (
    <div className="my_con">
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );
};

export default Spinner;
