import express from "express";
import routes from "./routes";
import "./db-connection";

const app = express();
app.use(express.json());
app.use(routes);

app.get("/", (_, res) => {
  const currentTime = new Date().toLocaleString();
  res.status(200).send({
    status: "success",
    message: "pong, " + currentTime,
    data: {},
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
