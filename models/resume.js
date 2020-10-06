import mongoose from "mongoose";

const Schema = mongoose.Schema;

const resumeSchema = new Schema(
	{
		title: { type: String, required: true },
		company: { type: String, required: true },
		timeline: { type: String, required: true },
		description: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("resume", resumeSchema);
