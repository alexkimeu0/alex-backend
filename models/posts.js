import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		title: { type: String, required: true },
		author: { type: String, required: true },
		image: { type: String, required: true },
		content: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("posts", postSchema);
