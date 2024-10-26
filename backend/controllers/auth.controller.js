// import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
// import User from '../models/user.model.js';


// import bcrypt from 'bcryptjs';

// export const signup= async(req,res) =>{

//    try {
//      const {fullName,username,email,password}=req.body;
//      const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//      if(!emailRegex.test(email)){
//         return res.status(400).json({
//             error:"Invalid emial format"
//         });
//      }
//      const existingUser=await User.findOne({username});
//      if(existingUser){
//         return res.status(400).json({
//             error:"Username is already taken"
//         });
//      }
//      const existingEmail=await User.findOne({username});
//        if(existingEmail){
//            return res.status(400).json({
//                error:"Email is already taken"
//            });
//         }

//         if(password.length<6){
//             return res.status(400).json({error:"password must be atleast 6 characters long"});
//         }

//      const salt=await bcrypt.genSalt(10);
//      const hashedPassword=await bcrypt.hash(password,salt);
        
//      const newUser=new User({
//         fullName,
//         username,
//         email,
//         password:hashedPassword
//      })


//      if(newUser){
//         generateTokenAndSetCookie(newUser._id,res)
//         await newUser.save();

//         res.status(201).json({

//             _id:newUser._id,
//             fullName:newUser.fullName,
//             username:newUser.username,
//             email:newUser.email,
//             followers:newUser.followers,
//             following:newUser.following,
//             profileImg:newUser.profileImg,
//             coverImg:newUser.coverImg,


//         })
//      }
//      else{
//         res.status(500).json({error:"invalid user data"})

//      }
//    } catch (error) {
//     console.log("Error in signup controller",error.message);
//     res.status(500).json({error:"Internal Server error"});
    
//    }
// }

// export const login= async(req,res) =>{
//     try {

//         const{username,password}=req.body;
//         const user=await User.findOne({username});
//         const isPasswordCorrect=await bcrypt.compare(password,user?.password||"")

//         if(!user||!isPasswordCorrect)
//         {
//            return res.status(400).json({error:"Invalid username or password"});
//         }
//         generateTokenAndSetCookie(user._id,res);
//         res.status(200).json({
//             _id:user._id,
//             fullName:user.fullName,
//             username:user.username,
//             email:user.email,
//             followers:user.followers,
//             following:user.following,
//             profileImg:user.profileImg,
//             coverImg:user.coverImg,
//         });

//     } catch (error) {
//         console.log("Error in login controller",error.message);
//         res.status(500).json({error:"Internal Server error"});
//     }

   
// }

// export const logout= async(req,res) =>{

//    try {
//         res.cookie("jwt","",{maxAge:0})
//         res.status(200).json({message:"Logged out successfully"})
//    } catch (error) {
//         console.log("Error in logout controller",error.message);
//         res.status(500).json({error:"Internal server error"});
//    }
// }

// export const getMe=async(req,res)=> {

//     try {
//         const user=await User.findById(req.user._id).select("-password");
//         res.status(200).json(user);
//     } catch (error) {

//         console.log("Error in getMe controller",error.message);
//         res.status(500).json({ error:"Internal server error"});

        
//     }
// };









































import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import { sendVerificationEmail } from '../lib/utils/sendEmail.js';

export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already taken" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const verificationToken = crypto.randomBytes(32).toString('hex');

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            verificationToken,
        });

        await newUser.save();

        await sendVerificationEmail(newUser.email, verificationToken);

        res.status(201).json({ message: 'User registered. Please verify your email.' });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ error: "Please verify your email before logging in" });
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMe = async (req, res) => {
    try {
          const user=await User.findById(req.user._id).select("-password");
                res.status(200).json(user);
            } catch (error) {
        
                console.log("Error in getMe controller",error.message);
                res.status(500).json({ error:"Internal server error"});
        
                
            }
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.log("Error in verifyEmail controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
