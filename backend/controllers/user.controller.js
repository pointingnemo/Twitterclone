import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import {v2 as cloudinary} from 'cloudinary';
export const getUserProfile=async(req,res)=>{

const{username}=req.params;

try {
    const user=await User.findOne({username}).select("-password");

    if(!user){

        return res.status(404).json({message:"User not found"});
    }

    res.status(200).json(user);
} catch (error) {

    console.log("Error in getUserProfile");
    
    res.status(500).josn({error:error.message})

}

};

export const followUnfollowUser=async(res,req)=>{
    try {

        const{id}=req.params;
        const userToModify=await User.findById(id);
        const currentUser=await User.findById(req.user._id);


        if(id===req.user._id.toString()){
            return res.status(400).json({error:"you cannot follow/unfollow yourself"});
        }

        if(!userToModify||!currentUser) return res.status(400).json({error:"usernot found"});

        const isFollowing=currentUser.following.includes(id);

        if(isFollowing)
        {
            await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}});
            await User.findByIdAndUpdate(req.user._id,{$pull:{following:req.user}});
            res.statue(200).json({message:"User unfollowed successfully"});
        }else{
            await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}});
            await User.findByIdAndUpdate(req.user._id,{$push:{following:req.user}});
             const newNotification=new Notification({

                type:'follow',
                from :req.user._id,
                to:userToModify._id,

             });

             await newNotification.save();
              //return id od user as response

            res.statue(200).json({message:"User followed successfully"});

           

        }
        
    } catch (error) {
        console.log("Error in followUnfollowUser");
    
       res.status(50).josn({error:error.message})
    }
}

export const getSuggestedUsers=async(res,req)=>{

    try {

        const userId=req.user._id;

        const usersFollowedByMe=await User.findById(userId).select("following");

        const users= await User.aggregate([{

            $match:{
                _id:{$ne:userId}
            }
        },
        {$sample:{size:10}}
        ])

        const filteredUsers=users.filter(user=>!usersFollowedByMe.following.includes(user._id))
        const getSuggestedUsers=filteredUsers.slice(0,4)
        
        getSuggestedUsers.forEach(user=>user.password=null);

        res.status(200).josn(getSuggestedUsers);


    } catch (error) {
        
        console.log("Error in getSuggestesUsers",error.message);
    
       res.status(500).josn({error:error.message})

    }

}

export const updateUser=async(res,req)=>{

    const{fullname,email,username,currentPassword,newPassword,bio,link}=req.body;

    let{profileImg,coverImg}=req.body;


    const userId=req.user._id;

    try {

        let user=await User.findById(userid);
        if(!user) return res.status(404).json({message:"usernot found" });

        if((!newPassword&&currentPassword)||(!currentPassword&&newPassword))
            return res.status(404).json({error:"PLease provide both current and new password" });    
        
        if(newPassword&&currentPassword)
        {
            const isMatch=await bcrypt.compare(currentPassword,user.password);
            if(!isMatch)  return res.status(400).json({error:"Current password doesnot match" });    

            if(newPassword.length<6){
                return res.status(400).json({error:"Password must be atleast 6 characters long" });    

            }

            const salt=await bcrypt.genSalt(10);

            user.password=await bcrypt.hash(newPassword,salt);
        }

        if(profileImg){

            if(user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
            }

                const uploadedResponse=await cloudinary.uploader.upload(profileImg);
                profileImg=uploadedResponse.secure_url;
        }
        if(coverImg){
            if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
            }

            const uploadedResponse=await cloudinary.uploader.upload(coverImg);
                coverImg=uploadedResponse.secure_url;
        }
    

        user.fullName=fullname||user.fullName;
        user.email=fullname||user.email;
        user.username=fullname||user.username;
        user.bio=fullname||user.bio;
        user.link=fullname||user.link;
        user.profileImg=fullname||user.profileImg;
        user.coverImg=fullname||user.coverImg;

        user=await user.save();

        user.password=null;

        return res.status(200).json(user);

    } catch (error) {
        console.log("error in update user", error.message);
        res.status(500).json({error:error.message})
        
    }

}