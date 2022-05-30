import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toolsData } from "../data/toolsData";
import BannerDaoTool from "./BannerDaoTool";

console.log(toolsData);

const ToolsList = () => {
  useEffect(() => {
    console.log(toolsData);
    // alert(toolsData);
  }, [toolsData]);

  return (
    <div className="main">
      <BannerDaoTool />

      <section className="itemsSection">
        <div className="containerNew">
          <div className="row itemOuter center">
            {toolsData.map((obj, i) => {
              {
                /* const desc = obj.mission.length > 10 ? obj.mission.substring(0,10) : obj.mission */
              }
              return (
                <div key={i} className="col-md-3 items">
                  <div className="daoItem">
                    <div className="image">
                      <img
                        src={obj.logo}
                        alt={obj.name}
                        style={{
                          height: "40px",
                          width: "150px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div className="content">
                      <h4>{obj.name}</h4>
                      <p>{obj.description.substring(0, 50)}...</p>
                    </div>
                    {/* <NavLink to={`${obj.resource_id}`}>See More</NavLink> */}
                    {/* <NavLink to={`${obj.resource_id}`}>See More</NavLink> */}
                    <a href={obj.main_url} target="_blank">
                      See More
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToolsList;
