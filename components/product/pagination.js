import React from "react";
import styles from "./pagination.module.css";

const GridPagination = ({
  currentPage,
  totalPages,
  handlePrevious,
  handleNext,
  handlePageClick,
}) => {
  const getVisiblePageNumbers = () => {
    // Limit the page numbers displayed
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, 3];
    }

    if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const pageNumbers = getVisiblePageNumbers();

  return (
    <div className={styles.paginationContainer}>
      {/* "Previous" button */}
      <button
        className={`${styles.paginationButton} ${styles.navButton}`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Page number buttons */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`${styles.paginationButton} ${
            currentPage === number ? styles.activeButton : ""
          }`}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </button>
      ))}

      {/* "Next" button */}
      <button
        className={`${styles.paginationButton} ${styles.navButton}`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default GridPagination;
