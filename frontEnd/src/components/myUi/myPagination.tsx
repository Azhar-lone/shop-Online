import React from "react";

// Components
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationContent,
  PaginationLink,
} from "@/components/ui/pagination";

// Pagination Props
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MyPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Function to generate page numbers
  const renderPaginationLinks = () => {
    const pageLinks = [];
    const length = Math.min(10, totalPages); // Adjust length based on totalPages

    const start = Math.max(1, currentPage - Math.floor(length / 2));
    const end = Math.min(totalPages, start + length - 1);

    // Add first page and dots if needed
    if (start > 1) {
      pageLinks.push(
        <PaginationItem key="first">
          <PaginationLink
            className="hover:cursor-pointer"
            onClick={() => onPageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (start > 2) {
        pageLinks.push(<PaginationItem key="dots1">...</PaginationItem>);
      }
    }

    // Add the dynamic range of page numbers
    for (let i = start; i <= end; i++) {
      pageLinks.push(
        <PaginationItem key={i}>
          <PaginationLink
            className={`${
              currentPage === i && "bg-primary text-primary-foreground"
            } hover:cursor-pointer`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add last page and dots if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pageLinks.push(<PaginationItem key="dots2">...</PaginationItem>);
      }
      pageLinks.push(
        <PaginationItem key="last">
          <PaginationLink
            className="hover:cursor-pointer"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageLinks;
  };

  return (
    <Pagination className="my-8">
      <PaginationContent>
        <PaginationPrevious
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className="hover:cursor-pointer"
        />
        {renderPaginationLinks()}
        <PaginationNext
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          className="hover:cursor-pointer"
        />
      </PaginationContent>
    </Pagination>
  );
};

export default MyPagination;
