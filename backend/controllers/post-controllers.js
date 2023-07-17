import Post from "../models/Post.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const getAllPosts = async ( req , res , next ) => {
    let posts;
    try {
        posts = await Post.find().populate("user");
    } catch (err) {
        if(err ) return console.log(err);
    }

    if( !posts ){
        return res.status(500).json({ message : "Unexpected Error " });
    }

    return res.status(200).json({posts});
}

export const addPosts = async ( req, res , next ) => {
    const { title , description , location , date , image , user } = req.body;

    if( !title && title.trim() === "" 
    && !description && description.trim() === "" 
    && !location && location.trim() === ""
     && !date && date.trim() === "" 
     && !image && image.trim() === ""
     && !user && user.trim() === ""
    ){
        return res.status(422).json({ message:"Invalid Data "});
    }

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }

    if( !existingUser ){
        return res.status(404).json({message: "User not found" })
    }

    let post;

    try {
        post = new Post({ title , description , image , location , date : new Date(`${date}`) , user }) 

        const session = await mongoose.startSession();

        session.startTransaction();

        existingUser.posts.push(post);
        await existingUser.save({session})
        post = await post.save({session});
        post = await post.save()
        session.commitTransaction();

    } catch (err) {
        return console.log(err);
    }

    if( !post ){
        return res.status(500).json({ message : "Unexpected Error Occurred" });
    }
    return res.status(201).json({post });

}

export const getPostById = async ( req , res , next ) =>{

    const id = req.params.id;

    let post;

    try {
        post = await Post.findById(id);
    } catch (err) {
        return console.log(err);
    }

    if( !post ){
        return res.status(404).json({message: "No post found" });
    }

    return res.status(200).json({post});

}

export const updatePost = async ( req , res , next ) => {

    const id = req.params.id;
    
    const { title , description , location , image } = req.body;

    if( !title && title.trim() === "" 
    && !description && description.trim() === "" 
    && !location && location.trim() === ""
     && !image && image.trim() === ""
    ){
        return res.status(422).json({ message:"Invalid Data "});
    }

    let post;

    try {
        post = await Post.findByIdAndUpdate(id , {
            title,
            description,
            image,
            // date: new Date( `${date} `),
            // date,
            location,
        } );
    } catch (err) {
        return console.log(err);
    }

    if( !post ){
        return res.status(500).json({ message:"Unable to update" });
    }
    return res.status(200).json({message:"updated Successfully", post});
}

export const deletePost = async( req , res , next ) =>{
        
    const id = req.params.id;
    let post;

    try {
        
        const session = await mongoose.startSession();
        session.startTransaction();
        post = await Post.findById(id).populate("user");
        post.user.posts.pull(post);
        await post.user.save({session});
        post = await Post.findByIdAndDelete(id);
        session.commitTransaction();

    } catch (err) {
        console.log( err );
    }

    if( !post ){
        return res.status(500).json({ message: "Could'nt Delete" });
    }
    
    return res.status(200).json({ message: "Deleted Successfully" });

}