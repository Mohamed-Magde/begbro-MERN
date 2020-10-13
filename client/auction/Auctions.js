import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import Divider from "@material-ui/core/Divider";
import DeleteAuction from "./DeleteAuction";
import auth from "../auth/auth-helper";
import { Link } from "react-router-dom";
import Auction from "./Auction";

const calculateTimeLeft = (date) => {
  const difference = date - new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      timeEnd: false,
    };
  } else {
    timeLeft = { timeEnd: true };
  }
  return timeLeft;
};

export default function Auctions(props) {
  const currentDate = new Date();
  const showTimeLeft = (date) => {
    let timeLeft = calculateTimeLeft(date);
    return (
      !timeLeft.timeEnd && (
        <span>
          {timeLeft.days != 0 && `${timeLeft.days} d `}
          {timeLeft.hours != 0 && `${timeLeft.hours} h `}
          {timeLeft.minutes != 0 && `${timeLeft.minutes} m `}
          {timeLeft.seconds != 0 && `${timeLeft.seconds} s`} left
        </span>
      )
    );
  };
  const auctionState = (auction) => {
    return (
      <span>
        {currentDate < new Date(auction.bidStart) &&
          `Auction Starts at ${new Date(auction.bidStart).toLocaleString()}`}
        {currentDate > new Date(auction.bidStart) &&
          currentDate < new Date(auction.bidEnd) && (
            <>
              {`Auction is live | ${auction.bids.length} bids |`}{" "}
              {showTimeLeft(new Date(auction.bidEnd))}
            </>
          )}
        {currentDate > new Date(auction.bidEnd) &&
          `Auction Ended | ${auction.bids.length} bids `}
        {currentDate > new Date(auction.bidStart) &&
          auction.bids.length > 0 &&
          ` | Last bid: $ ${auction.bids[0].bid}`}
      </span>
    );
  };
  return (
    <>
      <div className="auction">
        <div className="container">
          {props.auctions.length !== 0 && (
            <h2 className="heading-2">All Auctions</h2>
          )}

          <div className="auction-grid">
            {props.auctions.map((auction, i) => {
              return (
                <figure className="auction-grid-block" key={i}>
                  <img
                    src={
                      "/api/auctions/image/" +
                      auction._id +
                      "?" +
                      new Date().getTime()
                    }
                    alt=""
                  />
                  <figcaption>
                    <span className="auction-grid-block-title">
                      {auction.itemName}
                    </span>
                    <p className="auction-grid-block-desc">
                      {" "}
                      {auctionState(auction)}
                    </p>

                    <div className="auction-grid-block-info">
                      <Link className="link" to={"/auction/" + auction._id}>
                        view
                      </Link>

                      {auth.isAuthenticated().user &&
                        auth.isAuthenticated().user._id ==
                          auction.seller._id && (
                          <>
                            <Link
                              className=" link edit"
                              to={"/auction/edit/" + auction._id}
                            >
                              edit
                            </Link>

                            <DeleteAuction
                              className=" link delete"
                              auction={auction}
                              onRemove={props.removeAuction}
                            />
                          </>
                        )}
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

Auctions.propTypes = {
  auctions: PropTypes.array.isRequired,
  removeAuction: PropTypes.func.isRequired,
};
