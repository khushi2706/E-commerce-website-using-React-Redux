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
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                Product added to cart
                <button
                  type="button"
                  onClick={() => this.setState({ showAlert: false })}
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <div className="flex flex-wrap mx-14">
              {products.map((product) => (
                <div
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                  key={product.id}
                >
                  <div className="border border-gray-300 p-4 rounded-lg">
                    <img
                      src={product.image}
                      alt=""
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <h5 className="mt-3 text-xl font-semibold">
                      {product.title.slice(0, 20)}
                    </h5>
                    <h6 className="text-lg text-gray-600">
                      {product.price} Rs
                    </h6>
                    <button
                      className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => this.handleAddToCart(product)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div
              className="animate-spin h-10 w-10 border-4 border-t-blue-500 border-blue-200 rounded-full"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Product;
