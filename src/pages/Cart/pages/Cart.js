import React, { Component } from "react";

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      email: "",
      password: "",
      address: "",
      city: "",
      zip: "",
      errors: {},
    };
  }

  // ...

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, address, city, zip } = this.state;
    const errors = {};

    if (!email.includes("@")) {
      errors.email = "Please enter a valid email address";
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
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

    if (Object.keys(errors).length === 0) {
      // Form is valid, you can proceed with checkout
      // You may want to submit the form or take appropriate action here
      console.log("Form is valid. Proceed with checkout.");
    } else {
      this.setState({ errors });
    }
  }

  render() {
    const { cart, errors } = this.state;

    return (
      <>
        <div className="container mt-5">
          <div className="row">
            <div className="col-6">
              {/* Cart items */}
            </div>
            <div className="col-6">
              <form className="row g-3" onSubmit={this.handleSubmit}>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="inputEmail4"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    id="inputPassword4"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    id="inputAddress"
                    name="address"
                    value={this.state.address}
                    onChange={this.handleInputChange}
                    placeholder="1234 Main St"
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputCity" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.city ? "is-invalid" : ""}`}
                    id="inputCity"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleInputChange}
                  />
                  {errors.city && (
                    <div className="invalid-feedback">{errors.city}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputZip" className="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.zip ? "is-invalid" : ""}`}
                    id="inputZip"
                    name="zip"
                    value={this.state.zip}
                    onChange={this.handleInputChange}
                  />
                  {errors.zip && (
                    <div className="invalid-feedback">{errors.zip}</div>
                  )}
                </div>
                <div className="col-12 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Check out
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
