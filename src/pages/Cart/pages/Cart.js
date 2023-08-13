import React, { Component } from "react";

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    const { cartReducer } = this.props;
    this.setState({ cart: cartReducer.cart });
    console.log(cartReducer);
  }

  handleRemoveCart = (id) => {
    const { removeFromCart } = this.props;
    removeFromCart(id);
  };
  componentDidUpdate(prevProp) {
    const { cartReducer } = this.props;

    if (cartReducer.cart !== prevProp.cartReducer.cart)
      this.setState({
        cart: cartReducer.cart,
      });
  }
  render() {
    const { cart } = this.state;

    return (
      <>
        <div className="container mt-5">
          <div className="row">
            <div className="col-6">
              {cart && cart.length
                ? cart.map((item) => (
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-3 card-body">
                          <img
                            src={item.image}
                            className="img center-block rounded-start"
                            alt={item.title}
                          />
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.price} Rs</p>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <button
                            className=" btn btn-danger mt-5"
                            onClick={() => this.handleRemoveCart(item.id)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                : "there is nothing in your cart go and do shoopppinggg 🛒"}
            </div>
            <div className="col-6">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputAddress2" className="form-label">
                    Address 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress2"
                    placeholder="Apartment, studio, or floor"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputCity" className="form-label">
                    City
                  </label>
                  <input type="text" className="form-control" id="inputCity" />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputZip" className="form-label">
                    Zip
                  </label>
                  <input type="text" className="form-control" id="inputZip" />
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
