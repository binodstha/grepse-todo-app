import { Fragment, useState } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik, Field, FormikHelpers } from "formik";
import { TodoFormValues } from "src/shared/interface";
import axiosInstance from "../../shared/axios-instance";
import { taskSchema } from "../../shared/schema";
import { FaPencilAlt } from "react-icons/fa";

export const EditTodo = ({ task, refreshData }: any) => {
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => setShow(!show);

  const initialValues: TodoFormValues = {
    userId:task.userId,
    title: task.title,
    description: task.description,
    completed: task.completed,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
  };
  const handleSubmit = async (
    values: TodoFormValues,
    { setSubmitting }: FormikHelpers<TodoFormValues>
  ) => {
    try {
      await axiosInstance.put(`/tasks/${task._id}`, values);
      toast.success("Task Updated successfully !");
      setSubmitting(false);
      handleShow();
      refreshData();
    } catch (error: any) {
      toast.error(error?.response?.data?.error)
    }
  };

  return (
    <Fragment>
      <h5 className="m-0 p-0 px-2 edit-icon" onClick={handleShow}>
        <FaPencilAlt
          className="text-info btn m-0 p-0"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Edit todo"
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
        <Formik
          initialValues={initialValues}
          validationSchema={taskSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Row className="justify-content-center">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Field
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        className={`form-control ${
                          touched.title && errors.title ? "is-invalid" : ""
                        }`}
                      />
                      {touched.title && errors.title && (
                        <Form.Control.Feedback type="invalid">
                          {errors.title}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Field
                        as="textarea"
                        name="description"
                        placeholder="Enter description"
                        className={`form-control ${
                          touched.description && errors.description
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.description && errors.description && (
                        <Form.Control.Feedback type="invalid">
                          {errors.description}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Target Date</Form.Label>
                      <Field
                        type="date"
                        name="dueDate"
                        className={`form-control ${
                          touched.dueDate && errors.dueDate ? "is-invalid" : ""
                        }`}
                      />
                      {touched.dueDate && errors.dueDate && (
                        <Form.Control.Feedback type="invalid">
                          {errors.dueDate}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleShow}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
};
