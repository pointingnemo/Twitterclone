import Post from "../models/post.models.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notification.model.js";

export const createPost=async(req,res)=>{

    try {
        const{text}=req.body;
        let{img}=req.body;

        console.log(req.body)

        const userId=req.user._id.toString();

        const user=await User.findById(userId)
        if(!user)return res.status(404).json({message:"user not found"})

        if(!text&&!img){
            return res.status(400).json({error:"Post must have text or image"});

        }

        if(img)
        {
            const uploadedResponse=  await cloudinary.uploader.upload(img);
            img=uploadedResponse.secure_url;
        }
        const newPost=new Post({
            user:userId,
            text,
            img
        })

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({error:"Internal server error"});
        console.log("error in createPost controler",error);
    }
}


export const deletePost=async(req,res)=>{

try {
    const post=await Post.findById(req.params.id)
    if(!post)
        return res.status(404).json({error:"Post not found"});

    if(post.user.toString() !== req.user._id.toString())
        return  res.status(401).json({error:"You are not authorized to delete this post"});

    if(post.img){
        await cloudinary.uploader.destroy(post.img.split("/").pop().split(".")[0]);

    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Post deleted successfully"});
} catch (error) {
    console.log("Error in deletePost",error);
    res.status(500).json({error:error.message});
    
}

}

export const commentOnPost=async(req,res)=>{
try {

    const {text}=req.body;
    const {postId}=req.params.id;
    const userId=req.user._id;

    if(!text){
        return res.status(400).json({error:"Text field is required"});
    }
    const post=await Post.findById(req.params.id);

    if(!post)
        return res.status(404).json({error:"Post not found"})
    
    const comment={user:userId,text}

    post.comments.push(comment);
    await post.save();

    res.status(200).json(post)
} catch (error) {
    console.log("Error in commentOnPost",error);
    res.status(500).json({error:error.message});
}

}



export const likeUnlikePost=async(req,res)=>{

    try {

        const userId=req.user._id;
        const{id:postId}=req.params;
        
        const post =await Post.findById(postId);

        if(!post)
            return res.status(404).json({error:"Post not found"})

        const userLikesPost=post.likes.includes(userId);

        if(userLikesPost){

            await Post.updateOne({_id:postId},{$pull:{likes:userId}})
            await User.updateOne({_id:userId},{$pull:{likedPosts:postId}})

            res.status(200).json({message:"Post unliked successfully"})
        }
        else{

            post.likes.push(userId);
            await User.updateOne({_id:userId},{$push:{likedPosts:postId}});

            await post.save();
            const notification=new Notification({

                from:userId,
                to:post.user,
                type:"like"

            })
            await notification.save();
            res.status(200).json({message:"Post liked successfully"});

        }
    } catch (error) {

        console.log("Error in likeUnlikePOst",error);
        res.status(500).json({error:error.message});
        
    }

    
}

export const getAllPosts=async(req,res)=>{

    try {

        const posts=await Post.find().sort({createdAt:-1}).populate({

            path:"user",
            select:"-password"

        }).populate({

             path:"comments.user",
            select:"-password"

        })

        if(posts.length===0)
            return res.status(200).json([]);

        res.status(200).json(posts);        
    } catch (error) {
        
        console.log("Error in getAllPosts",error);
        res.status(500).json({error:error.message});

    }


}

 export const getMyLikedPosts=async(req,res)=>{


    try {

        // const user=await User.findById(req.user._id).select("-password");
        const user=req.user;
        if(!user) return res.status(404).json({error:"User not found"});

        const likedPosts=await Post.find({_id:{$in:user.likedPosts}})
        .populate({
            path:"user",
            select:"-password"
        }).populate({
            path:"comments.user",
            select:"-password"
        });

        res.status(200).json(likedPosts);

        
    } catch (error) {

        console.log("Error in getlikedPosts",error);
        res.status(500).json({error:error.message});
        
    }

 }



//  export const getLikedPosts=async(req,res)=>{

//     const userId=req.params.id;

//     try {

//         const user =await User.findById(userId);
//         if(!user) return res.status(404).json({error:"User not found"});

//         const likedPosts=await Post.find({_id:{$in:user.likedPosts}})
//         .populate({
//             path:"user",
//             select:"-password"
//         }).populate({
//             path:"comments.user",
//             select:"-password"
//         });

//         res.status(200).json(likedPosts);

        
//     } catch (error) {

//         console.log("Error in getlikedPosts",error);
//         res.status(500).json({error:error.message});
        
//     }

//  }

export const getLikedPosts = async (req, res) => {
    try {
        
        const { username } = req.params;

      
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: "User not found" });

       
        const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
            .populate({
                path: "user",
                select: "-password" 
            })
            .populate({
                path: "comments.user",
                select: "-password" 
            });

       
        res.status(200).json(likedPosts);
    } catch (error) {
        console.error("Error in getLikedPosts:", error);
        res.status(500).json({ error: error.message });
    }
};


 export const getFollowingPosts=async(req,res)=>{

    try {
        const userId=req.user._id;
        const user= await User.findById(userId);

        if(!user) return res.status(404).json({error:"User not found"});

        const following=user.following;

        const feedPosts=await Post.find({user:{$in:following}}).sort({createdAt:-1})
        .populate({
            path:"user",
            select:"-password"
        }) .populate({
            path:"comments.user",
            select:"-password"
        });

        res.status(200).json(feedPosts);
        
    } catch (error) {

        console.log("Error in getFollowingPosts",error);
        res.status(500).json({error:error.message});
        
    }

 }

 export const getUserPosts=async(req,res)=>{

    try {

        const {username}=req.params;
        const user=await User.findOne({username});

        if(!user) return res.status(404).json({erorr:"User not found"});

        const posts=await Post.find({user:user._id}).sort({createdAt:-1})
        .populate({

            path:"user",
            select:"-password"

        }).populate({

            path:"comments.user",
            select:"-password"

        })

        res.status(200).json(posts);


    } catch (error) {

        console.log("Error in getUserPosts",error);
        res.status(500).json({error:error.message});
    }

 }


 export const getMyPosts=async(req,res)=>{

    try {
        console.log("Requesting posts for User ID:", req.user._id);
        const user=await User.findById(req.user._id).select("-password");


        if(!user) return res.status(404).json({erorr:"User not found in controller"});

        const posts=await Post.find({user:user._id}).sort({createdAt:-1})
        .populate({

            path:"user",
            select:"-password"

        }).populate({

            path:"comments.user",
            select:"-password"

        })

        res.status(200).json(posts);


    } catch (error) {

        console.log("Error in getUserPosts",error);
        res.status(500).json({error:error.message});
    }

 }


 export const getPost=async(req,res)=>{

    try {
       const postId=req.params.id
        const post=await Post.findById(postId).sort({createdAt:-1})
        .populate({

            path:"user",
            select:"-password"

        }).populate({

            path:"comments.user",
            select:"-password"

        })
        if(!post) return res.status(404).json({erorr:"post not found"});
        res.status(200).json(post);


    } catch (error) {

        console.log("Error in getPost",error);
        res.status(500).json({error:error.message});
    }

 }