import { pool } from "./../database.js";

export const getEmployees = async (req, res) => {
  try {
    // throw new Error("This es an error");
    const [rows] = await pool.query("SELECT * FROM employee");
    return res.json(rows);
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0)
      return res.status(404).send({
        error: "There is no employee with the specified id",
      });

    return res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO employee (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    if (name == undefined || salary == undefined)
      return res.status(404).send({
        error: "Error updating the employee, namor o salary was undefined",
      });

    const [result] = await pool.query(
      "UPDATE employee SET name = ?, salary = ? WHERE id = ?",
      [name, salary, id]
    );
    if (result <= 0)
      return res
        .status(404)
        .send({ error: "Error updating the employee with the especified id" });

    const [[employee]] = await pool.query(
      "SELECT * FROM employee WHERE id = ?",
      [id]
    );

    return res.send(employee);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const patchEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );
    if (result <= 0)
      return res
        .status(404)
        .send({ error: "Error updating the employee with the especified id" });

    const [[employee]] = await pool.query(
      "SELECT * FROM employee WHERE id = ?",
      [id]
    );

    return res.send(employee);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows <= 0)
      return res
        .status(400)
        .send({ error: "Error deleting the employee with the especified id" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
