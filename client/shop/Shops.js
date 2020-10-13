import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { list } from "./api-shop.js";
import { Link } from "react-router-dom";
import star from "../assets/icon/star.svg";
const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
    textAlign: "center",
    fontSize: "1.2em",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  subheading: {
    color: theme.palette.text.secondary,
  },
  shopTitle: {
    fontSize: "1.2em",
    marginBottom: "5px",
  },
  details: {
    padding: "24px",
  },
}));
export default function Shops() {
  const classes = useStyles();
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setShops(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <div className="popAds">
        <div className="container">
          <h2 className="heading-2">Tüm Mağazalar</h2>
          <div className="popAds-grid">
            {shops.map((shop, i) => {
              return (
                <figure className="popAds-grid-block" key={i}>
                  <img
                    src={
                      "/api/shops/logo/" + shop._id + "?" + new Date().getTime()
                    }
                    alt=""
                  />
                  <figcaption>
                    <span className="popAds-grid-block-title">{shop.name}</span>
                    <p>{shop.description}</p>
                    <div className="popAds-grid-block-info">
                      <Link className="link" to={"/shops/" + shop._id}>
                        Göster
                      </Link>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
