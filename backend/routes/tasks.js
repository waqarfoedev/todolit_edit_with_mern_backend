const router = require('express').Router();
const { findByIdAndDelete } = require('../models/tasks.model');
const Task = require('../models/tasks.model');
let task = require('../models/tasks.model');

router.route('/').get((req, res) => {
    task.find().then((task) => res.json(task)).catch((err) => {
        res.status(400).json("Error:==" + err);
    });
});

router.route("/add").post((req, res) => {
    const text = req.body.text;
    const day = req.body.day;
    const desc = req.body.desc;
    const reminder = Boolean(req.body.reminder);

    const newTask = new Task({
        text,
        day,
        desc,
        reminder,
    });
    newTask
        .save()
        .then(() => {
            res.json("Tasks added now!");
        })
        .catch((err) => res.status(400).json("Error:" + err));
});

router.route('/:id').delete((req, res) => {
    task.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json("Tasks deleted now!");
        }).catch((err) => res.status(400).json("Error:" + err));
});

router.route('/:id').get((req, res) => {
    task.findById(req.params.id)
        .then((task) => res.json(task))
        .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/update/:id").post((req, res) => {
    task.findByIdAndUpdate(req.params.id)
        .then((e) => {
            e.text = req.body.text;
            e.day = req.body.day;
            e.desc = req.body.desc;
            e.reminder = Boolean(req.body.reminder);

            e
                .save()
                .then(() => res.json("Task updated"))
                .catch((err) => res.status(400).json("Error:" + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;