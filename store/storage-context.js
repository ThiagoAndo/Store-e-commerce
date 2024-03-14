import { createContext, useState, useEffect } from "react";

export const StorageContext = createContext({
  storagePro: [],
  addStorage: function (id) {},
});

export function StorageContextProvider(props) {
  const [storagePro, setStoragePro] = useState([]);
  let set = null;
  useEffect(() => {
    set = Array.from(
      new Set(
        storagePro.map((pro) => {
          return pro.id;
        })
      )
    );
    localStorage.setItem("cart", JSON.stringify(set));
  }, [storagePro]);

  function addStorage(id) {
    setStoragePro((prev) => [...prev, { id }]);
  }

  const context = {
    storagePro,
    addStorage,
  };

  return (
    <StorageContext.Provider value={context}>
      {props.children}
    </StorageContext.Provider>
  );
}

export default StorageContextProvider;
