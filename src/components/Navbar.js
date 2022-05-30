import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import ToolsList from "./ToolsList";

const Navbar = () => {
  const { authenticate, isAuthenticated, logout, user, chainId, web3 } =
    useMoralis();

  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    authenticate({
      signingMessage: "Welcome to DAOHUNT",
      chainId: 80001,
    });
    setWalletAddress(user.get("ethAddress"));
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid containerNew">
          <Link className="navbar-brand logo" to="/">
            {/* <span>DAO</span> */}
            <img
              className="blueLogo"
              style={{ width: "200px" }}
              src={logo}
              alt=""
            />
            {/* <span className="">HUNT</span> */}
          </Link>
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fa-solid fa-bars"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}

          <div className="search_connectBtn">
            {/* <button className="connectBtn">
              <NavLink to={"/"}> Dao List</NavLink>
            </button> */}

            <NavLink to={"/"} class="topspan">
              Explore
            </NavLink>
            <NavLink to={"/toolsList"} class="topspan">
              Dao Tools
            </NavLink>
            <NavLink to={"/toolsList"} class="topspan">
              Learn & Earn
            </NavLink>

            <button className="submitdaobutton">Submit a DAO</button>

            {/* <input className="form-control me-2" type="search" placeholder="Enter DAO Name" aria-label="Search" /> */}
            <button className="connectBtn" onClick={connectWallet}>
              {" "}
              {!walletAddress
                ? "Connect Wallet"
                : `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}
            </button>
          </div>
          {/* </div> */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
