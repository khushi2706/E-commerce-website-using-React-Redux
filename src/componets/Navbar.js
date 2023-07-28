import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className="logo">My Store</span>
          <div>
            <Link to="/" className="navLink">
              Home
            </Link>
            <Link to="/cart" className="navLink">
              Cart
            </Link>
            <span className="cartCount"> Cart items : 0</span>
          </div>
        </div>
      </>
    );
  }
}
