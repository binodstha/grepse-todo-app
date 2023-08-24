import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { useTasks } from "../../shared/hooks/tasks.hook";
import { TodoItem, FilterDropdown, AddTodo } from ".";
import { TodoFilterItem } from "src/shared/interface";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import { TodoPagination } from "./TodoPagination";
import cookies from "js-cookie";
import { CookieKeys } from "../../shared/enum/index";

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

export const Todo: React.FC = () => {
  const { user } = useAuth0();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortFilter, setSortFilter] =
    useState<Array<TodoFilterItem>>(FILTER_SORT);
  const [typeFilter, setTypeFilter] =
    useState<Array<TodoFilterItem>>(FILTER_TYPE);

  const [dataRefresh,setDataRefresh] = useState<boolean>(true);

  const handleFilterSelect = (value: string, setAction: any) => {
    setAction((prevState: any) => {
      return prevState.map((item: TodoFilterItem) => {
        return { ...item, isChecked: item.value === value };
      });
    });
  };

  const refreshData = () => {
    setDataRefresh(!dataRefresh)
  }

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
    getActiveValue(sortFilter),
    dataRefresh
  );

  useEffect(() => {
    const getToken = async () => {
      try {
      const data: any = await axios.post(
        `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
        {
          client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
          client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          grant_type: "client_credentials",
          scope:"read:todo, write:todo"
        },{
          headers: {
            "Content-Type": "application/json",
            
          },
        }
      );
      cookies.set(CookieKeys.ACCESS_TOKEN, data?.access_token)
    
    } catch (error: any) {
        console.log(error?.message)
    }
      
    };
    getToken();
  }, []);



  return (
    <Container className="m-5 p-2 rounded mx-auto bg-light shadow">
      <Row className="m-1 p-4 justify-content-space-between">
        <Col sm={10}>
          <div className="p-1 h3 text-primary text-left m-auto d-flex align-items-end todo-title">
            <FaCheck className="bg-primary text-white rounded p-2" />
            <u>My Todo-List</u>
          </div>
        </Col>
        <Col sm={2}>
          <AddTodo refreshData={refreshData}/>
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
        {tasksData?.tasks.length !== 0 ? (
          <Col className="mx-auto">
            {tasksData?.tasks.map((task: any) => (
              <TodoItem
                key={task._id}
                task={task}
                refreshData={refreshData}
              />
            ))}
          </Col>
        ) : (
          <Col className="d-flex justify-content-center no-task-msg">
            Do not have todo tasks. Please add new task!
          </Col>
        )}
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
