import React from "react";
import bannerImg from "../images/dao-banner.png";
import { NavLink } from "react-router-dom";

const BannerDaoTool = () => {
  return (
    <section className="bannerSection">
      <div className="containerNew">
        <div class="ellipse">
          <div className="row banner">
            <div className="col-md-12 center">
              <h2>
                DAO Tool List
               </h2>
              <br />
              <p>
                A comprehensive list of DAO Resources
              </p>
              <br />
              {/* <NavLink to="#">See More</NavLink> */}
            </div>

            {/* <div className="col-md-6 right">
            <div className="image">
              <img src={bannerImg} alt="" className="img-fluid" />
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerDaoTool;
