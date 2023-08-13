import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      cartCount: 0,
    };
  }

  componentDidUpdate(state) {
    const { cartReducer } = this.props;
    if (cartReducer.cart !== state.cartReducer.cart)
      this.setState({ cartCount: cartReducer.cart.length });
  }
  render() {
    const { cartCount } = this.state;
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
            <span className="cartCount"> Cart items : {cartCount}</span>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cartReducer: state.cartReducer,
});

export default connect(mapStateToProps)(Navbar);
