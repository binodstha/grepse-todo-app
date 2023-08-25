import React from "react";
import "./loader.scss";
import loadingImg from '../../../assets/images/loader.svg'

export const PageLoader: React.FC = () => {


  return (
    <div className="d-flex container-loader">
      <div className="loader">
        <img src={loadingImg} alt="Loading..." />
      </div>
    </div>
  );
};
