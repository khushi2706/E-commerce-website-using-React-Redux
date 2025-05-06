import React from "react";

const CartProductCard = ({ product, onRemove,increase,decrease }) => {
    
  return (
    <div className="cart-card">
      <img src={product.image} alt={product.title} className="cart-card-img" />
      <div className="cart-card-body">
        <h5 className="cart-card-title">{product.title}</h5>
        <p className="cart-card-price">₹{product.price}</p>
        <div className="cart-product-controls">
  <button
    className="quantity-button increase"
    onClick={() => increase(product.id)}
  >
    +
  </button>
  <p className="product-quantity">{product.quantity}</p>
  <button
    className="quantity-button decrease"
    onClick={() => decrease(product.id)}
  >
    -
  </button>
  <button
    className="cart-card-remove"
    onClick={() => onRemove(product.id)}
  >
    Remove
  </button>
</div>

      </div>
    </div>
  );
};

export default CartProductCard;
