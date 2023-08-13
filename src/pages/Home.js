import React, { Component } from "react";
import Product from "./Product/container/productContainer";

export default class Home extends Component {
  render() {
    return (
      <>
        <div className="mt-4">
          <Product />
        </div>
      </>
    );
  }
}
