import React from "react";

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      isLoading: true,
      failure: false,
      showAlert: false,
    };
  }

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
  }

  componentDidUpdate(prevProps) {
    const { productReducer } = this.props;
    if (
      productReducer.status !== prevProps.productReducer.status &&
      productReducer.status === "reject"
    ) {
      this.setState({
        isLoading: false,
        failure: true,
        showAlert: false,
      });
    }

    if (
      productReducer.status !== prevProps.productReducer.status &&
      productReducer.status === "success"
    ) {
      this.setState({
        products: productReducer.products,
        isLoading: false,
      });
    }
  }

  handleAddToCart = (product) => {
    const { addToCart } = this.props;
    this.setState({ showAlert: true });
    addToCart(product);
  };

  render() {
    const { products, isLoading, showAlert } = this.state;

    return (
      <div>
        {!isLoading ? (
          <div>
            {showAlert && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                Product added to cart
                <button
                  type="button"
                  onClick={() => this.setState({ showAlert: false })}
                  className="close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <div className="productsWrapper">
              {products.map((product) => (
                <div className="custom-card" key={product.id}>
                  <img src={product.image} alt="" />
                  <h5 className="product-title mt-3">
                    {product.title.slice(0, 20)}
                  </h5>
                  <h6>{product.price} Rs</h6>
                  <button
                    className="btn"
                    onClick={() => this.handleAddToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Product;
