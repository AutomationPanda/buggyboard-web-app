import express from "express";
import { db, initBugsTable } from "./db.js";
import { login } from "./authService.js";
import { createBug, deleteBug, getBug, listBugs, updateBug } from "./bugService.js";

const app = express();
const PORT = 3000;

initBugsTable();

app.use(express.json());

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/api/health", (_req, res) => {
  let database: string = "connected";
  try {
    db.prepare("SELECT 1").get();
  } catch {
    database = "error";
  }
  res.json({
    ok: true,
    message: "BuggyBoard API is running",
    database,
  });
});

app.post("/api/login", (req, res) => {
  const username = (req.body?.username as string) ?? "";
  const password = (req.body?.password as string) ?? "";
  const result = login(username, password);

  if (result.success) {
    res.status(200).json({ username: result.username });
    return;
  }

  switch (result.code) {
    case "BLANK_USERNAME":
      res.status(400).json({
        error: "blank_username",
        message: "Username cannot be blank.",
      });
      return;
    case "BLANK_PASSWORD":
      res.status(400).json({
        error: "blank_password",
        message: "Password cannot be blank.",
      });
      return;
    case "MISSING_CREDENTIALS":
      res.status(400).json({
        error: "missing_credentials",
        message: "Please enter your username and password.",
      });
      return;
    case "INVALID_CREDENTIALS":
      res.status(401).json({
        error: "invalid_credentials",
        message: "Invalid username or password.",
      });
      return;
  }
});

app.get("/api/bugs", (_req, res) => {
  const bugs = listBugs();
  res.json(bugs);
});

app.get("/api/bugs/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "invalid_id", message: "Bug ID must be a number." });
    return;
  }
  const bug = getBug(id);
  if (!bug) {
    res.status(404).json({ error: "not_found", message: "Bug not found." });
    return;
  }
  res.json(bug);
});

app.put("/api/bugs/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "invalid_id", message: "Bug ID must be a number." });
    return;
  }
  const body = req.body ?? {};
  const title = typeof body.title === "string" ? body.title : "";
  const severity = typeof body.severity === "string" ? body.severity : "";
  const owner = typeof body.owner === "string" ? body.owner : "";
  const description = typeof body.description === "string" ? body.description : "";
  const state = typeof body.state === "string" ? body.state : "";

  const result = updateBug(id, { title, severity, owner, description, state });

  if (result.success) {
    res.status(200).json(result.bug);
    return;
  }

  if (result.code === "NOT_FOUND") {
    res.status(404).json({ error: "not_found", message: "Bug not found." });
    return;
  }

  switch (result.code) {
    case "BLANK_TITLE":
      res.status(400).json({ error: "blank_title", message: "Title is required." });
      return;
    case "BLANK_SEVERITY":
    case "INVALID_SEVERITY":
      res.status(400).json({ error: "blank_severity", message: "Severity is required (high, mid, or low)." });
      return;
    case "BLANK_OWNER":
      res.status(400).json({ error: "blank_owner", message: "Owner is required." });
      return;
    case "BLANK_DESCRIPTION":
      res.status(400).json({ error: "blank_description", message: "Description is required." });
      return;
    case "INVALID_STATE":
      res.status(400).json({ error: "invalid_state", message: "State must be Open or Closed." });
      return;
  }
});

app.delete("/api/bugs/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "invalid_id", message: "Bug ID must be a number." });
    return;
  }
  const result = deleteBug(id);
  if (result.success) {
    res.status(204).send();
    return;
  }
  res.status(404).json({ error: "not_found", message: "Bug not found." });
});

app.post("/api/bugs", (req, res) => {
  const body = req.body ?? {};
  const title = typeof body.title === "string" ? body.title : "";
  const severity = typeof body.severity === "string" ? body.severity : "";
  const owner = typeof body.owner === "string" ? body.owner : "";
  const description = typeof body.description === "string" ? body.description : "";

  const result = createBug({ title, severity: severity as "high" | "mid" | "low", owner, description });

  if (result.success) {
    res.status(201).json(result.bug);
    return;
  }

  switch (result.code) {
    case "BLANK_TITLE":
      res.status(400).json({ error: "blank_title", message: "Title is required." });
      return;
    case "BLANK_SEVERITY":
    case "INVALID_SEVERITY":
      res.status(400).json({ error: "blank_severity", message: "Severity is required (high, mid, or low)." });
      return;
    case "BLANK_OWNER":
      res.status(400).json({ error: "blank_owner", message: "Owner is required." });
      return;
    case "BLANK_DESCRIPTION":
      res.status(400).json({ error: "blank_description", message: "Description is required." });
      return;
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
