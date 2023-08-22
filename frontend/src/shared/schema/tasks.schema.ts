import * as yup from 'yup';

export const taskSchema = yup.object().shape({
    title: yup.string()
      .required("Title is required")
      .max(50, "Title must not exceed 50 characters"),
    description: yup.string().max(
      250,
      "Description must not exceed 250 characters"
    ),
    dueDate: yup.date().min(new Date(), "Target date must be today or later"),
  });