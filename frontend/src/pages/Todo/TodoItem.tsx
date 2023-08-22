import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaCalendar, FaInfoCircle } from "react-icons/fa";
import { BsCheck2Square, BsSquare } from "react-icons/bs";
import { toast } from "react-toastify";
import { EditTodo } from "./EditTodo";
import { DeleteTodo } from "./DeleteTodo";
import axiosInstance from "../../shared/axios-instance";

export const TodoItem = ({ task }: any) => {
  const handleTaskCheck = async (
    id: string
  ) => {
    const res = await axiosInstance.put(`/tasks/${task._id}`, {completed: true});
    if (res.status === 200) {
    task = res.data
      toast.success("Task Marked Completed  !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  };
  return (
    <Row className={`px-3 align-items-center todo-item  rounded`}>
      <Col sm="auto" className="m-1 p-0 d-flex align-items-center">
        <h2 className="m-0 p-0">
          {task?.completed ? (
            <BsCheck2Square
              className="text-primary btn m-0 p-0"
              data-toggle="tooltip"
              title="Mark as todo"
            />
          ) : (
            <BsSquare 
              className="text-primary btn m-0 p-0"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Mark as complete"
              onClick={() => handleTaskCheck(task?._id)}

            />
          )}
        </h2>
      </Col>
      <Col className="px-1 m-1 d-flex align-items-center">
        <input
          type="text"
          className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3"
          readOnly
          value={task?.title}
        />
      </Col>
      <Col sm="auto" className="m-1 p-0 px-3">
        {task?.dueDate && (
          <div className="row">
            <div className="col-auto d-flex align-items-center rounded bg-white border border-warning">
              <FaCalendar
                className="text-warning btn m-0 p-0"
                data-toggle="tooltip"
                data-placement="bottom"
                title=""
                data-original-title="Due on date"
              />
              <h6 className="text my-2 pr-2">{new Date(task?.dueDate).toISOString().split("T")[0]}</h6>
            </div>
          </div>
        )}
      </Col>
      <Col sm="auto" className="m-1 p-0 todo-actions">
        <div className="d-flex align-items-center justify-content-end">
          <EditTodo task={task}/>
          {!task?.completed && 
          <DeleteTodo task={task}/>}
        </div>
        <div className="row todo-created-info">
          <div className="col-auto d-flex align-items-center pr-2">
            <FaInfoCircle
              className="my-2 px-2 text-black-50 btn"
              data-toggle="tooltip"
              data-placement="bottom"
              title=""
              data-original-title="Created date"
            />
            <label className="date-label my-2 text-black-50">
              {new Date(task?.createdAt).toISOString().split("T")[0]}
            </label>
          </div>
        </div>
      </Col>
      <Col sm="auto" className="m-1 p-0 px-3 d-none"></Col>
    </Row>
  );
};
