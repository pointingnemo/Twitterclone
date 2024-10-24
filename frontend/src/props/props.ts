export interface userprops{
    username:String;
    fullName:String;
    password:String,
    email:String,    
    followers:userprops;
    following:userprops;
    profileImg: String;
    coverImg: String;
    bio: String;
    link: String;
        
    // likedPosts:[{

    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Post",
    //     default:[]
    // }]
}

export interface postProps{
   
    user: userprops; 
    text:string;
    img: string; 
    likes: userprops[];
    comments: {
        text: string; 
        user: userprops; 
            }[]; 
    createdAt: string;
    
}