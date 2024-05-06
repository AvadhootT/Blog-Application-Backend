import express from "express";
import { addBlog, deleteBlog, getAllBlog, getbyId, getusersAllblog, updateBlog } from "../controllers/blog-controller.js";


const blogRouter = express.Router();

blogRouter.get("/", getAllBlog);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getbyId);
blogRouter.delete("/delete/:id", deleteBlog);
blogRouter.get("/userallblogs/:id", getusersAllblog);

export default blogRouter;