import React from 'react';
import "../styles/pagination.css"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // Add Previous button
    if (currentPage > 1) {
      pageButtons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination-button"
        >
          Prev
        </button>
      );
    }

    // Add First page button
    pageButtons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`pagination-button ${
          currentPage === 1 ? 'active' : ''
        }`}
      >
        1
      </button>
    );

    // Add Ellipsis button for skipping pages
    if (currentPage > 5) {
      pageButtons.push(
        <button key="ellipsis1" className="pagination-button ellipsis">
          ...
        </button>
      );
    }

    // Add numbered buttons with 5 pages on each side of the current page
    for (let i = currentPage - 5; i < currentPage + 5; i++) {
      if (i > 1 && i < totalPages) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`pagination-button ${
              currentPage === i ? 'active' : ''
            }`}
          >
            {i}
          </button>
        );
      }
    }

    // Add Ellipsis button for skipping pages
    if (currentPage < totalPages - 4) {
      pageButtons.push(
        <button key="ellipsis2" className="pagination-button ellipsis">
          ...
        </button>
      );
    }

    // Add Last page button
    if (totalPages > 1) {
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`pagination-button ${
            currentPage === totalPages ? 'active' : ''
          }`}
        >
          {totalPages}
        </button>
      );
    }

    // Add Next button
    if (currentPage < totalPages) {
      pageButtons.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-button"
        >
          Next
        </button>
      );
    }

    return pageButtons;
  };

  return <div className="pagination-container">{renderPageButtons()}</div>;
};

export default Pagination;
