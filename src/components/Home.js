import React, { useEffect } from "react";
import Banner from "./Banner";
import DaoList from "./DaoList";
import ToolsList from "./ToolsList";

const Home = () => {
  return (
    <>
      <div className="main">
       <div className="home-header">
       <Banner />
        <DaoList />
       </div>
      </div>
    </>
  );
};

export default Home;
