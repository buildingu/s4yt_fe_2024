import { useState } from "react";

type Props = {
  maxPerPage: number,
  data: any[]
};

type Results = {
  currentPage: number;
  currentItems: any[];
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

const usePagination = ({maxPerPage, data}: Props): Results => {
  const [currentPage, setCurrentPage] = useState(1);
  // Define max items and pages
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / maxPerPage);
  // Extract a set of items to display
  const currentItems = data.slice((currentPage - 1) * maxPerPage, currentPage * maxPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const nextPage = () => {
    goToPage(currentPage + 1);
  };
  const prevPage = () => {
    goToPage(currentPage - 1);
  };

  return {
    currentPage,
    currentItems,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  };
};

export default usePagination;
