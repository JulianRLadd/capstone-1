import React, { useState, useEffect } from "react";
import itemData from "./items.json";
import { pics } from "./assets/index";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  let [total, setTotal] = useState(0);

  useEffect(() => {
    setItems(itemData);
  }, []);

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const purchaseItems = () => {
    const newCart = [];
    setCartItems(newCart);

    const newAmount = 0;
    setTotal(newAmount);
    alert("Thank you for your purchase! Come back again!");
  };

  const moveToCart = (item) => {
    if (items[item.id].quantity === 0) {
      alert("I'm sorry, but this item is out of stock");
    } else {
      const newItem = { ...item, quantity: 1 };
      const newCartItem = [...cartItems, newItem];
      setCartItems(newCartItem);

      const amount = parseFloat(item.price);
      const newAmount = total + amount;
      setTotal(newAmount);

      const updatedItem = {
        ...items[item.id],
        quantity: items[item.id].quantity - 1,
      };
      const newItemList = [...items];
      newItemList.splice(item.id, 1, updatedItem);
      setItems(newItemList);
    }
  };

  const handleSubmit = (target) => {
    if (!value) return;
    const new_products = items.filter((e) => {
      return Object.values(e).includes(capitalize(value));
    });
    if (new_products == false) {
      alert("I'm sorry, your search results failed");
      target.preventDefault();
      setValue("");
    } else {
      const newFiltered = [...new_products];
      setFilteredItems(newFiltered);
      target.preventDefault();
      setValue("");
    }
  };

  return (
    <div className="App">
      {/* HERE BE THE HEADER */}
      <header className="header">
        <form onSubmit={handleSubmit}>
          <input
            name="test"
            placeholder="Search for an item"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          ></input>
          <button className="buttons">Submit</button>
        </form>
        <h3>
          <span>Lawn Tools 4 You</span>
        </h3>
      </header>
      <div className="main">
        {/* HERE BE THE GALLERY */}
        <div className="gallery">
          <div className="stickyHeader">
            <h4>
              <span>Gallery</span>
            </h4>
            <p>(Scroll down on each image for details)</p>
          </div>
          {items.map((itemDetail, index) => {
            return (
              <div className="items disable-scrollbars">
                <img
                  src={pics[index]}
                  alt="Garden Item"
                  onClick={() => moveToCart(items[index])}
                />
                <button
                  className="sticky"
                  onClick={() => moveToCart(items[index])}
                >
                  Add To Cart ({itemDetail.quantity})
                </button>
                <p>{itemDetail.name}</p>
                <p>${itemDetail.price}</p>
                <p>{itemDetail.manufacturer}</p>
                <p>{itemDetail.category}</p>
                <p>{itemDetail.serialNum}</p>
              </div>
            );
          })}
        </div>
        {/* HERE BE THE SEARCH RESULTS */}
        <div className="sidebar">
          <section>
            <h4>
              <span>Search Results</span>
            </h4>
          </section>
          <div className="results">
            {filteredItems.map((item, index) => {
              return (
                <section
                  className="unit"
                  onClick={() => moveToCart(items[item.id])}
                >
                  <img src={pics[item.id]} alt="Garden Item" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                </section>
              );
            })}
          </div>
        </div>
      </div>
      {/* HERE BE THE CART */}
      <footer className="footer">
        <header>
          <h4>
            <span>Cart Items</span>
          </h4>
        </header>
        <div className="row">
          <div className="purchase">
            {cartItems.map((item, index) => {
              return (
                <div className="unit">
                  <img src={pics[item.id]} alt="Garden Item" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                </div>
              );
            })}
          </div>
          <div className="endpoint">
            <button onClick={() => purchaseItems([])}>Purchase Items</button>$
            {total}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
