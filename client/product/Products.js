import React, { useState } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import AddToCart from "./../cart/AddToCart";
import { set } from "lodash";

export default function Products(props) {
  return (
    props.products.length !== 0 && (
      <div className="category-product">
        {props.products.length > 0 ? (
          <>
            {props.products.map((product, i) => (
              <div className="category-product-item" key={i}>
                <Link
                  className="category-product-item-img"
                  to={"/product/" + product._id}
                >
                  <img
                    src={"/api/product/image/" + product._id}
                    alt={product.name}
                  />
                </Link>

                <div className="category-product-item-info">
                  <Link
                    className="category-product-item-info-link"
                    to={"/product/" + product._id}
                  >
                    {product.name}
                  </Link>
                  <div className="category-product-item-info-price">
                    <span> $ {product.price}</span>
                    <AddToCart item={product} />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          props.searched && <p>No products found! :(</p>
        )}
      </div>
    )
  );
}
Products.propTypes = {
  products: PropTypes.array.isRequired,
  searched: PropTypes.bool.isRequired,
};
