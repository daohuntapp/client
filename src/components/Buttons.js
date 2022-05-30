import React from "react";

import { daoData } from "../data/daoData";

const Buttons = ({ filterItem, setItem, daoLitsItems }) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        {daoLitsItems.map((Val, _id) => {
          return (
            <button className="" onClick={() => filterItem(Val)} key={_id}>
              {Val}
            </button>
          );
        })}
        <button className="" onClick={() => setItem(daoData)}>
          All
        </button>

        {/* <button
          className="btn-warning text-white p-1 mx-5"
          onClick={() => filterItem("Breakfast")}
        >
          Breakfast
        </button>
        <button
          className="btn-warning text-white p-1 px-2 mx-5"
          onClick={() => filterItem("Lunch")}
        >
          Lunch
        </button>
        <button
          className="btn-warning text-white p-1 mx-5"
          onClick={() => filterItem("Dinner")}
        >
          Dinner
        </button> */}
      </div>
    </>
  );
};

export default Buttons;
