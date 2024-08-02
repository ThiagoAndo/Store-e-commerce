import { useContext, useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { ProductContext } from "../../store/context/products-context";
import { useRouter } from "next/router";
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
const initialState = [];
function SearchBar() {
  const [items, setItems] = useState(initialState);

  const router = useRouter();
  const handleOnSelect = (item) => {
    router.push(`/product/${item.id}`);
  };

  const store = useContext(ProductContext);
  store.addTitle();

  useEffect(() => {
    if (items.length === 0) setItems(store.productsTitle);
  }, []);

  return (
    <ReactSearchAutocomplete
      className={classes.search}
      items={items}
      onSelect={handleOnSelect}
      formatResult={formatResult}
      onKeyDown={(e) => {
        hadleKey(e);
      }}
      placeholder={"Search for a product"}
      autoFocus
      styling={{
        height: "45px",
        border: "1px solid #FFFAFA",
        borderRadius: "8px",
        backgroundColor: "#212020",
        hoverBackgroundColor: "#ff9b05",
        color: "white",
        fontSize: "20px",
        iconColor: "white",
        lineColor: "#f9b241",
        placeholderColor: "white",
        clearIconMargin: "3px 8px 0 0",
        zIndex: "1000",
        fontFamily: "Lato",
      }}
    />
  );
}

export default SearchBar;
