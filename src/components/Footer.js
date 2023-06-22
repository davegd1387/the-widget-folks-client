import React from "react";

export const Footer = () => {
  const thisYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <span className="nowrap">Copyright &copy;{thisYear}</span>
      <span className="nowrap"> The Widget Folks</span>
    </footer>
  );
};
