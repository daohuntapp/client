import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { daoData } from "../data/daoData";
import { utils } from "@snapshot-labs/snapshot.js";

import bg from "../images/bg.png";
import axios from "axios";

const { subgraphRequest } = utils;
const { daoDataDetail } = daoData;
const DaoDetail = () => {
  const { dao } = useParams();
  const [result, setresult] = useState(null);
  const [thisData, setThisData] = useState(null);


  const [proposals, setProposals] = useState([]);
  console.log("result", result);

  let intermediateresult = 0;
  let mean = 0;
  let deviation = 0;
  let scaledresult = 0;

  const [finalData, setfinalData] = useState([]);

  useEffect(() => {
    const daoDataCurrent = daoData.find((elem) => elem._id == dao);
    console.log(daoDataCurrent, "daoData");

    setThisData(daoDataCurrent);
    const getProposals = async (daoDataCurrentfn) => {
      let proposals;
      const nameDAO = daoDataCurrentfn.snapshotID;
      console.log(nameDAO, "nameDAO");
      if (nameDAO) {
        proposals = await subgraphRequest(
          "https://hub.snapshot.org/graphql",
          {
            proposals: {
              __args: {
                first: 100,
                where: {
                  space_in: [nameDAO]
                }
              },
              id: true,
              title: true,
              state: true,
              body: true,
              space: {
                id: true,
                strategies: { name: true, network: true, params: true },
              },
            },
          }
        );
      } else {
        proposals = [];
      }
      return proposals;
    };
    getProposals(daoDataCurrent)
      .then((r) => {
        console.log("r.proposals", r.proposals);
        setProposals(r.proposals);
      })
      .catch((e) => console.log(e));
    // console.log(daoData);
  }, [daoData]);

  function getdata(symbol) {
    let data = [];
    let response = null;
    new Promise(async (resolve, reject) => {
      try {
        response = await axios.get(
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=" +
          symbol,
          {
            headers: {
              "X-CMC_PRO_API_KEY": "6dd784a5-631c-4fad-87a1-82754ab0b8e3",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      } catch (ex) {
        response = null;
        // error
        console.log(ex);
        reject(ex);
      }
      if (response) {
        // success
        const json = response.data;
        const datajson = json.data[symbol];
        console.log(datajson);
        resolve(json);

        const jsonfinal = {
          symbol: symbol,
          circulating_supply: datajson.circulating_supply,
          volume24h: datajson.quote.USD.volume_24h,
          max_supply: datajson.max_supply,
          // 'token_address':datajson.platform.token_address,
          market_cap: datajson.quote.USD.market_cap,
          percent_change_1h: datajson.quote.USD.percent_change_1h,
          percent_change_24h: datajson.quote.USD.percent_change_24h,
          percent_change_7d: datajson.quote.USD.percent_change_7d,
          percent_change_30d: datajson.quote.USD.percent_change_30d,
          percent_change_60d: datajson.quote.USD.percent_change_60d,
          percent_change_90d: datajson.quote.USD.percent_change_90d,
          price: datajson.quote.USD.price,
          total_supply: datajson.total_supply,
        };

        console.log(jsonfinal);
        data.push(jsonfinal);
        setfinalData(data);

        mean =
          (Math.abs(jsonfinal.percent_change_90d) +
            Math.abs(jsonfinal.percent_change_60d) +
            Math.abs(jsonfinal.percent_change_30d) +
            Math.abs(jsonfinal.percent_change_24h)) /
          4;

        deviation = Math.sqrt(
          (Math.pow(jsonfinal.percent_change_90d - mean), 2) +
          (Math.pow(jsonfinal.percent_change_60d - mean), 2) +
          (Math.pow(jsonfinal.percent_change_30d - mean), 2) +
          (Math.pow(jsonfinal.percent_change_24h - mean), 2) / 3
        );

        intermediateresult =
          20 * (1 / deviation) +
          7 +
          (Math.log(jsonfinal.market_cap) + Math.log(jsonfinal.volume24h));

        scaledresult = (intermediateresult / 60) * 100;

        setresult(scaledresult);
      }
    });
  }

  function DAODetails() {
    return <div className="main">
      <section className="detailPageSec">
        <div className="bgBanner">{/* <img src={bg} alt="" /> */}</div>
        <div className="containerNew">
          <div className="row detailArea">
            <div className="left col-md-8">
              {/* <div className="logo">
              <img src={thisData.image} alt="" height="150px" />
            </div> */}
              <div className="title">
                <div className="title">
                  <img src={thisData.image} alt="" height="150px" />
                  <div className="title-name-details">
                    <div>
                      <h2>{thisData.name}</h2>
                      {/* <h2>Curve Finance</h2> */}
                      <h4 className="tokenh4">${thisData.daoToken}</h4>
                    </div>
                    <ul>
                      <li>
                        <a>
                          <i className="fa-solid fa-globe" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a>
                          {/* <i class="fa-solid fa-m"></i> */}
                          <i className="fa-brands fa-m" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i className="fa-brands fa-twitter" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a>

                          <i className="fa-brands fa-telegram" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i className="fa-solid fa-share-alt" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                    <div className="tabs">
                      <div className="category">
                        <span className="title">CATAGORIES: </span>
                        {thisData.category.map((elem, i) => {
                          return <p key={"detail" + i}>{elem}</p>;
                        })}
                      </div>
                      <div className="chain">
                        <span className="title">CHAIN: </span>
                        <div className="items">
                          {/* {
                                          thisData.chain.map((elem, i) => {
                                              return (
                                                  <p key={i}>{elem}</p>
                                              )
                                          })
                                      } */}
                          <p>{thisData.chain}</p>
                        </div>
                      </div>
                    </div>
                    <div className="getdatabtn">
                      <div
                        className="sideBtns"
                        style={{ color: "white" }}
                      >
                        {finalData.length > 0 ? (
                          <>
                            <i
                              className="fa-solid fa-ellipsis-vertical show-data"
                              onMouseEnter={() =>
                              (document.getElementById(
                                "hide-show-data"
                              ).style.display = "block")
                              }
                              onMouseLeave={() =>
                              (document.getElementById(
                                "hide-show-data"
                              ).style.display = "none")
                              }
                            ></i>
                            <div
                              id="hide-show-data"
                              className="hide-data"
                              style={{
                                position: "relative",
                                backgroundColor: "aqua",
                              }}
                            >
                              <div
                                style={{
                                  position: "absolute",
                                  backgroundColor: "white",
                                  color: "black",
                                  padding: "10px",
                                  width: "350px",
                                  borderRadius: "5px",
                                }}
                              >
                                <p>symbol: {finalData[0].symbol}</p>
                                <p>
                                  circulating_supply:{" "}
                                  {finalData[0].circulating_supply}
                                </p>
                                <p>volume24h: {finalData[0].volume24h}</p>
                                <p>max_supply: {finalData[0].max_supply}</p>
                                <p>market_cap: {finalData[0].market_cap}</p>
                                <p>
                                  percent_change_1h: {finalData[0].percent_change_1h}
                                </p>
                                <p>
                                  percent_change_24h:{" "}
                                  {finalData[0].percent_change_24h}
                                </p>
                                <p>
                                  percent_change_7d: {finalData[0].percent_change_7d}
                                </p>
                                <p>
                                  percent_change_30d:{" "}
                                  {finalData[0].percent_change_30d}
                                </p>
                                <p>
                                  percent_change_60d:{" "}
                                  {finalData[0].percent_change_60d}
                                </p>
                                <p>
                                  percent_change_90d:{" "}
                                  {finalData[0].percent_change_90d}
                                </p>
                                <p>price: {finalData[0].price}</p>
                                <p>total_supply: {finalData[0].total_supply}</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <button onClick={() => getdata(thisData.daoToken)}>
                            {result ? result : "Get Data"}
                          </button>
                        )}
                      </div>

                      {result ? (
                        <div className="sideBtns">
                          <NavLink to="">{result.toFixed(5)}</NavLink>
                        </div>
                      ) : null}

                      <div className="sideBtngreen">
                        <a aria-current="page" class="btn" href="#">Buy Token</a>
                      </div>
                      <div className="sideBtns">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p>{thisData.mission}</p>
              {/* <p>Orca is the easiest way to exchange cryptocurrency on the Solana blockchain. Here, you can exchange tokens with minimal transaction fees and lower latency than any DEX on Ethereum, all while knowing that you’re getting a fair price. Additionally, you may provide liquidity to a trading pool to earn a share of trading fees.</p> */}
            </div>

            <div className="right col-md-4">
              <div className="upvoteBtn">
                <div className="sideBtngreen mb-4">
                  <a aria-current="page" class="btn" href="#">Upvote</a>
                </div>
                <div className="sideBtns" >
                  <button><a aria-current="page" class="btn" href="#">Try it</a></button>
                </div>
              </div>
              <div className="connect d-none">
                <h4>Connect</h4>
                <div className="links">
                  <a
                    href={thisData.website}
                    target="_BLANK"
                    className="website"
                  >
                    <i className="fa-solid fa-globe"></i>{" "}
                    {thisData.website.replace("https://", "")}
                  </a>
                  <a
                    href={thisData.discord}
                    target="_BLANK"
                    className="discord"
                  >
                    <i
                      className="fa-brands fa-discord"
                      style={{ color: "#5865F2" }}
                    ></i>{" "}
                    Discord
                  </a>
                  <a
                    href={thisData.twitter}
                    target="_BLANK"
                    className="twitter"
                  >
                    <i
                      className="fa-brands fa-twitter"
                      style={{ color: "#55ACEE" }}
                    ></i>{" "}
                    Twitter
                  </a>
                  <a
                    href={thisData.whitepaper}
                    target="_BLANK"
                    className="twitter"
                  >
                    <i className="fa-solid fa-file"></i> Whitepaper
                  </a>
                </div>
              </div>
              <div className="other d-none">
                <div className="tokan same">
                  <span>TOKEN</span>
                  <span>${thisData.daoToken}</span>
                </div>
                <div className="treasury same">
                  <span>TREASURY</span>
                  <span>N/A</span>
                </div>
              </div>
            </div>

          </div>

          <div className="row tabSection">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="Overview-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Overview"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Overview
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="Financials-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Financials"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Financials
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="News-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#News"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >
                  News
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="Community-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Community"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >
                  Community
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane tabs-content fade show active"
                id="Overview"
                role="tabpanel"
                aria-labelledby="Overview-tab"
              >
                {
                  proposals ? proposals.map((proposal)=>{
                  return(
                <div>
                  <h6 style={{ marginBottom: "10px" }}>
                    <span> {proposal.title.slice(0,80)}<span className="activetab bg-green">{proposal.state}</span></span>
                  </h6>
                  {/* {thisData.mission} */}
                  <p className="bodytext">
                    {proposal.body.slice(0,200)}
                  </p>
                  <p className="footerText">
                    <a> Read the full proposal</a>
                  </p>
                </div>);
                })
                  : <p>No proposals</p> }
              </div>
              <div
                className="tab-pane fade tabs-content"
                id="Financials"
                role="tabpanel"
                aria-labelledby="Financials-tab"
              >
                  <h6 style={{ marginBottom: "10px" }}>
                    <span> Implementation of Safesnap for FEI<span className="activetab bg-red">Closed</span></span>
                  </h6>
                  {/* {thisData.mission} */}
                  <p className="bodytext">As a relatively new investor in FEI, I am really surprised at the valuation of $Tribe. PCV for the protocol is $408 million, yet real circulating mc stands at $113 million. Even fully diluted, the mc is $250 million, still $150 million away fro...
                  </p>
                  <p className="footerText">
                    Read the full proposal
                  </p>
              </div>
              <div
                className="tab-pane fade tabs-content"
                id="News"
                role="tabpanel"
                aria-labelledby="News-tab"
              >
                <h6 style={{ marginBottom: "10px" }}>
                  <span> Implementation of Safesnap for FEI<span className="activetab bg-red">Closed</span></span>
                </h6>
                {/* {thisData.mission} */}
                <p className="bodytext">As a relatively new investor in FEI, I am really surprised at the valuation of $Tribe. PCV for the protocol is $408 million, yet real circulating mc stands at $113 million. Even fully diluted, the mc is $250 million, still $150 million away fro...
                </p>
                <p className="footerText">
                  Read the full proposal
                </p>
              </div>
              <div
                className="tab-pane fade tabs-content"
                id="Community"
                role="tabpanel"
                aria-labelledby="Community-tab"
              >
                <h6 style={{ marginBottom: "10px" }}>
                  <span> Implementation of Safesnap for FEI<span className="activetab bg-red">Closed</span></span>
                </h6>
                {/* {thisData.mission} */}
                <p className="bodytext">As a relatively new investor in FEI, I am really surprised at the valuation of $Tribe. PCV for the protocol is $408 million, yet real circulating mc stands at $113 million. Even fully diluted, the mc is $250 million, still $150 million away fro...
                </p>
                <p className="footerText">
                  Read the full proposal
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* footer  start*/}
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="left-content">LOGO</h2>

            </div>
            <div className="col-md-6">
              <p className="right-content">© DAO Hunt, 2022</p>
            </div>

          </div>
        </div>
      </div>
      {/* footer  end*/}
    </div>;
  }

  // console.log(thisData.daoToken);
  return (
    <>
      {!thisData ? <p>loging </p> : <DAODetails />}
    </>
  );

};

export default DaoDetail;