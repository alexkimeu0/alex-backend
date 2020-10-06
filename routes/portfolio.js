import express from "express";
import Project from "../models/projects.js";

const router = express.Router();

// Return all projects
router.route("/").get((req, res) => {
	Project.find()
		.then((projects) => res.json(projects))
		.catch((err) =>
			res.status(400).json({
				Error: err,
			})
		);
});

// Add a project
router.route("/add").post((req, res) => {
	const { title, image, technologies } = req.body;
	const project = new Project({
		title,
		image,
		technologies,
	});

	project
		.save()
		.then(() => res.status(201).json("Project Added!"))
		.catch((err) =>
			res.status(400).json({
				Error: err,
			})
		);
});

// Update project
router.route("/:id").put((req, res) => {
	const { id } = req.params;
	const { title, image, technologies } = req.body;
	const query = { _id: id };

	const newValues = {
		title,
		image,
		technologies,
	};

	Project.updateOne(query, newValues, (err, result) => {
		if (err) {
			res.status(500).json({ msg: err });
		} else {
			res
				.status(200)
				.json({ msg: `Project with ID: ${id} Updated Successfully!` });
		}
	});
});

// Delete project
router.route("/:id").delete((req, res) => {
	const { id } = req.params;

	const query = { _id: id };

	Project.deleteOne(query, (err, result) => {
		if (err) {
			res.status(500).json({ msg: err });
		} else {
			res.status(200).json({ msg: `Project Deleted Successfully!` });
		}
	});
});

export default router;
