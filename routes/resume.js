import express from "express";
import Resume from "../models/resume.js";

const router = express.Router();

// Return all resumes
router.route("/").get((req, res) => {
	Resume.find()
		.then((resumes) => res.json(resumes))
		.catch((err) =>
			res.status(400).json({
				Error: err,
			})
		);
});

// Add a resume
router.route("/add").post((req, res) => {
	const { title, company, timeline, description } = req.body;
	const resume = new Resume({
		title,
		company,
		timeline,
		description,
	});

	resume
		.save()
		.then(() => res.status(201).json("Resume Added!"))
		.catch((err) =>
			res.status(400).json({
				Error: err,
			})
		);
});

// Update project
router.route("/:id").put((req, res) => {
	const { id } = req.params;
	const { title, company, timeline, description } = req.body;
	const query = { _id: id };

	const newValues = {
		title,
		company,
		timeline,
		description,
	};

	Resume.updateOne(query, newValues, (err, result) => {
		if (err) {
			res.status(500).json({ msg: err });
		} else {
			res
				.status(200)
				.json({ msg: `Resume with ID: ${id} Updated Successfully!` });
		}
	});
});

// Delete resume
router.route("/:id").delete((req, res) => {
	const { id } = req.params;

	const query = { _id: id };

	Resume.deleteOne(query, (err, result) => {
		if (err) {
			res.status(500).json({ msg: err });
		} else {
			res.status(200).json({ msg: `Resume Deleted Successfully!` });
		}
	});
});

export default router;
