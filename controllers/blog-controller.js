import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const getAllBlog = async (req, res, next)=>{
    let blogs;
    try {
        blogs = await Blog.find();       
    } catch (error) {
        console.log(error);
    }

    if(!blogs){
        return res.status(404).json({message: "No Blogs Found"})
    }

    return res.status(200).json({blogs});
}

export const addBlog = async (req, res, next)=>{

    const {title, description, image, user} = req.body;

    let existinguser;

    try {
        existinguser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    }

    if(!existinguser){
        return res.status(400).json({message: "Unable to find user by this ID"})
    }

    const blog = new Blog({
        title, 
        description, 
        image, 
        user
    })

        try {
            // await blog.save();  instead of this we need to add some sessions
            const session = await mongoose.startSession();
            session.startTransaction();
            await blog.save({ session });

            existinguser.blogs.push(blog);
            await existinguser.save({ session });
            await session.commitTransaction();
        } catch (error) {
            return res.status(500).json({message: error});
        }

        return res.status(200).json({
            blog,
            message: "Blog added succesfully"
        })
}


export const updateBlog = async(req, res, next) =>{
    const {title, description} = req.body;
    const blogId = req.params.id;

    let blog

    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
        title,
        description
    })        
    } catch (error) {
        console.log(error);
    }

    if(!blog){
        return res.status(500).json({message: "Unable to update blog"})
    }

    return res.status(200).json({blog});
}

export const getbyId = async (req, res, next)=>{

    let blog;
    const blogId = req.params.id;

    try {
        blog = await Blog.findById(blogId); 
    } catch (error) {
       return console.log(error);
    }

    if(!blog){
        return res.status(404).json({message: "Unable to find"});
    }

    return res.status(200).json({blog});
}

export const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id;

    let blog;

    try {
        blog = await Blog.findOneAndDelete({ _id: blogId }).populate("user");
        if (blog) {
            await blog.user.blogs.pull(blog._id); // Remove only the blog's _id from user's blogs array
            await blog.user.save(); // Save the user to apply the changes
        } else {
            return res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Unable to delete blog", error: error });
    }

    return res.status(200).json({ message: "Blog Deleted Successfully" });
};

export const getusersAllblog = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const userBlogs = await User.findById(userId).populate("blogs");
        
        if (!userBlogs) {
            return res.status(404).json({ message: "No Blogs Found." });
        }

        return res.status(200).json({ blogs: userBlogs.blogs, message: "" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error retrieving blogs." });
    }
};
