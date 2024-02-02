import { useContext, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { ProductContext } from "../../store/products-context";
import classes from "./search-bar.module.css";

const formatResult = (item) => {
  return (
    <div className="result-wrapper">
      <span className="result-span">{item.name}</span>
    </div>
  );
};
function SearchBar({ click }) {
  const handleOnSelect = (item) => {
    console.log(item.id);
  };

  const store = useContext(ProductContext);
  store.addTitle();

  return (
    <ReactSearchAutocomplete
      className={classes.search}
      items={store.productsTitle}
      onSelect={handleOnSelect}
      formatResult={formatResult}
      placeholder={"Search for a product"}
      autoFocus
      styling={{
        height: "39px",
        border: "1px solid #FFFAFA",
        borderRadius: "8px",
        backgroundColor: "#5c5553",
        hoverBackgroundColor: "#f9b241",
        color: "#FFFAFA",
        fontSize: "20px",
        iconColor: "white",
        lineColor: "#f9b241",
        placeholderColor: "#FFFAFA",
        clearIconMargin: "3px 8px 0 0",
        zIndex: "2",
      }}
    />
  );
}

export default SearchBar;
