import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";

import { list } from "./api-product.js";
import Products from "./Products";

export default function Search() {
  const [values, setValues] = useState({
    category: "",
    search: "",
    results: [],
    searched: false,
  });
  const [state, setState] = useState(false);
  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };
  const deleteProducts = () => {
    setState(!state);
    console.log(state);
  };
  const search = () => {
    if (values.search) {
      list({
        search: values.search || undefined,
        category: values.category,
      }).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, results: data, searched: true });
        }
      });
    }
  };
  const enterKey = (event) => {
    if (event.keyCode == 13) {
      event.preventDefault();

      search();
    }
  };

  return (
    <>
      <input
        type="search"
        onKeyDown={enterKey}
        onChange={handleChange("search")}
      />
      <button onClick={search}> search</button>

      {state && (
        <>
          <div className={state ? "wrapper" : "hidden"}>
            <div className="ex2" onClick={deleteProducts}></div>
            <Products products={values.results} searched={values.searched} />
          </div>
        </>
      )}
    </>
  );
}
Search.propTypes = {
  categories: PropTypes.array.isRequired,
};
