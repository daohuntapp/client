import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import { dao } from "./topDaosData";
import { topDaosData } from "../data/topDaosData";

const TopDaos = () => {
  useEffect(() => {
    console.log(topDaosData);
    // alert(daoData);
  }, [topDaosData]);

  const [item, setItem] = useState(topDaosData);

  const daoLitsItems = [
    ...new Map(
      topDaosData.map((val) => [JSON.stringify(val), val.category])
    ).values(),
  ];

  const filterItem = (curcat) => {
    const newItem = topDaosData.filter((newVal) => {
      return newVal.category === curcat;
    });
    setItem(newItem);
    console.log("adfasdfasdf" + newItem);
  };

  return (
    <div class="filter-container">
      {/* <Buttons
        filterItem={filterItem}
        setItem={setItem}
        daoLitsItems={daoLitsItems}
      /> */}

      <section className="itemsSection">
        {/* <input type="text" name="search" placeholder="Search..." data-search /> */}

        <div className="containerNew">
          <h3>Top DAOs this week</h3>
          <br />
          <br />
          <div className="row itemOuter">
            {item.map((obj, i) => {
              {
                /* const desc = obj.mission.length > 10 ? obj.mission.substring(0,10) : obj.mission */
              }
              return (
                <div key={i} className="col-md-3 mainsectionTopDao">
                  {/* <h5 className="rank">{i + 1}</h5> */}
                  <div className="topdaos">
                    <h5 className="rank" style={{ float: "right" }}>
                      ({i + 1})
                    </h5>
                    <div className="topdaos-section">
                    <img
                      src={obj.image}
                      alt={obj.name}
                      style={{
                        height: "65px",
                        width: "65px",
                        objectFit: "contain",
                      }}
                    />

                    <div className="alignLeft">
                      <h4>{obj.name}</h4>
                      <p>{obj.category.toString().replace(/,/g, " | ")}</p>
                    </div>
                      </div>
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
export default TopDaos;
