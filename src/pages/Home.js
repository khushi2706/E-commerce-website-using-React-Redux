import React, { Component } from "react";
import Product from "./Product/container/productContainer";

export default class Home extends Component {
  render() {
    return (
      <>
        <h2>Welcome to store</h2>
        <Product />
      </>
    );
  }
}
