import Notification from "../models/notification.model.js";

export const getNotification=async(req,res)=>{

    try {

        const userId=req.user._id;
        const notification=await Notification.find({to:userId}).populate({
            path:"from",
            select:"username profileImg"

        })
        await Notification.updateMany({to:userId},{read:true});

        res.status(200).json(notification)
    } catch (error) {
        console.log("Error in getNotification",error);
        res.status(500).json({error:error.message});
    }

}

export const deleteNotifications=async(req,res)=>{

    try {

        const userId=req.user._id;

        await Notification.deleteMany({to:userId});

        res.status(200).json({message:"notification deleted successfully"})
        
    } catch (error) {

        console.log("Error in deleteNotifications",error);
        res.status(500).json({error:error.message});
        
    }

    
}

export const deleteNotification=async(req,res)=>{

    try {
        const notificationId=req.params.id
        const userId=req.user._id;

       const notification= await Notification.findById(notificationId);

       if(!notification) return res.status(404).json({error:"notification not found"})

        if(notification.to.toString()!==userId.toString()){

            return res.status(403).json({error:"you are not authorized to delete this notification"})


        }

        await Notification.findByIdAndDelete(notificationId);

        res.status(200).json({message:"notification deleted successfully"})
        
    } catch (error) {

        console.log("Error in deleteNotification",error);
        res.status(500).json({error:error.message});
        
    }

    
}



export const readNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const { read } = req.body;
        const userId = req.user._id;

        const notification = await Notification.findById(notificationId);

   
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }


        if (notification.to.toString() !== userId.toString()) {
            return res.status(403).json({ error: "You are not authorized to read this notification" });
        }

     
        notification.read = read;

        await notification.save();

        res.status(200).json(notification);
    } catch (error) {
        console.log("Error in readNotification", error);
        res.status(500).json({ error: error.message });
    }
};
