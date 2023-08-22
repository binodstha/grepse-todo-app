import { Row, Col, Pagination } from "react-bootstrap";
import { TodoPaginationProps } from "src/shared/interface";

export const TodoPagination: React.FC<TodoPaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <Row className="m-1 p-3">
      <Col sm={11} className="mx-auto">
        <Pagination className="justify-content-end">
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          />

          {[...Array(totalPages)].map((x, i) => (
            <>
              {console.log(i)}
              <Pagination.Item
                key={`item-pagination-${i}`}
                active={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            </>
          ))}

          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </Pagination>
      </Col>
    </Row>
  );
};
