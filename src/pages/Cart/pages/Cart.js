import React, { Component } from "react";
import CartProductCard from "../../../componets/CardProducts";

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      address: "",
      city: "",
      zip: "",
      errors: {},
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleRemove = (id) => {
    this.props.removeFromCart(id);
  };

  handleIncreaseQuantity = (id) => {
    this.props.increaseQuantity(id);
  };

  handleDecreaseQuantity = (id) => {
    this.props.decreaseQuantity(id);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, address, city, zip } = this.state;
    const errors = {};

    // Validations
    if (!email.includes("@")) {
      errors.email = "Please enter a valid email address";
    }
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (address.trim() === "") {
      errors.address = "Address is required";
    }
    if (city.trim() === "") {
      errors.city = "City is required";
    }
    if (zip.trim() === "") {
      errors.zip = "Zip code is required";
    }

    // If no errors, proceed
    if (Object.keys(errors).length === 0) {
      console.log("Form is valid. Proceed with checkout.");
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { errors } = this.state;
    const { cart, totalPrice } = this.props.cartReducer;

    return (
      <div className="cart-container">
        <div className="cart-items">
          <h2>Your Cart</h2>
          {cart.length > 0 ? (
            cart.map((product) => (
              <CartProductCard
                key={product.id}
                product={product}
                onRemove={this.handleRemove}
                increase={this.handleIncreaseQuantity}
                decrease={this.handleDecreaseQuantity}
              />
            ))
          ) : (
            <p style={{fontSize:"1.5rem",text:"gray"}}>Your cart is empty</p>
          )}
        </div>

        <div className="checkout-section">
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          <form onSubmit={this.handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                className={`form-input ${errors.email ? "input-error" : ""}`}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                className={`form-input ${errors.password ? "input-error" : ""}`}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={this.state.address}
                onChange={this.handleInputChange}
                className={`form-input ${errors.address ? "input-error" : ""}`}
                placeholder="Enter your address"
              />
              {errors.address && <p className="error-message">{errors.address}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={this.state.city}
                onChange={this.handleInputChange}
                className={`form-input ${errors.city ? "input-error" : ""}`}
              />
              {errors.city && <p className="error-message">{errors.city}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="zip">Zip</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={this.state.zip}
                onChange={this.handleInputChange}
                className={`form-input ${errors.zip ? "input-error" : ""}`}
              />
              {errors.zip && <p className="error-message">{errors.zip}</p>}
            </div>

            <button type="submit" className="checkout-btn">
              Checkout
            </button>
          </form>
        </div>
      </div>
    );
  }
}
