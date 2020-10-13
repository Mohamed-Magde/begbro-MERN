import React, { Fragment, useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";
import CartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import cart from "./../cart/cart-helper";
import searchMobile from "../assets/icon/search.svg";
import logoMobile from "../assets/icon/logo.svg";
import logo from "../assets/img/logo.png";
import logoSecond from "../assets/img/logo-1.png";
import heart from "../assets/icon/heart.svg";
import shopping from "../assets/icon/shopping.svg";
import profile from "../assets/icon/profile.svg";
import phone from "../assets/icon/phone.svg";
import { list } from "../product/api-product.js";
import Products from "../product/Products";
import Categories from "../product/Categories";

import { listCategories } from "./../product/api-product.js";

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: "#bef67a" };
  else return { color: "#ffffff" };
};
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path)) return { color: "#bef67a" };
  else return { color: "#ffffff" };
};

const MenuSearch = () => {
  const [values, setValues] = useState({
    category: "",
    search: "",
    results: [],
    searched: false,
  });
  const [state, setState] = useState(false);
  const deleteProducts = () => {
    setState(!state);
    console.log(state);
  };
  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };
  const search = () => {
    deleteProducts();
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
      <div class="container">
        <figure class="nav-mid-logo">
          <Link exact to="/">
            {" "}
            <img src={logoSecond} alt />{" "}
          </Link>
        </figure>
        <div class="nav-mid-search">
          <input
            type="search"
            onKeyDown={enterKey}
            onChange={handleChange("search")}
            className="nav-mid-search-item"
          />
          <button onClick={search} class="btn-search">
            Arama
          </button>
        </div>
        <ul class="nav-mid-info">
          <li>
            <Link to="/" class="nav-mid-info-item">
              <img src={heart} alt />
            </Link>
          </li>
          <li>
            <Link to="/cart" class="nav-mid-info-item ">
              <div className="cart">
                <img src={shopping} alt />
                <p className="cart-item-total">{cart.itemTotal()}</p>
              </div>
            </Link>
          </li>
          {auth.isAuthenticated() && (
            <li>
              <Link
                to=""
                class="nav-mid-info-item"
                to={"/user/" + auth.isAuthenticated().user._id}
              >
                {" "}
                <img src={profile} alt />
              </Link>
            </li>
          )}

          <li>
            {!auth.isAuthenticated() && (
              <Link to="/signup" class="nav-mid-info-item">
                <p>register</p>
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div className={state ? "wrapper" : "hidden"}>
        {state && (
          <>
            <div className="ex2" onClick={deleteProducts}></div>
            <Products products={values.results} searched={values.searched} />
          </>
        )}
      </div>
    </>
  );
};

const RenderCategory = () => {
  const [categories, setCategories] = useState([]);
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
      <Categories categories={categories} />
    </>
  );
};

const NavMenu = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
    console.log("toogle is : ", toggle);
  };
  return (
    <nav className="mobile-nav">
      <div className="container">
        <figure>
          <div onClick={handleToggle} className="sandwich">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <img className="mobile-nav-logo" src={logoMobile} />
          <figcaption>
            <img src={searchMobile} alt />
            <p>EN</p>
          </figcaption>
        </figure>
      </div>

      <div className={toggle ? "nav-down" : "nav-hidden"}>
        <div className="container">
          <ul className="nav-down-list">
            <li onClick={handleToggle}>
              <Link to="/shops/all" className="nav-down-list-item">
                Şirketler
              </Link>
            </li>
            <li onClick={handleToggle}>
              <RenderCategory />
            </li>
            <li onClick={handleToggle}>
              {!auth.isAuthenticated() && (
                <>
                  <Link className="nav-down-list-item" to="/signup">
                    Kaydol
                  </Link>
                  <Link to="/signin" className="nav-down-list-item">
                    Oturum Aç
                  </Link>
                </>
              )}
            </li>

            {auth.isAuthenticated() && (
              <>
                {auth.isAuthenticated().user.seller && (
                  <li onClick={handleToggle}>
                    <Link className="nav-down-list-item" to="/seller/shops">
                      Dükkanlarım
                    </Link>
                    <Link className="nav-down-list-item" to="/myauctions">
                      My Auctions
                    </Link>
                  </li>
                )}
                <li onClick={handleToggle}>
                  <Link
                    className="nav-down-list-item"
                    to={"/user/" + auth.isAuthenticated().user._id}
                  >
                    Profilim
                  </Link>
                </li>
                <li onClick={handleToggle}>
                  <button
                    className="nav-down-list-item"
                    color="inherit"
                    onClick={() => {
                      auth.clearJWT(() => history.push("/"));
                    }}
                  >
                    Oturumu Kapat
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Menu = withRouter(({ history }) => (
  <>
    <>
      <NavMenu />
      <nav className="nav">
        <div className="nav-upper">
          <div className="container">
            <div className="nav-upper-block en">
              <figure>
                <img className="en-img" src={logo} alt />
              </figure>
              <span className="en-text">English</span>
            </div>
            <div className="nav-upper-block">
              <span>US Doller</span>
            </div>
            <div className="nav-upper-block">
              <span>Track Your Order</span>
            </div>
          </div>
        </div>
        <div className="nav-mid">
          <MenuSearch />
        </div>

        <div className="nav-down">
          <div className="container">
            <ul className="nav-down-list">
              <li>
                <Link to="/shops/all" className="nav-down-list-item">
                  Şirketler
                </Link>
              </li>
              <li>
                <RenderCategory />
              </li>
              <li>
                {!auth.isAuthenticated() && (
                  <>
                    <Link className="nav-down-list-item" to="/signup">
                      Kaydol
                    </Link>
                    <Link to="/signin" className="nav-down-list-item">
                      Oturum Aç
                    </Link>
                  </>
                )}
              </li>

              {auth.isAuthenticated() && (
                <>
                  {auth.isAuthenticated().user.seller && (
                    <li>
                      <Link className="nav-down-list-item" to="/seller/shops">
                        Dükkanlarım
                      </Link>
                      <Link className="nav-down-list-item" to="/myauctions">
                        Artırmalarım
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      className="nav-down-list-item"
                      to={"/user/" + auth.isAuthenticated().user._id}
                    >
                      Profilim
                    </Link>
                  </li>
                  <li>
                    <button
                      className="nav-down-list-item"
                      color="inherit"
                      onClick={() => {
                        auth.clearJWT(() => history.push("/"));
                      }}
                    >
                      Oturumu Kapat
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  </>
));

export default Menu;
