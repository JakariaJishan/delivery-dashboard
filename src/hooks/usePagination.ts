import { useState } from "react";

interface UsePaginationProps<T> {
  data: T[];
  rowsPerPage: number;
}

interface UsePaginationResult<T> {
  paginatedData: T[];
  page: number;
  pageCount: number;
  setPage: (page: number) => void;
}

function usePagination<T>({ data, rowsPerPage }: UsePaginationProps<T>): UsePaginationResult<T> {
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedData = data.slice(startIndex, endIndex);
  const pageCount = Math.ceil(data.length / rowsPerPage);

  return { paginatedData, page, pageCount, setPage };
}

export default usePagination;