import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());

const PORT = 5000;

// DB Connection
const URI =
	"mongodb+srv://root:Soda3291!@cluster0.x0few.mongodb.net/portfolio?retryWrites=true&w=majority";

const db = mongoose.connection;

mongoose.connect(URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

db.once("open", () => {
	console.log("DB Connection Established!");
});

app.use(express.json());

// Routes
import blogRouter from "./routes/blog.js";
import portfolioRouter from "./routes/portfolio.js";
import resumeRouter from "./routes/resume.js";

app.use("/blog", blogRouter);
app.use("/portfolio", portfolioRouter);
app.use("/resume", resumeRouter);

app.listen(PORT, () => {
	console.log(`Server Listening on: 127.0.0.1:${PORT}`);
});
