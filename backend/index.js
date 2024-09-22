const express = require("express");
const dotenv = require("dotenv");
const errorHandlerMiddleware = require("./middlewares/ErrorHandlerMiddleware");
const noRoute = require("./middlewares/noRoute");
const connectDatabase = require("./db/connect");
const authRouters = require("./routers/auth");
const emailVerificationRouter = require("./routers/emailVerification");
const postRouter = require("./routers/post");
const followRouter = require("./routers/follow");
const followCompanyRouter = require("./routers/followCompany");
const userProfileRouter = require("./routers/user");
const notificationRouter = require("./routers/notifications");
const jobsRouter = require("./routers/jobs");
const applicantsRouter = require("./routers/applicants");
const companyRouter = require("./routers/company");
const jobRecommendationRouter = require("./routers/jobRecommendations");

const app = express();
dotenv.config();

// to accept large payloads
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const PORT = process.env.port || 3000;
app.use(express.json());

// routes
app.use("/public/uploads", express.static("public/uploads"));

app.use(
  "/public/uploads/userImages",
  express.static("public/uploads/userImages")
);

app.use(
  "/public/uploads/companyImages",
  express.static("public/uploads/companyImages")
);

app.use("/api/auth", authRouters);
app.use("/api", emailVerificationRouter);
app.use("/api", postRouter);
app.use("/api", followRouter);
app.use("/api", followCompanyRouter);
app.use("/api", userProfileRouter);
app.use("/api", notificationRouter);
app.use("/api", jobsRouter);
app.use("/api", applicantsRouter);
app.use("/api", companyRouter);
app.use("/api", jobRecommendationRouter);

// error handler middlewares
app.use(errorHandlerMiddleware);

// no route
// app.use(noRoute);

// listen
const listen = async () => {
  await connectDatabase(process.env.connectionUrl);

  app.listen(PORT, () => {
    console.log(`Connected to port no ${PORT}`);
  });
};

listen();
module.exports = app;
