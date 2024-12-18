"use client";
import React from "react";

export default function Nav({ isArrow = true, textColor = "", Linkfs = "" }) {
  return (
    <>
      {" "}
      <li className="menu-item">
        <a href="/" className={`item-link ${Linkfs} ${textColor}`}>
          Home
          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
      </li>
      <li className="menu-item">
        <a href="/shop" className={`item-link ${Linkfs} ${textColor}`}>
          Shop
          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
      </li>
      <li className="menu-item">
        <a href="#" className={`item-link ${Linkfs} ${textColor}`}>
          Contact Us
          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
      </li>
    </>
  );
}
