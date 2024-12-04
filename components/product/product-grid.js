import ProductItem from "./product-item";
import classes from "./product-grid.module.css";
import { useContext, useState } from "react";
import { ProductContext } from "@/store/context/products-context";
import GridPagination from "./pagination";
export default function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const store = useContext(ProductContext);
  const { isFiltering } = useContext(ProductContext);
  const totalPages = 10;

  const lastIndex = currentPage * totalPages;
  const firstIndex = lastIndex - totalPages;
  const products = store.filtered.slice(firstIndex, lastIndex);

  return (
    <>
      <ul className={classes.products}>
        {products.map((item) => (
          <li key={item.id}>
            <ProductItem {...item} />
          </li>
        ))}
      </ul>
      {!isFiltering && (
        <GridPagination
          currentPage={currentPage}
          totalPages={10}
          handlePrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          handleNext={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          handlePageClick={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
}
