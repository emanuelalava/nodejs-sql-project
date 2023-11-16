import { Router } from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  patchEmployee,
  deleteEmployee,
} from "../controllers/employees.controller.js";
const router = Router();

router.get("/employees", getEmployees);
router.get("/employees/:id", getEmployeeById);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.patch("/employees/:id", patchEmployee);
router.delete("/employees/:id", deleteEmployee);

export default router;
