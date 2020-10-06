import express from "express";
import Post from "../models/posts.js";
const router = express.Router();

// Return all posts
router.route("/").get((req, res) => {
	Post.find()
		.then((posts) => res.json(posts))
		.catch((err) => res.status(400).json("Error: " + err));
});

// Add a post
router.route("/add").post((req, res) => {
	const { title, image, author, content } = req.body;
	const post = new Post({
		title,
		image,
		content,
		author,
	});

	post
		.save()
		.then(() => res.status(201).json("Post Added!"))
		.catch((err) =>
			res.status(400).json({
				Error: err,
			})
		);
});

// Update post
router.route("/:id").put((req, res) => {
	const { id } = req.params;
	const { title, image, content, author } = req.body;
	const query = { _id: id };

	const newValues = {
		title,
		image,
		content,
		author,
	};

	Post.updateOne(query, newValues, (err, result) => {
		if (err) {
			res.status(500).json({ msg: err });
		} else {
			res
				.status(200)
				.json({ msg: `Post with ID: ${id} Updated Successfully!` });
		}
	});
});

// Delete post
router.route("/:id").delete((req, res) => {
	const { id } = req.params;

	const query = { _id: id };

	Post.deleteOne(query, (err, result) => {
		if (err) {
			res.status(500).json({ msg: err });
		} else {
			res.status(200).json({ msg: `Post Deleted Successfully!` });
		}
	});
});

export default router;
