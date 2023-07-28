import React, { useEffect, useState } from "react";
import { setProductsAction } from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";

class Product extends React.Component {
  componentDidMount() {}

  render() {
    const products = [];
    return (
      <>
        <div className="productsWrapper">
          {products &&
            products.map((product) => (
              <div className="card" key={product.id}>
                <img height={80} src={product.image} alt="" />
                <h4>{product.title}</h4>
                <h5>{product.price} Rs</h5>
                <button className="btn">Add To Cart</button>
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default Product;
