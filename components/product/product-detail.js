import { useContext, useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { ProductContext } from "../../store/context/products-context";
import { useRouter } from "next/router";
import classes from "./main-header.module.css";

/**
 * SearchBar Component:
 * A search bar that allows users to search for products by title.
 * It uses `ReactSearchAutocomplete` to provide an autocomplete dropdown with product titles.
 * Upon selection, the user is redirected to the product details page.
 */

// Custom function to format the search results
const formatResult = (item) => {
  return (
    <div className="result-wrapper">
      <span className="result-span">{item.name}</span>
    </div>
  );
};

// Handles keyboard events for additional features (if needed)
function handleKey(e) {
  console.log(e);
}

const initialState = []; // Initial empty state for search items

function SearchBar() {
  const [items, setItems] = useState(initialState); // Holds product titles for autocomplete
  const router = useRouter(); // Next.js router for navigation
  const store = useContext(ProductContext); // Access product context

  // Triggered when a user selects an item from the search results
  const handleOnSelect = (item) => {
    router.push(`/product/${item.id}`); // Navigate to the selected product's page
  };

  // Ensure product titles are added to the context
  store.addTitle();

  // Populate the search items when the component mounts
  useEffect(() => {
    if (items.length === 0) {
      setItems(store.productsTitle); // Load product titles from context
    }
  }, [items, store.productsTitle]);

  return (
    <ReactSearchAutocomplete
      className={classes.search}
      items={items} // List of searchable items
      onSelect={handleOnSelect} // Handle item selection
      formatResult={formatResult} // Customize the result display
      onKeyDown={(e) => {
        handleKey(e); // Optional keyboard event handling
      }}
      placeholder={"Search for a product"} // Placeholder text
      autoFocus // Automatically focus the search bar
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
        zIndex: "-1000",
        fontFamily: "Lato",
      }} // Styling for the search bar
    />
  );
}

export default SearchBar;
