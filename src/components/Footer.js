import React from "react";
import "./footer.css";
export const Footer = () => {
  const thisYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__para nowrap">
        <a
          rel="stylesheet"
          href="https://github.com/davegd1387/the-widget-folks-client"
          target="_blank"
        >
          github the-widget-folks-client
        </a>
      </p>
      <p className="footer__para">
        <span className="nowrap">
          Copyright &copy;{thisYear} The Widget Folks
        </span>
      </p>
      {/* <p className="footer__para">
        <span className="nowrap">Copyright &copy;{thisYear}</span>
        <span className="nowrap"> The Widget Folks</span>
      </p> */}
      <p className="footer__para nowrap">
        <a
          rel="stylesheet"
          href="https://github.com/davegd1387/the-widget-folks-serverless"
          target="_blank"
        >
          github the-widget-folks-serverless
        </a>
      </p>
    </footer>
  );
};
