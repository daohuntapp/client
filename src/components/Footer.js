import React from "react";
import logo from "../images/logo.png";

const Footer = () => {
  return (
    <>
      {/* footer  start*/}
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="left-content">
                <img
                  className="blueLogo"
                  style={{ width: "200px" }}
                  src={logo}
                  alt=""
                />
              </h2>
            </div>
            <div className="col-md-6">
              <p className="right-content">© DAO Hunt, 2022</p>
            </div>
          </div>
        </div>
      </div>
      {/* footer  end*/}
    </>
  );
};

export default Footer;
