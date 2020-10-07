import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectSchema = new Schema(
	{
		title: { type: String, required: true },
		image: { type: String, required: true },
		technologies: { type: String, required: true },
		url: { type: String, required: false },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("projects", projectSchema);
