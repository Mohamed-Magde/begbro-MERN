import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Icon from "@material-ui/core/Icon";
import { list } from "./api-product.js";
import Products from "./Products";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: theme.palette.background.paper,
  },
  gridList: {
    display: "flex",
    flexDirection: "column",
    width: "12em",
    transform: "translateZ(0)",
  },
  tileTitle: {
    verticalAlign: "middle",
    lineHeight: 2.5,
    textAlign: "center",
    fontSize: "1.35em",
    margin: "0 4px 0 0",
  },
  card: {
    margin: "auto",
    marginTop: 20,
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    backgroundColor: "#0F3FFF",
    fontSize: "1.1em",
  },
  icon: {
    verticalAlign: "sub",
    color: "#0F3FFF",
    fontSize: "0.9em",
  },
  iconTitle: {
    verticalAlign: "sub",
    color: "#fff",
    fontSize: "0.9em",
  },
  link: {
    color: "#fff",
    textShadow: "0px 0px 0px #ffffff",
    cursor: "pointer",
  },
}));

export default function Categories(props) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(props.categories[0]);
  const [state, setState] = useState(false);
  const deleteProducts = () => {
    setState(!state);
    console.log(state);
  };

  useEffect(() => {}, [props.categories]);

  const getDatta = () => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(
      {
        category: props.categories[0],
      },
      signal
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  };

  const listbyCategory = (category) => (event) => {
    setSelected(category);
    list({
      category: category,
    }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  return (
    <>
      <div className="category">
        <span className="category-title">
          Kategoriler
          <Icon className={classes.iconTitle}>{"arrow_drop_down"}</Icon>
        </span>
        <ul className="category-list">
          {props.categories.map((tile, i) => {
            return (
              <li key={i} className="" onClick={deleteProducts}>
                <span
                  href=""
                  className="category-list-item"
                  onClick={listbyCategory(tile)}
                >
                  {tile}{" "}
                  <Icon className={classes.icon}>
                    {selected == tile && "arrow_drop_down"}
                  </Icon>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="category-wrapper">
        {products.length !== 0 && (
          <div className={state ? "wrapper" : "hidden"}>
            {" "}
            {state && (
              <>
                {" "}
                <div className="ex2" onClick={deleteProducts}></div>
                <Products products={products} searched={false} />
              </>
            )}{" "}
          </div>
        )}
      </div>
    </>
  );
}
Categories.propTypes = {
  categories: PropTypes.array.isRequired,
};
