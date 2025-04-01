import { useSearchParams } from "react-router";
import {
  Pagination,
  PaginationNext,
  PaginationEllipsis,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
} from "./ui/pagination";

interface ProductPaginationProps {
  totalPages: number;
}

export default function ProductPagination({ totalPages }: ProductPaginationProps) {
  const [searchParams, setSerachParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);

  const onClickPage = (page: number) => {
    searchParams.set("page", page.toString());
    setSerachParams(searchParams);
  };

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              to={`?page=${currentPage - 1}`}
              onClick={(event) => {
                event.preventDefault();
                onClickPage(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}
        {startPage > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(
          (page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                to={`?page=${page}`}
                onClick={(event) => {
                  event.preventDefault();
                  onClickPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        {endPage < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              to={`?page=${currentPage + 1}`}
              onClick={(event) => {
                event.preventDefault();
                onClickPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
