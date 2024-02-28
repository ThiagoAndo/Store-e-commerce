import { useContext, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { ProductContext } from "../../store/products-context";
import classes from "./main-header.module.css";

const formatResult = (item) => {
  return (
    <div className="result-wrapper">
      <span className="result-span">{item.name}</span>
    </div>
  );
};

function hadleKey(e) {
  console.log(e);
}
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
      onKeyDown={(e) => {
        hadleKey(e);
      }}
      placeholder={"Search for a product"}
      autoFocus
      styling={{
        height: "39px",
        border: "1px solid #FFFAFA",
        borderRadius: "8px",
        backgroundColor: "#ddd6cb",
        hoverBackgroundColor: "#f9b241",
        color: "#142020",
        fontSize: "20px",
        iconColor: "142020",
        lineColor: "#f9b241",
        placeholderColor: "#142020",
        clearIconMargin: "3px 8px 0 0",
        zIndex: "2",
        fontFamily: "Lato",
      }}
    />
  );
}

export default SearchBar;
