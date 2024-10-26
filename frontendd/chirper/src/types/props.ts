export interface userprops{
    _id:number;
    username:String;
    fullName:String;
    password:String,
    email:String,    
    followers:userprops[];
    following:userprops[];
    profileImg: String;
    coverImg: String;
    bio: String;
    link: String;
    createdAt:String;
    // likedPosts:[{

    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Post",
    //     default:[]
    // }]
}

export interface postProps{
   
    _id:number;
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

export interface NotificationProps {
    _id: string;
    from: userprops;
    to:userprops;
    type: string;
    read: boolean;
  }