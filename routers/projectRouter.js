const router = require("express").Router();

const db = require("../data/helpers/projects-model.js");

router.get("/", async (req, res) => {
  try {
    const projects = await db.find();
    if (projects) {
      res.status(200).json(projects);
    }
  } catch (error) {
    res.status(500).json({ message: `Projects could not be found ${error}.` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await db.findById(id);
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: "Project with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `Project request failed ${error}.` });
  }
});

router.post("/", async (req, res) => {
  const project = req.body;
  if (!project.name || !project.description) {
    res
      .status(400)
      .json({ message: "Please enter a valid project name and description." });
  } else {
    try {
      const newProject = await db.create(project);
      if (newProject) {
        res.status(201).json(newProject);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your project could not be posted ${error}.` });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await db.remove(id);
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      message: `The project's information could not be modified: ${error}.`
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newProject = req.body;

  if (!newProject.name || !newProject.description) {
    res
      .status(400)
      .json({ message: "Please enter a valid project name and description." });
  } else {
    try {
      const editedProject = await db.update(newProject, id);
      if (editedProject) {
        res.status(200).json(editedProject);
      } else {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      }
    } catch (error) {
      res.status(500).json({
        message: `The project's information could not be modified: ${error}.`
      });
    }
  }
});

module.exports = router;
