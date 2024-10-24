import React from 'react';
import { FaRegHeart, FaRetweet, FaComment } from 'react-icons/fa';
import PostCard from './PostCardcomponent';

const ProfilePage = () => {
  return (
    <div className="bg-slate-500 min-h-screen">
      {/* Profile Header */}
      <div className="bg-gray-800 h-32 relative">
        <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4">
          <img 
            src="https://via.placeholder.com/100" 
            alt="Profile"
            className="rounded-full border-4 border-white"
          />
          <button className="bg-white text-blue-600 rounded-full px-4 py-2 hover:bg-blue-400">
            Follow
          </button>
        </div>
      </div>
      <div className="bg-slate-700 p-4">
        <h2 className="text-2xl font-bold">Username</h2>
        <p className="text-gray-500">@username</p>
        <p className="mt-2">This is a sample bio. Feel free to add some interesting info here!</p>
      </div>

      {/* Stats Section */}
      <div className="flex justify-around bg-slate-600 p-4">
        <div>
          <h3 className="font-bold">120</h3>
          <p className="text-gray-500">Followers</p>
        </div>
        <div>
          <h3 className="font-bold">180</h3>
          <p className="text-gray-500">Following</p>
        </div>
        <div>
          <h3 className="font-bold">200</h3>
          <p className="text-gray-500">Tweets</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-gray-800 border-b">
        <button className="flex-1 text-center text-yellow-50 py-2 hover:bg-gray-900">Tweets</button>
        <button className="flex-1 text-center text-yellow-50 py-2 hover:bg-gray-900">Tweets & replies</button>
        <button className="flex-1 text-center text-yellow-50 py-2 hover:bg-gray-900">Media</button>
        <button className="flex-1 text-center text-yellow-50 py-2 hover:bg-gray-900">Likes</button>
      </div>

     <PostCard/>
    </div>
  );
};

export default ProfilePage;
