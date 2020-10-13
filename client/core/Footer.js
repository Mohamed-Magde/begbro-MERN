import React from "react";
import logo from "../assets/img/logo-footer.png";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <figure>
          <img src={logo} alt />
        </figure>

        <div className="footer-content">
          <div className="footer-content-category">
            <p className="footer-title">Kategori</p>
            <ul className="footer-content-category-list">
              <li>
                <div className="footer-content-category-list-item">
                  <a href>Kategori 1</a>
                  <a href>Kategori 1</a>
                </div>
              </li>
              <li>
                <div className="footer-content-category-list-item">
                  <a href>Kategori 2</a>
                  <a href>Kategori 2</a>
                </div>
              </li>
              <li>
                <div className="footer-content-category-list-item">
                  <a href>Kategori 3</a>
                  <a href>Kategori 3</a>
                </div>
              </li>
              <li>
                <div className="footer-content-category-list-item">
                  <a href>Kategori 4</a>
                  <a href>Kategori 4</a>
                </div>
              </li>
              <li>
                <div className="footer-content-category-list-item">
                  <a href>Kategori 5</a>
                  <a href>Kategori 5</a>
                </div>
              </li>
              <li>
                <div className="footer-content-category-list-item">
                  <a href>Kategori 6</a>
                  <a href>Kategori 6</a>
                </div>
              </li>
            </ul>
          </div>
          <div className="footer-content-leagel">
            <p className="footer-title">Leagel</p>
            <ul>
              <li>
                <a href>Politika</a>
              </li>
              <li>
                <a href>Dönem ve Koşullar</a>
              </li>
            </ul>
          </div>
          <form className="footer-content-form">
            <p className="footer-title">Bize Ulaşın</p>
            <div className="footer-content-form-group">
              <input type="text" placeholder="Name" />
            </div>
            <div className="footer-content-form-group">
              <input type="email" placeholder="Email" />
            </div>
            <div className="footer-content-form-group">
              <textarea
                name
                id
                cols="30"
                rows="10"
                placeholder="Message"
              ></textarea>
            </div>
            <div className="btn-search"> Sunmak</div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
