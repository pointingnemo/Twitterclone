// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { userprops } from '@/types/props';
// import PostComponent from '../components/PostComponent'; 

// const ProfilePage = () => {
//   const [user, setUser] = useState<userprops | null>(null);
//   const [tweets, setTweets] = useState([]);
//   const [likedTweets, setLikedTweets] = useState([]);
//   const [activeTab, setActiveTab] = useState<'tweets' | 'liked'>('tweets');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/auth/me', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });

//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     const fetchMyPosts = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/post/user/${user?.username}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });

//         const data = await response.json();
//         setTweets(data);
//       } catch (error) {
//         console.error('Error fetching my posts:', error);
//       }
//     };

//     const fetchLikedPosts = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/post/likes/${user?.username}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });

//         const data = await response.json();
//         setLikedTweets(data);
//       } catch (error) {
//         console.error('Error fetching liked posts:', error);
//       }
//     };

//     fetchProfile();
//     if (user) {
//       fetchMyPosts();
//       fetchLikedPosts();
//     }
//   }, [user?.username]);

//   if (!user) {
//     return <div>Loading profile...</div>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto py-6 px-4">
//       {/* Cover Photo */}
//       <div className="relative">
//         <div className="h-40 bg-gray-200 rounded-lg overflow-hidden">
//           {user.coverImg && (
//             <Image src={user.coverImg.toString()} alt="Cover Photo" layout="fill" objectFit="cover" />
//           )}
//         </div>
//         {/* Profile Image */}
//         <div className="absolute -bottom-12 left-6 rounded-full border-4 border-white overflow-hidden w-24 h-24">
//           <Image src={user.profileImg.toString()} alt="Profile Image" width={96} height={96} />
//         </div>
//       </div>

//       {/* User Info */}
//       <div className="mt-16 text-center">
//         <h2 className="text-2xl font-bold">{user.fullName}</h2>
//         <p className="text-gray-500">@{user.username}</p>
//         <p className="text-gray-600 mt-2">{user.bio || ""}</p>
//         <div className="flex justify-center mt-4 space-x-6">
//           <span>{user.followers.length} Followers</span>
//           <span>{user.following.length} Following</span>
//           <span>Joined {new Date(user.createdAt.toString()).toLocaleDateString()}</span>
//         </div>
//       </div>

//       {/* Tabs for My Tweets and Liked Tweets */}
//       <div className="mt-8 border-b border-gray-300">
//         <div className="flex space-x-4">
//           <button
//             className={`py-2 px-4 ${activeTab === 'tweets' ? 'border-b-2 border-sky-500' : ''}`}
//             onClick={() => setActiveTab('tweets')}
//           >
//             My Tweets
//           </button>
//           <button
//             className={`py-2 px-4 ${activeTab === 'liked' ? 'border-b-2 border-sky-500' : ''}`}
//             onClick={() => setActiveTab('liked')}
//           >
//             Liked Tweets
//           </button>
//         </div>
//       </div>

//       {/* Display Tweets or Liked Tweets */}
//       <div className="mt-4">
//         {activeTab === 'tweets' ? (
//           tweets.length > 0 ? (
//             tweets.map((tweet: any) => (
//               <PostComponent key={tweet._id} {...tweet} />
//             ))
//           ) : (
//             <p className="text-gray-500">You haven't posted any tweets yet.</p>
//           )
//         ) : (
//           likedTweets.length > 0 ? (
//             likedTweets.map((tweet: any) => (
//               <PostComponent key={tweet._id} {...tweet} />
//             ))
//           ) : (
//             <p className="text-gray-500">You haven't liked any tweets yet.</p>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;



'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { userprops } from '@/types/props';
import PostComponent from '../components/PostComponent'; 
import EditProfileModal from '../components/EditProfileModal'; // Import the modal
import profilepic from '@/public/profilepic.svg'
import calender from '@/public/calender.svg'


const ProfilePage = () => {
  const [user, setUser] = useState<userprops | null>(null);
  const [tweets, setTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);
  const [activeTab, setActiveTab] = useState<'tweets' | 'liked'>('tweets');
  const [isEditing, setIsEditing] = useState(false); // State to control modal

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchMyPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/post/user/${user?.username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        setTweets(data);
      } catch (error) {
        console.error('Error fetching my posts:', error);
      }
    };

    const fetchLikedPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/post/likes/${user?.username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        setLikedTweets(data);
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      }
    };

    fetchProfile();
    if (user) {
      fetchMyPosts();
      fetchLikedPosts();
    }
  }, [user?.username]);

  const handleSaveProfile = (updatedUser: any) => {
    setUser(updatedUser); // Update user info after saving
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className='bg-gray-900'>
    {/* Cover Photo */}
    <div className="relative bg bg-gray-900">
    <div className="h-72 aspect-w-3 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
    {user.coverImg && (
      <Image
        src={user.coverImg.toString()}
        alt="Cover Photo"
        layout="fill"
        objectFit="contain"  // Ensures the entire image fits inside the container
        className="w-full h-full"
      />
    )}
  </div>
      
      {/* Profile Image */}
      <div className="absolute -bottom-12 left-6 rounded-full border-4 border-white overflow-hidden w-24 h-24 bg-gray-900">
        <Image src={user.profileImg.toString()} alt="" width={96} height={96} />
      </div>
      
      {/* Edit Profile Button */}
      <button
        className="absolute left-3/4 mt-2 py-2 px-6 bg-sky-500 text-white rounded"
        onClick={() => setIsEditing(true)}
      >
        Edit Profile
      </button>
    </div>
  
    {/* User Info */}
    <div className="mt-8 bg-gray-900 p-4 rounded-lg left-3/4">
      <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
      <p className="text-gray-400">@{user.username}</p>
      <div className="h-0.5 bg-blue-200 my-4 rounded-3xl"></div> 
      <span className=" text-gray-500 flex items-center my-4">
        <Image src={calender} alt="Calendar Icon" width={20} height={20} className="mr-2" />
        Joined {new Date(user.createdAt.toString()).toLocaleDateString()}
      </span>  
      <div className="flex space-x-6 mt-4">
        <span className="text-white">{user.followers.length} Followers</span>
        <span className="text-white">{user.following.length} Following</span>
      </div>
    </div>
    </div>
    {/* Tabs for My Tweets and Liked Tweets */}
    <div className="mt-10 border-b border-gray-500">
      <div className="flex space-x-4">
        <button
          className={`py-2 px-4 text-white ${activeTab === 'tweets' ? 'border-b-2 border-sky-500' : ''}`}
          onClick={() => setActiveTab('tweets')}
        >
          My Tweets
        </button>
        <button
          className={`py-2 px-4 text-white ${activeTab === 'liked' ? 'border-b-2 border-sky-500' : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          Liked Tweets
        </button>
      </div>
    </div>
  
    {/* Display Tweets or Liked Tweets */}
    <div className="mt-6">
      {activeTab === 'tweets' ? (
        tweets.length > 0 ? (
          tweets.map((tweet: any) => (
            <PostComponent key={tweet._id} {...tweet} />
          ))
        ) : (
          <p className="text-gray-500">You haven't posted any tweets yet.</p>
        )
      ) : (
        likedTweets.length > 0 ? (
          likedTweets.map((tweet: any) => (
            <PostComponent key={tweet._id} {...tweet} />
          ))
        ) : (
          <p className="text-gray-500">You haven't liked any tweets yet.</p>
        )
      )}
    </div>
  
    {/* Edit Profile Modal */}
    {isEditing && (
      <EditProfileModal
        user={user}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveProfile}
      />
    )}
  </div>
  
  );
};

export default ProfilePage;
