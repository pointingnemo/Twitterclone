import React, { useState } from "react";
import { FaRegImage, FaPaperPlane,FaSmile } from "react-icons/fa"; // Import icons
import { MdGifBox } from "react-icons/md";

const WritePost = () => {
  const [postContent, setPostContent] = useState("");

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = () => {
    console.log("Posted:", postContent);
   
    setPostContent("");
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 shadow-md rounded-lg p-4 my-4">
      <div className="flex items-start space-x-4">
        {/* Profile Picture */}
        <img
          className="w-12 h-12 rounded-full"
          src="https://via.placeholder.com/150" 
          alt="Profile"
        />
        
        {/* Text Area and Buttons */}
        <div className="flex-1">
          <textarea
            className="w-full p-2 border bg-slate-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-50"
            placeholder="Say your mind..."
            rows="3"
            value={postContent}
            onChange={handlePostChange}
          ></textarea>

          {/* Action Buttons: Paperclip and Post Button */}
          <div className="flex justify-between items-center mt-2">
            <button className="text-blue-500 hover:text-blue-700">
                <FaRegImage className="w-6 h-6" />
            </button>
            <button className="text-blue-500 hover:text-blue-700">
                <FaSmile className="w-6 h-6" />
            </button>
            <button className="text-blue-500 hover:text-blue-700">
                <MdGifBox className="w-6 h-6" />
            </button>

            <button
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 flex items-center"
              onClick={handlePostSubmit}
            >
              <FaPaperPlane className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
