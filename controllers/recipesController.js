const path = require("path");
const router = require("express").Router();
const db = require("../models");

const recipeFunctions = {
  findAll: function (req, res) {
    db.Recipe
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Recipe
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUser: function (req, res) {
    db.Recipe
      .find({ 'user': req.params.user})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Recipe
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Recipe
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Recipe
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}

router.get("/api/recipes", recipeFunctions.findAll)

router.post("/api/recipes", recipeFunctions.create)

router.delete("/api/recipes/:id", recipeFunctions.remove)

router.get("/api/recipes/:id", recipeFunctions.findById)

router.get("/api/recipes/user/:user", recipeFunctions.findByUser)

router.patch("/api/recipes/:id", recipeFunctions.update)

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
