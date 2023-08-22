const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const taskSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  completed: Boolean,
  dueDate: Date, 
  createdAt: Date

});

module.exports = mongoose.model('Task', taskSchema);