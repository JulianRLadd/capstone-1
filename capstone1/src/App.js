import React, { useState } from "react";
import items from "./items.json";
import { pics } from "./assets/index";
import "./App.css";

function App() {
  const [value, setValue] = useState("");

  return (
    <div className="App">
      {/* HERE BE THE HEADER */}
      <header className="header">
        <input
          name="test"
          placeholder="Search for an item"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        ></input>
      </header>
      <div className="main">
        {/* HERE BE THE GALLERY */}
        <div className="gallery">
          {items.map((itemDetail, index) => {
            return (
              <div className="items">
                <img src={pics[index]} alt="Garden Item" />
                <p>{itemDetail.picture}</p>
                <p>{itemDetail.name}</p>
                <p>${itemDetail.price}</p>
                <p>{itemDetail.manufacturer}</p>
                <p>{itemDetail.category}</p>
                <p>{itemDetail.serialNum}</p>
              </div>
            );
          })}
        </div>
        {/* HERE BE THE SIDEBAR CART */}
        <div className="sidebar"></div>
      </div>
      {/* HERE BE THE FOOTER */}
      <footer className="footer">
        <i className="">Bla Bla Bla Footer</i>
      </footer>
    </div>
  );
}

export default App;
