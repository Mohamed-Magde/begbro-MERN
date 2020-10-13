import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import star from "../assets/icon/star.svg";
import { popAds } from "../dataFake";
import location from "../assets/icon/location.svg";
export default function Suggestions(props) {
  const { title, items } = popAds;
  return (
    <>
      <div className="popAds">
        <div className="container">
          <h2 className="heading-2">Popüler İlanlar</h2>
          <div className="popAds-grid">
            {props.products.map((item, i) => {
              return (
                <figure className="popAds-grid-block" key={i}>
                  <img src={"/api/product/image/" + item._id} alt="" />
                  <figcaption>
                    <span className="popAds-grid-block-title">{item.name}</span>
                    <p>{item.description}</p>
                    <div className="popAds-grid-block-info">
                      <div className="rate">
                        <img src={star} alt="" />
                        <p> {item.quantity} </p>
                      </div>

                      <div className="price">
                        <p>{item.price} $</p>
                      </div>
                    </div>
                    <Link className="link" to={"/product/" + item._id}>
                      Göster
                    </Link>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>

      {props.products.length === 0 && (
        <>
          <div className="popAds">
            <div className="container">
              <h2 className="heading-2">{title}</h2>
              <div className="popAds-grid">
                {items.map((item) => {
                  const { id, img, name, desc, rate, price } = item;
                  return (
                    <figure className="popAds-grid-block" key={id}>
                      <img src={img} alt="" />
                      <figcaption>
                        <span className="popAds-grid-block-title">{name}</span>
                        <p>{desc}</p>
                        <div className="popAds-grid-block-info">
                          <div className="rate">
                            <img src={rate.img} alt="" />
                            <p>{rate.desc}</p>
                          </div>
                          <div className="price">
                            <img src={price.img} alt="" />
                            <p>{price.desc}</p>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="last">
        <div className="container">
          <div className="last-title">
            <img src={location} alt="" />
            <p className="last-title-text">
              last added
              <span>in</span>
              real estate
            </p>
            <p>View all</p>
          </div>
          <div className="last-grid">
            {props.products.map((item, i) => {
              return (
                <figure className="last-grid-block">
                  <img src={"/api/product/image/" + item._id} alt="" />
                  <figcaption>
                    <span>{item.name}</span>
                    <div className="last-grid-block-info">
                      <div className="rate">
                        <img src={star} alt="" />
                        <p> {item.quantity} </p>
                      </div>
                      <Link className="link" to={"/product/" + item._id}>
                        view
                      </Link>
                      <div className="price">
                        <p>{item.price} $</p>
                      </div>
                    </div>

                    <div className="last-grid-block-location">
                      <img src="" alt="" />
                      <p>istanbul-turkey</p>
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

Suggestions.propTypes = {
  products: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
