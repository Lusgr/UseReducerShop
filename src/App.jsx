import React, { useReducer } from 'react';

const products = [
  { id: 1, name: 'Oil 1', price: 10 },
  { id: 2, name: 'Oil 2', price: 15 },
  { id: 3, name: 'Oil 3', price: 20 },
];

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.findIndex((item) => item.product.id === action.product.id);
      if (existingItemIndex !== -1) {
        const updatedCart = state.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        return updatedCart;
      } else {
        return [...state, { product: action.product, quantity: 1 }];
      }
    case 'INCREASE_QUANTITY':
      const increasedCart = state.map((item) =>
        item.product.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return increasedCart;
    case 'DECREASE_QUANTITY':
      const decreasedCart = state.map((item) =>
        item.product.id === action.product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      return decreasedCart.filter((item) => item.quantity > 0);
    default:
      return state;
  }
};

const App = () => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const increaseQuantity = (product) => {
    dispatch({ type: 'INCREASE_QUANTITY', product });
  };

  const decreaseQuantity = (product) => {
    dispatch({ type: 'DECREASE_QUANTITY', product });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Oil Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>${product.price}</span>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.product.id}>
            <span>{item.product.name}</span>
            <span>Quantity: {item.quantity}</span>
            <span>Total: ${item.product.price * item.quantity}</span>
            <button onClick={() => increaseQuantity(item.product)}>+</button>
            <button onClick={() => decreaseQuantity(item.product)}>-</button>
          </li>
        ))}
      </ul>
      <h3>Total Price: ${getTotalPrice()}</h3>
    </div>
  );
};

export default App;

