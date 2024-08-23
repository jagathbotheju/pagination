import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const ClientPaginationCom = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: Props) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePreviousPage}
            className="cursor-pointer"
          />
        </PaginationItem>

        {/* <PaginationItem>
          <PaginationLink href="#">
            {currentPage} of {pages.length}
          </PaginationLink>
        </PaginationItem> */}

        {pages.map((page, index) => (
          <PaginationItem
            key={index}
            className={cn(
              "cursor-pointer",
              currentPage === page ? "bg-neutral-300 rounded-md" : ""
            )}
          >
            <PaginationLink onClick={() => setCurrentPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext onClick={handleNextPage} className="cursor-pointer" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default ClientPaginationCom;
