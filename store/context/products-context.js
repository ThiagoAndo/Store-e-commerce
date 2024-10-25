import { useEffect, createContext, useState } from "react";

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
const productsTitle = [];
const productsMen = [];
const productsWoman = [];
const productsElctronics = [];
const productsHome = [];
const productsSelfcare = [];

export default function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setFiltered(products);
      categories();
    }
  }, [products]);

  function addProducts(prts, images) {
    let buildData = prts.map((prt) => {
      prt.images = images.filter((img) => prt.id === img.item_id);
      return prt;
    });

    if (products.length === 0) setProducts(buildData);
  
  }

  function addTitle() {
    if (productsTitle.length === 0) {
      products.map((product) => {
        let title;
        if (product.title.length > 25) {
          title = product.title.slice(0, 25) + " ...";
        } else {
          title = product.title;
        }
        productsTitle.push({ id: product.id, name: title });
      });
    }
  }

  function categories() {
    let category;
    if (productsMen.length === 0) {
      products.map((product) => {
        category = product.category;
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
  function getProFiltered(id) {
    return products.filter((pro) => pro.id === id);
  }

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
