import { useEffect, createContext, useState } from "react";

// Initialize the ProductContext with default values and placeholder functions
export const ProductContext = createContext({
  products: [],
  men: [],
  woman: [],
  elctronics: [],
  home: [],
  selfCAre: [],
  productsTitle: [],
  filtered: [],
  addProducts: () => {},
  addTitle: () => {},
  categories: () => {},
  getFiltered: () => {},
  getProFiltered: () => {},
});

// Arrays for storing categorized products and product titles
const productsTitle = [];
const productsMen = [];
const productsWoman = [];
const productsElctronics = [];
const productsHome = [];
const productsSelfcare = [];

export default function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState([]); // State for all products
  const [filtered, setFiltered] = useState([]); // State for filtered products

  // Effect: Set initial filtered products and categorize them when products are updated
  useEffect(() => {
    if (products.length > 0) {
      setFiltered(products);
      categories(); // Categorize products after the initial load
    }
  }, [products]);

  // Adds products and their images to the state
  function addProducts(prts, images) {
    let buildData = prts.map((prt) => {
      prt.images = images.filter((img) => prt.id === img.item_id); // Associate images with the correct product
      return prt;
    });

    if (products.length === 0) setProducts(buildData); // Set products only once
  }

  // Creates shortened titles for products, used for displaying in UI
  function addTitle() {
    if (productsTitle.length === 0) {
      products.map((product) => {
        let title;
        if (product.title.length > 25) {
          title = product.title.slice(0, 25) + " ..."; // Truncate long titles
        } else {
          title = product.title;
        }
        productsTitle.push({ id: product.id, name: title });
      });
    }
  }

  // Categorizes products into predefined categories
  function categories() {
    if (productsMen.length === 0) {
      products.map((product) => {
        const category = product.category;
        if (category.slice(0, 1) === "m") {
          productsMen.push(product);
        } else if (category.slice(0, 1) === "w") {
          productsWoman.push(product);
        } else if (
          category.includes("furniture") ||
          category.includes("home")
        ) {
          productsHome.push(product);
        } else if (
          category.includes("skincare") ||
          category.includes("fragrances")
        ) {
          productsSelfcare.push(product);
        } else if (
          category.includes("electronics") ||
          category.includes("laptops") ||
          category.includes("smartphones")
        ) {
          productsElctronics.push(product);
        }
      });
    }
  }

  // Filters products by category based on the provided category ID
  function getFiltered(cat) {
    switch (cat) {
      case 1:
        setFiltered(productsMen);
        break;
      case 2:
        setFiltered(productsWoman);
        break;
      case 3:
        setFiltered(productsHome);
        break;
      case 4:
        setFiltered(productsSelfcare);
        break;
      case 5:
        setFiltered(productsElctronics);
        break;
      case 6:
        setFiltered(products);
        break;
      default:
        console.log("Something went wrong with getFiltered");
    }
  }

  // Retrieves a specific product by its ID
  function getProFiltered(id) {
    return products.filter((pro) => pro.id === id);
  }

  // Context value to provide access to products and related methods
  const productContext = {
    products,
    productsTitle,
    filtered,
    addProducts,
    addTitle,
    categories,
    getFiltered,
    getProFiltered,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
}
