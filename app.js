import express from "express";
import mongoose from "mongoose"
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";

const app = express();

//when signup controller used the application doesnt know what type of data is coming from request so we have to use below middleware
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.connect(
    'mongodb+srv://admin:admin@blogapp.cnib9pq.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp'
).then(app.listen(5000)).then(console.log("Connected to the loacl host on 5000 with connected Database")).catch((err)=>{console.log(err);})

