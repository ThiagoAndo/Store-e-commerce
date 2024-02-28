import { useEffect, createContext, useState } from "react";

export const ProductContext = createContext({
  products: [],
  productsTitle: [],
  addProducts: () => {},
  addTitle: () => {},
});

export default function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const productsTitle = [];
  function addProducts(products) {
    setProducts(products);
  }

  function addTitle() {
    products.map((product) => {
      let title;
      if (product.title.length > 35) {
        title = product.title.slice(0, 35) + "...";
      } else {
        title = product.title;
      }
      productsTitle.push({ id: product.id, name: title });
    });
  }

  // function deleteChallenge(challengeId) {
  //   setChallenges((prevChallenges) =>
  //     prevChallenges.filter((challenge) => challenge.id !== challengeId)
  //   );
  // }

  // function updateChallengeStatus(challengeId, newStatus) {
  //   setChallenges((prevChallenges) =>
  //     prevChallenges.map((challenge) => {
  //       if (challenge.id === challengeId) {
  //         return { ...challenge, status: newStatus };
  //       }
  //       return challenge;
  //     })
  //   );
  // }

  const productContext = {
    products,
    productsTitle,
    addProducts,
    addTitle,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
}
