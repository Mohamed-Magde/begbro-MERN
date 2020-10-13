import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Suggestions from "./../product/Suggestions";
import { listLatest, listCategories } from "./../product/api-product.js";
import Search from "./../product/Search";
import Categories from "./../product/Categories";
import Shops from "../shop/Shops";
import Auctions from "../auction/Auctions";

const useStyles = makeStyles((theme) => ({}));

export default function Home() {
  const [suggestionTitle, setSuggestionTitle] = useState("Popular Ads");
  const [categories, setCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listLatest(signal).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setSuggestions(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listCategories(signal).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Shops />
      <Suggestions products={suggestions} title={suggestionTitle} />
    </>
  );
}
