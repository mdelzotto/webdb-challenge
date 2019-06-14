const db = require("../dbConfig.js");

module.exports = {
  find,
  findById,
  create,
  remove,
  update
};

async function find() {
  const projects = await db("projects");
  projects.forEach(project =>
    project.completed === 1
      ? (project.completed = true)
      : (project.completed = false)
  );
  return projects;
}

async function findById(id) {
  const project = await db("projects")
    .select({
      id: "projects.id",
      name: "projects.name",
      description: "projects.description",
      completed: "projects.completed"
    })
    .where({ "projects.id": id })
    .first();

  project.actions = await db("actions")
    .select({
      id: "actions.id",
      description: "actions.description",
      notes: "actions.notes",
      completed: "actions.completed"
    })
    .where({
      "actions.project_id": id
    });
  project.completed === 1
    ? (project.completed = true)
    : (project.completed = false);
  project.actions.forEach(action =>
    action.completed === 1
      ? (action.completed = true)
      : (action.completed = false)
  );

  return project;
}

async function create(item) {
  const [id] = await db("projects").insert(item);
  if (id) {
    const project = await findById(id);
    project.completed === 1
      ? (project.completed = true)
      : (project.completed = false);
    return project;
  }
}

async function remove(id) {
  const project = await findById(id);
  if (project) {
    const deleted = await db("projects")
      .where({ id })
      .del();
    if (deleted) {
      return project;
    }
  }
}

async function update(item, id) {
  const editedProject = await db("projects")
    .where({ id })
    .update(item);
  if (editedProject) {
    const project = await findById(id);
    return project;
  }
}
