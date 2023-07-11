import { createContext, useContext, useState } from "react";

const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (itemId) => {
    const currItem = cartItems.find((item) => {
      return item.itemId === itemId;
    });

    if (currItem) {
      // console.log(`updating itemId: ${itemId}`);
      const oldCart = cartItems.filter((item) => {
        return item.itemId !== itemId;
      });
      // console.log(`oldCart: ${JSON.stringify(oldCart)}`);
      setCartItems([
        ...oldCart,
        { itemId: currItem.itemId, quantity: (currItem.quantity += 1) },
      ]);
    } else {
      // console.log(`adding itemId: ${itemId}`);
      const newItem = { itemId: itemId, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }
  };
  const loadProducts = (prods) => {
    setProducts(prods);
  };
  const removeFromCart = (itemId) => {
    const currItem = cartItems.find((item) => {
      return item.itemId === itemId;
    });
    if (currItem) {
      // console.log(`decrementing itemId: ${itemId}`);
      const oldCart = cartItems.filter((item) => {
        return item.itemId !== itemId;
      });
      // console.log(`oldCart: ${JSON.stringify(oldCart)}`);
      if (currItem.quantity > 1) {
        setCartItems([
          ...oldCart,
          { itemId: currItem.itemId, quantity: (currItem.quantity -= 1) },
        ]);
      } else {
        setCartItems(oldCart);
      }
    }
  };

  const inCart = (itemId) => {
    // console.log(`itemId: ${itemId}`);
    const currItem = cartItems.find((item) => {
      return item.itemId === itemId;
    });
    // console.log(`currItem: ${JSON.stringify(currItem)}`);
    if (currItem) {
      return currItem.quantity;
    } else {
      return false;
    }
  };
  const clearCart = () => setCartItems([]);

  const updateCartItemQuantity = (newQuantity, itemId) => {
    // setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
    const currItem = cartItems.find((item) => {
      return item.itemId === itemId;
    });
    if (currItem) {
      // console.log(`using input for itemId: ${itemId}`);
      const oldCart = cartItems.filter((item) => {
        return item.itemId !== itemId;
      });
      // console.log(`oldCart: ${JSON.stringify(oldCart)}`);
      if (newQuantity > 0) {
        setCartItems([
          ...oldCart,
          { itemId: currItem.itemId, quantity: newQuantity },
        ]);
      } else {
        setCartItems(oldCart);
      }
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    cartItems.map((item) => {
      // console.log(`item from cart${JSON.stringify(item)}`);
      totalAmount +=
        item.quantity *
        products.find((product) => product.itemId === item.itemId).price;
    });
    return totalAmount;
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getTotalCartAmount,
    loadProducts,
    clearCart,
    inCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export const useShop = () => {
  return useContext(ShopContext);
};
