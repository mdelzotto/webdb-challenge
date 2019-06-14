const router = require("express").Router();

const db = require("../data/helpers/actions-model.js");

router.get("/", async (req, res) => {
  try {
    const actions = await db.find();
    if (actions) {
      res.status(200).json(actions);
    }
  } catch (error) {
    res.status(500).json({ message: `Actions could not be found ${error}.` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const action = await db.findById(id);
    if (action) {
      res.status(200).json(action);
    } else {
      res
        .status(404)
        .json({ message: "Action with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `Action request failed ${error}.` });
  }
});

router.post("/", async (req, res) => {
  const action = req.body;
  if (!action.description) {
    res
      .status(400)
      .json({ message: "Please enter a valid action description." });
  } else {
    try {
      const newAction = await db.create(action);
      if (newAction) {
        res.status(201).json(newAction);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your action could not be posted ${error}.` });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const action = await db.remove(id);
    if (action) {
      res.status(200).json(action);
    } else {
      res
        .status(404)
        .json({ message: "The action with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      message: `The action's information could not be modified: ${error}.`
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newAction = req.body;

  if (!newAction.description) {
    res
      .status(400)
      .json({ message: "Please enter a valid action description." });
  } else {
    try {
      const editedAction = await db.update(newAction, id);
      if (editedAction) {
        res.status(200).json(editedAction);
      } else {
        res.status(404).json({
          message: "The action with the specified ID does not exist."
        });
      }
    } catch (error) {
      res.status(500).json({
        message: `The action's information could not be modified: ${error}.`
      });
    }
  }
});

module.exports = router;
