import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-links">
        <a href="#">
          <p>About</p>
        </a>
        <a href="#">
          <p>Privacy</p>
        </a>
        <a href="#">
          <p>Terms</p>
        </a>
      </div>
      <hr className="footer-line" />
      <div className="footer-icons">
        <a href="#">
          <img src="fb.svg" alt="" />
        </a>
        <a href="#">
          <img src="linkedin.svg" alt="" />
        </a>
        <a href="#">
          <img src="twitter.svg" alt="" />
        </a>
      </div>
      <p className="copyright"> &#169; QualityHub 2019</p>
    </div>
  );
}
