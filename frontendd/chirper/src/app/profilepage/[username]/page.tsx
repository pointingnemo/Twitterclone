

// 'use client';

// import React,{ useState, useEffect } from 'react';
// import Image from 'next/image';
// import { userprops } from '@/types/props';
// import PostComponent from '../../components/PostComponent'; 
// import EditProfileModal from '../../components/EditProfileModal'; 
// import profilepic from '@/public/profilepic.svg';
// import calender from '@/public/calender.svg';
// import SideBarComponent from '@/app/components/SideBarComponent';

// interface ProfilePageProps {
//   params: {
//     username: string;
//   };
// }

// const ProfilePage: React.FC<ProfilePageProps> = ({ params }) => {
  

//   const [user, setUser] = useState<userprops | null>(null);
//   const [tweets, setTweets] = useState([]);
//   const [likedTweets, setLikedTweets] = useState([]);
//   const [activeTab, setActiveTab] = useState<'tweets' | 'liked'>('tweets');
//   const [isEditing, setIsEditing] = useState(false); 
//   const [isFollowing, setIsFollowing] = useState(false); 
//   const [loadingFollow, setLoadingFollow] = useState(false); 
//   const [loggedInUsername,setLoggedInUser] = useState(''); 
//   const[username,setUsername]=useState('')
 
 
//   // Fetch user profile when component mounts
//   useEffect(() => {
//     document.title='Profile'
  
//     const  username1= params.username;
//     const username2 = username1.split('%40').join('');
//     setUsername(username2);
//     const fetchLoggedInUser = async () => {
     
//       const response = await fetch(`http://localhost:5000/api/auth/me`, {
//         method: 'GET',
//         credentials: 'include',
//       });
//       const data = await response.json();
//       setLoggedInUser(data.username);
//     };

//     fetchLoggedInUser();
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/users/profile/${username}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });
//         const data = await response.json();
//         setUser(data);
//         // Check if the logged-in user is following this profile
//         setIsFollowing(data.followers.includes(data.id));
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     const fetchMyPosts = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/post/user/${username}`, {
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
//         const response = await fetch(`http://localhost:5000/api/post/likes/${username}`, {
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

//     if (username) {
//       fetchProfile();
//       fetchMyPosts();
//       fetchLikedPosts();
//     }
//   }, [username]);

//   const handleFollowUnfollow = async () => {
//     try {
//       setLoadingFollow(true);
//       const response = await fetch(`http://localhost:5000/api/users/follow/${user?._id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });
//       const data = await response.json();
//       if (response.ok) {
//         // Toggle the follow state
//         setIsFollowing(!isFollowing);
//       }
//     } catch (error) {
//       console.error('Error following/unfollowing user:', error);
//     } finally {
//       setLoadingFollow(false);
//     }
//   };

//   const handleSaveProfile = (updatedUser: any) => {
//     setUser(updatedUser); // Update user info after saving
//   };

//   if (!user) {
//     return <div>Loading profile...</div>;
//   }

//   return (
//     <div>
//       <SideBarComponent />
//       <div className="max-w-4xl mx-auto py-6 px-4">
//         <div className="bg-gray-900">
//           {/* Cover Photo */}
//           <div className="relative bg bg-gray-900">
//             <div className="h-72 aspect-w-3 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
//               {user.coverImg && (
//                 <Image
//                   src={user.coverImg.toString()}
//                   alt="Cover Photo"
//                   layout="fill"
//                   objectFit="contain"
//                   className="w-full h-full"
//                 />
//               )}
//             </div>

//             {/* Profile Image */}
//             <div className="absolute -bottom-12 left-6 rounded-full border-4 border-white overflow-hidden w-24 h-24 bg-gray-900">
//               <Image src={user?.profileImg ? user.profileImg.toString() : profilepic} alt="" width={96} height={96} />
//             </div>

//             {/* Show Follow Button if visiting another user's profile */}
//             {loggedInUsername !== user.username.toString() ? (
//               <button
//                 className={`absolute left-3/4 mt-2 py-2 px-6 ${isFollowing ? 'bg-gray-500' : 'bg-sky-500'} text-white rounded`}
//                 onClick={handleFollowUnfollow}
//                 disabled={loadingFollow}
//               >
//                 {isFollowing ? 'Following' : 'Follow'}
//               </button>
//             ) : (
//               <button
//                 className="absolute left-3/4 mt-2 py-2 px-6 bg-sky-500 text-white rounded"
//                 onClick={() => setIsEditing(true)}
//               >
//                 Edit Profile
//               </button>
//             )}
//           </div>

//           {/* User Info */}
//           <div className="mt-8 bg-gray-900 p-4 rounded-lg left-3/4">
//             <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
//             <p className="text-gray-400">@{user.username}</p>
//             <div className="h-0.5 bg-blue-200 my-4 rounded-3xl"></div>
//             <span className="text-gray-500 flex items-center my-4">
//               <Image src={calender} alt="Calendar Icon" width={20} height={20} className="mr-2" />
//               {user?.createdAt ? (
//                 <>Joined {new Date(user.createdAt.toString()).toLocaleDateString()}</>
//               ) : (
//                 <>Joined date not available</>
//               )}
//             </span>
//             <div className="flex space-x-6 mt-4">
//               <span className="text-white">{user.followers.length} Followers</span>
//               <span className="text-white">{user.following.length} Following</span>
//             </div>
//           </div>
//         </div>

