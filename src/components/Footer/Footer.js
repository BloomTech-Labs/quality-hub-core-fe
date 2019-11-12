import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-links">
        <p>About</p>
        <p>Privacy</p>
        <p>Terms</p>
      </div>
      <hr className="footer-line" />
      <div className="footer-icons">
        <img src="fb.svg" alt="" />
        <img src="linkedin.svg" alt="" />
        <img src="twitter.svg" alt="" />
      </div>
      <p className="copyright"> &#169; QualityHub 2019</p>
    </div>
  );
}
