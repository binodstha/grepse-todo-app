import { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import axiosInstance from "shared/axios-instance";
import Modal from "react-bootstrap/Modal";
import { FaTrash } from "react-icons/fa";

export const DeleteTodo = ({ task, refreshData }: any) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/tasks/${task._id}`);
      toast.success("Task Deleted successfully !");
      handleShow();
      refreshData();
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <Fragment>
      <h5 className="m-0 p-0 px-2 edit-icon" onClick={handleShow}>
        <FaTrash
          className="text-danger btn m-0 p-0"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Delete todo"
        />
      </h5>
      <Modal
        show={show}
        onHide={handleShow}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{task.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You sure want to delete the task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