//         {/* Tabs for My Tweets and Liked Tweets */}
//         <div className="mt-10 border-b border-gray-500">
//           <div className="flex space-x-4">
//             <button
//               className={`py-2 px-4 text-white ${activeTab === 'tweets' ? 'border-b-2 border-sky-500' : ''}`}
//               onClick={() => setActiveTab('tweets')}
//             >
//               My Tweets
//             </button>
//             <button
//               className={`py-2 px-4 text-white ${activeTab === 'liked' ? 'border-b-2 border-sky-500' : ''}`}
//               onClick={() => setActiveTab('liked')}
//             >
//               Liked Tweets
//             </button>
//           </div>
//         </div>

//         {/* Display Tweets or Liked Tweets */}
//         <div className="mt-6">
//           {activeTab === 'tweets' ? (
//             tweets.length > 0 ? (
//               tweets.map((tweet: any) => (
//                 <PostComponent key={tweet._id} {...tweet} />
//               ))
//             ) : (
//               <p className="text-gray-500">You haven't posted any tweets yet.</p>
//             )
//           ) : (
//             likedTweets.length > 0 ? (
//               likedTweets.map((tweet: any) => (
//                 <PostComponent key={tweet._id} {...tweet} />
//               ))
//             ) : (
//               <p className="text-gray-500">You haven't liked any tweets yet.</p>
//             )
//           )}
//         </div>

//         {/* Edit Profile Modal */}
//         {isEditing && (
//           <EditProfileModal
//             user={user}
//             onClose={() => setIsEditing(false)}
//             onSave={handleSaveProfile}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;











































'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { userprops } from '@/types/props';
import PostComponent from '../../components/PostComponent';
import EditProfileModal from '../../components/EditProfileModal';
import profilepic from '@/public/profilepic.svg';
import calender from '@/public/calender.svg';
import SideBarComponent from '@/app/components/SideBarComponent';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ params }) => {
  const [user, setUser] = useState<userprops | null>(null);
  const [tweets, setTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);
  const [activeTab, setActiveTab] = useState<'tweets' | 'liked'>('tweets');
  const [isEditing, setIsEditing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [loggedInUsername, setLoggedInUser] = useState('');
  const [username, setUsername] = useState('');

  // Fetch user profile when component mounts
  useEffect(() => {
    document.title = 'Profile';

    const fetchUsername = async () => {
      const usernameObj = await params; // Unwrap the promise
      const username1 = usernameObj.username;
      const username2 = username1.split('%40').join('');
      setUsername(username2);

      const fetchLoggedInUser = async () => {
        const response = await fetch(`http://localhost:5000/api/auth/me`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setLoggedInUser(data.username);
       
      };

      const fetchProfile = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/users/profile/${username2}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          const data = await response.json();
          setUser(data);
          // Check if the logged-in user is following this profile
          setIsFollowing(data.followers.includes(data.id));
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };

      const fetchMyPosts = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/post/user/${username2}`, {
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
          const response = await fetch(`http://localhost:5000/api/post/likes/${username2}`, {
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

      fetchLoggedInUser();
      fetchProfile();
      fetchMyPosts();
      fetchLikedPosts();
    };

    fetchUsername();
  }, []); // Run when params changes

  const handleFollowUnfollow = async () => {
    try {
      setLoadingFollow(true);
      const response = await fetch(`http://localhost:5000/api/users/follow/${user?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        // Toggle the follow state
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    } finally {
      setLoadingFollow(false);
    }
  };

  const handleSaveProfile = (updatedUser: any) => {
    setUser(updatedUser); // Update user info after saving
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <SideBarComponent />
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="bg-gray-900">
          {/* Cover Photo */}
          <div className="relative bg bg-gray-900">
            <div className="h-72 aspect-w-3 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              {user.coverImg && (
                <Image
                  src={user.coverImg.toString()}
                  alt="Cover Photo"
                  layout="fill"
                  objectFit="contain"
                  className="w-full h-full"
                />
              )}
            </div>

            {/* Profile Image */}
            <div className="absolute -bottom-12 left-6 rounded-full border-4 border-white overflow-hidden w-24 h-24 bg-gray-900">
              <Image src={user?.profileImg ? user.profileImg.toString() : profilepic} alt="" width={96} height={96} />
            </div>

            {/* Show Follow Button if visiting another user's profile */}
            {loggedInUsername !== user.username.toString() ? (
              <button
                className={`absolute left-3/4 mt-2 py-2 px-6 ${isFollowing ? 'bg-gray-500' : 'bg-sky-500'} text-white rounded`}
                onClick={handleFollowUnfollow}
                disabled={loadingFollow}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            ) : (
              <button
                className="absolute left-3/4 mt-2 py-2 px-6 bg-sky-500 text-white rounded"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* User Info */}
          <div className="mt-8 bg-gray-900 p-4 rounded-lg left-3/4">
            <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
            <p className="text-gray-400">@{user.username}</p>
            <p className="text-white mt-5">{user.bio}</p>
            <div className="h-0.5 bg-blue-200 my-4 rounded-3xl"></div>
            <span className="text-gray-500 flex items-center my-4">
              <Image src={calender} alt="Calendar Icon" width={20} height={20} className="mr-2" />
              {user?.createdAt ? (
                <>Joined {new Date(user.createdAt.toString()).toLocaleDateString()}</>
              ) : (
                <>Joined date not available</>
              )}
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
    </div>
  );
};

export default ProfilePage;
