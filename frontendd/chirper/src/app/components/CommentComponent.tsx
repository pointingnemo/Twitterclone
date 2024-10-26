import React from 'react';
import { userprops } from '@/types/props';
import Image from 'next/image';
import defaultProfilePic from '@/public/profilepic.svg'

interface CommentProps {
  text: string;
  user: userprops;
//   createdAt: string;
}

const CommentComponent: React.FC<CommentProps> = ({ text, user }) => {

  console.log(user.username)

    
  return (
    <div className="border border-gray-700 p-4 mb-4 rounded-lg bg-gray-800">
      <div className="flex items-center mb-2">
        {/* User Profile Picture */}
        <Image
          src={user.profileImg?user.profileImg.toString(): defaultProfilePic}
          alt={`${user.username}'s profile`}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full mr-3"
        />

        {/* User Details */}
        <div className="">
          <div className="font-bold text-white">{user.fullName}</div>
          <div className="text-sm text-gray-400">@{user.username}</div>
        </div>
      </div>

      {/* Comment Text */}
      <div className="comment-text text-gray-300 mb-2 ml-10">{text}</div>

      {/* Timestamp */}
      {/* <div className="text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</div> */}
    </div>
  );
};

export default CommentComponent;
