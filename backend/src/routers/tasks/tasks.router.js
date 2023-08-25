const express = require("express");
const Task = require("../../models/task");
const tasksRouter = express.Router();

const { validateAccessToken } = require("../../middleware/auth0.middleware");

// Create a new task
tasksRouter.post("/", async (req, res) => {
  const { userId, title, description, completed, dueDate } = req.body;
  try {
    const newTask = new Task({
      userId, 
      title,
      description,
      completed,
      dueDate:dueDate ? new Date(dueDate) : null,
      createdAt: new Date()
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the task." });
  }
});

// Get tasks with pagination
tasksRouter.get("/", async (req, res) => {

  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
  const userId = req.query.userId;
  const type = req.query.type;
  const sort = req.query.sort;
  try {
    let query = { userId }; 

    if (type === "completed") {
      query.completed = true;
    } else if (type === "active") {
      query.completed = false;
    } else if (type === "has-due-date") {
      query.dueDate = { $exists: true };
    }

    let sortQuery = {};
    if (sort === "added-date") {
      sortQuery = { createdAt: 1 };
    } else if (sort === "due-date") {
      sortQuery = { dueDate: 1 };
    }

    const totalCount = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      tasks,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalTasks: totalCount,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching tasks." });
  }
});

// Get a task by ID
tasksRouter.get("/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the task." });
  }
});

// Update a task by ID
tasksRouter.put("/:id", async (req, res) => {
  const taskId = req.params.id;
  const updateData = req.body;
  if (updateData.dueDate)
  updateData.dueDate = updateData.dueDate ? new Date(updateData.dueDate) : null;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      updateData,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the task." });
  }
});

// Delete a task by ID
tasksRouter.delete("/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.status(204).send(); // 204 No Content response for successful deletion
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the task." });
  }
});

module.exports = { tasksRouter };
