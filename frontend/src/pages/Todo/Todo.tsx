import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCheck} from "react-icons/fa";
import { useTasks } from "../../shared/hooks/tasks.hook";
import { TodoItem, FilterDropdown, AddTodo } from ".";
import { TodoFilterItem } from "src/shared/interface";

import { useAuth0 } from "@auth0/auth0-react";
import { TodoPagination } from "./TodoPagination";

const FILTER_SORT: Array<TodoFilterItem> = [
  { label: "Added Date", value: "added-date", isChecked: true },
  { label: "Due Date", value: "due-date", isChecked: false },
];

const FILTER_TYPE: Array<TodoFilterItem> = [
  { label: "All", value: "all", isChecked: true },
  { label: "Completed", value: "completed", isChecked: false },
  { label: "Active", value: "active", isChecked: false },
  { label: "Has Due Date", value: "has-due-date", isChecked: false },
];

export const Todo = () => {
  const { user } = useAuth0();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortFilter, setSortFilter] =
    useState<Array<TodoFilterItem>>(FILTER_SORT);
  const [typeFilter, setTypeFilter] =
    useState<Array<TodoFilterItem>>(FILTER_TYPE);

  const handleFilterSelect = (value: string, setAction: any) => {
    setAction((prevState: any) => {
      return prevState.map((item: TodoFilterItem) => {
        return { ...item, isChecked: item.value === value };
      });
    });
  };

  const getActiveValue: any = (filterList: Array<TodoFilterItem>) => {
    const activeItem = filterList.find(
      (item: TodoFilterItem) => item.isChecked
    );
    return activeItem?.value ?? "";
  };

  const { tasksData } = useTasks(
    user?.sub,
    currentPage,
    getActiveValue(typeFilter),
    getActiveValue(sortFilter)
  );
  return (
    <Container className="m-5 p-2 rounded mx-auto bg-light shadow">
      <Row className="m-1 p-4 justify-content-space-between">
        <Col sm={10}>
          <div className="p-1 h3 text-primary text-left mx-auto display-inline-block">
            <FaCheck className="bg-primary text-white rounded p-2" />
            <u>My Todo-List</u>
          </div>
        </Col>
        <Col sm={2}>
          <AddTodo />
        </Col>
      </Row>

      <Row className="m-1 p-3 px-5 justify-content-end">
        <Col sm="auto" className="d-flex align-items-center">
          <FilterDropdown
            label="Type"
            filters={typeFilter}
            onSelectDropdown={(value: string) =>
              handleFilterSelect(value, setTypeFilter)
            }
          />
        </Col>
        <Col sm="auto" className="d-flex align-items-center px-1 pr-3">
          <FilterDropdown
            label="Sort"
            filters={sortFilter}
            onSelectDropdown={(value: string) =>
              handleFilterSelect(value, setSortFilter)
            }
          />
        </Col>
      </Row>
      <Row className="mx-1 px-5 pb-3 w-80">

        {tasksData?.tasks.length !== 0?
        <Col className="mx-auto">
          {tasksData?.tasks.map((task: any) => (
            <TodoItem
              key={task._id}
              task={task}
              text="Buy groceries for next week"
              isCompleted={false}
              isEditing={false}
            />
          ))}
        </Col>:
          <Col className="mx-auto">
            DO not have todo tasks
        </Col>}

      </Row>
      {tasksData?.totalPages > 1 && (
        <TodoPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={tasksData.totalPages}
        />
      )}
    </Container>
  );
};
