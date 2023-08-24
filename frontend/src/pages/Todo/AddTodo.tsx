import { useState } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik, Field, FormikHelpers } from "formik";
import { TodoFormValues } from "src/shared/interface";
import axiosInstance from "../../shared/axios-instance";
import { useAuth0 } from "@auth0/auth0-react";
import { taskSchema } from "../../shared/schema";

interface AddTodoProps{
  refreshData: any
}

export const AddTodo: React.FC<AddTodoProps> = ({refreshData}) => {
  const { user } = useAuth0();
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => setShow(!show);

  const initialValues: TodoFormValues = {
    userId: user?.sub ?? "",
    title: "",
    description: "",
    completed: false,
    dueDate: "",
  };
  const handleSubmit = async (
    values: TodoFormValues,
    { setSubmitting }: FormikHelpers<TodoFormValues>
  ) => {
    try {
      await axiosInstance.post("/tasks", values);
      toast.success("New Task Created successfully !");
      setSubmitting(false);
      handleShow();
      refreshData();
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Task
      </Button>
      <Modal
        show={show}
        onHide={handleShow}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
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
    </>
  );
};
