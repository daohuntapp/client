import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { daoData } from "../data/daoData";
import TopDaos from "./TopDaos";

// import FilterizrPacker from "filterizr";

// const packer = new FilterizrPacker(100, [], 20);

const DaoList = () => {
  useEffect(() => {
    console.log(daoData);
    // alert(daoData);
  }, [daoData]);

  const [item, setItem] = useState(daoData);

  //const daoLitsItems = [...new Set(daoData.map((Val) => Val.category))];
  // const daoLitsItems = [
  //   ...new Map(
  //     daoData.map((val) => [JSON.stringify(val), val.category])
  //   ).values(),
  // ];
  const daoLitsItems = [
    ...new Map(
      daoData.map((val) => [JSON.stringify(val), val.category])
    ).values(),
  ];

  // const daoLitsItems = [
  //   ...new Map(
  //     Set(daoData.map((val) => [JSON.stringify(val), val.category]))
  //   ).values(),
  // ];

  const filterItem = (curcat) => {
    const newItem = daoData.filter((newVal) => {
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

      <TopDaos />

      <section className="itemsSection">
        <div className="containerNew">
          <h2>DAOs list</h2>
          <div className="row itemOuter center">
            <div className="col-md-12 listCategoris">
              <select name="" id="">
                <option>Categories</option>
              </select>

              <select name="" id="">
                <option>Categories</option>
              </select>
              <div className="searchbar">
                <input
                  type="text"
                  name="search"
                  placeholder="Search..."
                  data-search
                />
                <i
                  style={{ "margin-right": "20px" }}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>
            </div>
            {item.map((obj, i) => {
              {
                /* const desc = obj.mission.length > 10 ? obj.mission.substring(0,10) : obj.mission */
              }
              return (
                <div key={i} className="col-md-3 items">
                  <div className="daoItem">
                    <div className="image">
                      <img
                        src={obj.image}
                        alt={obj.name}
                        style={{
                          height: "70px",
                          width: "70px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div className="content">
                      <h4>{obj.name}</h4>
                      <p>{obj.mission.substring(0, 50)}...</p>
                    </div>
                    <NavLink to={`${obj._id}`}>See More</NavLink>
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

export default DaoList;
