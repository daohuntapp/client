import React from "react";
import bannerImg from "../images/dao-banner.png";
import { NavLink } from "react-router-dom";
import TypeAnimation from "react-type-animation";

const Banner = () => {
  return (
    <section className="bannerSection">
      <div className="containerNew">
        <br />
        <div class="ellipse">
          <div className="row banner">
            <br />
            <div className="col-md-12 center">
              <h3>
                The Product Hunt for
                <span style={{ color: "green", fontWeight: "700" }}>
                  {" "}
                  DAO{" "}
                </span>{" "}
                : All in one solution for you to Discover, Risk analyze, Review,
                invest and participate in DAOs.
              </h3>
              <br />
              <br />
              <p>
                All in one solution for you to Discover, Risk analyze, Review,
                invest and participate in DAOs. Using DAOHunt investor ,
                developer and DAO community easily discover DAO. NFT base
                Discover, Review & Rating System for .<br /> It's completely
                Decentralised upvote system.
              </p>
              <br />
              {/* <NavLink to="#">See More</NavLink> */}
              <button> See More</button>
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

export default Banner;
