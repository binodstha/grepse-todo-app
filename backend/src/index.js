const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const nocache = require("nocache");
const {tasksRouter} = require("./routers/tasks/tasks.router");
const { errorHandler } = require("./middleware/error.middleware");
const { notFoundHandler } = require("./middleware/not-found.middleware");
const {jwtCheck} = require("./middleware/auth0.middleware")

dotenv.config();

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}

const PORT = parseInt(process.env.PORT, 10);
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

const app = express();
const apiRouter = express.Router();

app.use(express.json());
app.set("json spaces", 2);

app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        "default-src": ["'none'"],
        "frame-ancestors": ["'none'"],
      },
    },
    frameguard: {
      action: "deny",
    },
  })
);

app.use((req, res, next) => {
  res.contentType("application/json; charset=utf-8");
  next();
});
app.use(nocache());

app.use(
  cors({
    origin: CLIENT_ORIGIN_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  })
);


// app.use(jwtCheck)
app.use("/api/v1", apiRouter);
apiRouter.use("/tasks", tasksRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});


