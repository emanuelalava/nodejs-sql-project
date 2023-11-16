import express from "express";
import indexRoutes from "./routes/index.routes.js";
import employeesRoutes from "./routes/employees.routes.js";
import { configuration } from "./config.js";

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use("/api", employeesRoutes);

app.use((req, res, next) => {
  res.status(404).send({
    error: "This endpoint does not exist",
  });
});

app.listen(configuration.SERVER_PORT, () => {
  console.log(`Server running on port ${configuration.SERVER_PORT}`);
});
